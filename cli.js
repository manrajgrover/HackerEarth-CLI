#!/usr/bin/env node

/*
* @Author: Manraj Singh
* @Date:   2016-05-24 21:54:43
* @Last Modified by:   Manraj Singh
* @Last Modified time: 2016-05-26 21:15:52
*/

'use strict';

const program = require('commander');
const ora = require('ora');
const chalk = require('chalk');
const request = require('request');
const config = require('./config');

const COMPILE_URL = 'http://api.hackerearth.com/code/compile/';
const RUN_URL = 'http://api.hackerearth.com/code/run/';

var data = {
  'client_secret': config.CLIENT_SECRET,
  'source': source,
  'lang': 'PYTHON',
};

request.post({ url : RUN_URL, form : data}, function(err,response){
  if(err){
    console.log('Error');
  }
  else{
    console.log(response);
  }
});

/*program
  .version('0.0.1')
  .command('run [run]', 'Run program on HackerEarth Server.')
  .command('compile [compile]', 'Compile program on HackerEarth Server.')
  .parse(process.argv);
*/