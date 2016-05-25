#!/usr/bin/env node

/*
* @Author: Manraj Singh
* @Date:   2016-05-24 21:54:43
* @Last Modified by:   Manraj Singh
* @Last Modified time: 2016-05-25 22:01:25
*/

'use strict';

const program = require('commander');
const ora = require('ora');
const chalk = require('chalk');

program
  .version('0.0.1')
  .option('-s, --source <required>','Provide path to source file')
  .option('-i, --input [optional]','Provide path to input file')
  .option('-o, --output [optional]','Provide path to output file')
  .parse(process.argv);