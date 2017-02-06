#!/usr/bin/env node

const yargs = require('yargs');
const inquirer = require('inquirer');
const fs = require('fs');
const ora = require('ora');
const chalk = require('chalk');
const request = require('request');
const Table = require('cli-table');
const config = require('./config');
const path = require('path');
const constants = require('./constants');

const LANGUAGES = constants.LANGUAGES;
const ISSUES_URL = constants.ISSUES_URL;
const API_DEV_URL = constants.API_DEV_URL;
const GITHUB_URL = constants.GITHUB_URL;
const RUN_URL = constants.RUN_URL;
const COMPILE_URL = constants.COMPILE_URL;

const openIssue = () => {
  console.log(
    chalk.yellow(
      `If problem persist, please open an issue at ${ISSUES_URL}.`
    )
  );
  process.exit(-1);
}

const end = () => {
  console.log(chalk.cyan('Copyright © 2016 Manraj Singh.'))
  console.log(chalk.green(`Powered by HackerEarth API (${API_DEV_URL})`));
  console.log(chalk.yellow(`Support project at ${GITHUB_URL}`));
  process.exit(-1);
}

const checkClientSecret = () => {
  if (config.CLIENT_SECRET === '') {
    console.log(chalk.red('Please add CLIENT SECRET to config. Run `sudo hackerearth config` for this.'));
    openIssue();
    process.exit(-1);
  }
}

const argv = yargs
  .usage('$0 <command>')
  .command('run', 'Run code on HackerEarth server', (yargs) => {
    var argv = yargs
      .usage('Usage: $0 run <options>')
      .demand(['s', 'i', 'o'])
      .alias('s', 'source').describe('s', 'Source Code file path')
      .alias('i', 'input').describe('i', 'Input file path')
      .alias('l', 'language').describe('l', 'Language. Change `config` for default.')
      .alias('o', 'output').describe('o', 'Output file path')
      .example('$0 run -s A.cpp -i Input00.in -o Output.txt -l CPP11')
      .argv;

    checkClientSecret();

    const source = fs.readFileSync(argv.source, 'utf8');
    var input = fs.readFileSync(argv.input, 'utf8');
    const output = argv.output;
    const spinner = ora('Running').start();
    const lang = argv.language === undefined ? config.default_lang : argv.language;
    var data = {
      'client_secret': config.CLIENT_SECRET,
      'async': 0,
      'input': input,
      'source': source,
      'lang': lang,
      'time_limit': config.time_limit,
      'memory_limit': config.memory_limit
    };
    request.post({url: RUN_URL, form: data}, (err, response) => {
      if (err) {
        spinner.stop();
        console.log(chalk.red('Error Occured'));
        openIssue();
      } else {
        spinner.stop();
        const result = JSON.parse(response.body);
        if (result.compile_status !== 'OK') {
          console.log(chalk.red('Compilation Error'));
          console.log(chalk.red(result.compile_status));
          process.exit(-1);
        }
        const runStatus = result.run_status;
        var data = runStatus.output === undefined ? '' : runStatus.output;
        fs.writeFileSync(output, data, 'utf8');
        var table = new Table({
          head: ['Message', 'Memory', 'Time', 'Web Link'],
          colWidths: [10, 10, 10, 40]
        });
        table.push([runStatus['status'], runStatus['memory_used'], runStatus['time_used'], result['web_link']]);
        console.log(table.toString());
        end();
      }
    });
  })
  .command('compile', 'Compile code on HackerEarth server', (yargs) => {
    var argv = yargs
      .usage('Usage: $0 compile <options>')
      .demand(['s'])
      .alias('s', 'source').describe('s', 'Source Code file path')
      .alias('l', 'language').describe('l', 'Language. Change `config` for default.')
      .example('$0 compile -s A.cpp -l CPP11')
      .argv;

    checkClientSecret();

    const source = fs.readFileSync(argv.source, 'utf8');
    const spinner = ora('Compiling').start();
    const lang = argv.language === undefined ? config.default_lang : argv.language;
    var data = {
      'client_secret': config.CLIENT_SECRET,
      'async': 0,
      'source': source,
      'lang': lang,
      'time_limit': config.time_limit,
      'memory_limit': config.memory_limit
    };
    request.post({url: COMPILE_URL, form: data}, (err, response) => {
      if (err) {
        spinner.stop();
        console.log(chalk.red('Error Occured'));
        openIssue();
      } else {
        spinner.stop();
        const result = JSON.parse(response.body);
        if (result.compile_status !== 'OK') {
          console.log(chalk.red('Compilation Error'));
          console.log(chalk.red(result.compile_status));
          process.exit(-1);
        }
        console.log(chalk.yellow('Compile Status: ') + chalk.green(result.compile_status));
        console.log(chalk.yellow('Check your code at: ') + chalk.green(result.web_link));
        end();
      }
    });
  })
  .command('config', 'Change config file', (yargs) => {
    var argv = yargs
      .usage('Usage: sudo $0 config [options]')
      .alias('l', 'list').describe('l', 'List language and their code').boolean('l')
      .example('sudo $0 config -l')
      .argv;

    if (argv.list) {
      var table = new Table({
        head: ['Language', 'Code'],
        colWidths: [30, 20]
      });
      for (let name in LANGUAGES) {
        table.push([LANGUAGES[name], name]);
      }
      console.log(table.toString());
      end();
    } else {
      const questions = [{
        type: 'input',
        name: 'CLIENT_SECRET',
        message: 'Enter CLIENT SECRET <leave blank incase unchanged>'
      }, {
        type: 'input',
        name: 'default_lang',
        message: 'Enter default language (Run `sudo hackerearth config -l` to list codes)'
      }];
      inquirer.prompt(questions).then((answers) => {
        var obj = config;
        if (answers.CLIENT_SECRET !== '') {
          obj.CLIENT_SECRET = answers.CLIENT_SECRET;
        }
        if (answers.default_lang !== '') {
          obj.default_lang = answers.default_lang;
        }
        fs.writeFileSync(path.resolve(__dirname, 'config.json'), JSON.stringify(obj, null, 2), 'utf8');
      });
    }
  })
  .help('h')
  .alias('h', 'help')
  .argv;
