/*
 * @Description: 新闻模块
 * @Author: silin7
 * @Date: 2020-08-09
 */


const express = require('express');
const journalismModule = require('../../controller/journalismModule');

let journalismRouter = express.Router();

journalismRouter
  .get('/journalism/journalism_list', journalismModule.journalism_list)
  .get('/journalism/journalism_details', journalismModule.journalism_details)


module.exports = journalismRouter;

