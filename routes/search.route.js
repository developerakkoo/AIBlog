const express = require('express');
const route = express.Router();
const SearchController = require('../controller/search.controller');
const DataController = require('../controller/Blog.controller');

route.post('/search',SearchController.searchData);

route.get('/getAll/Data',DataController.getAllData);

route.get('/get/Data/:ID',DataController.getDataById);

module.exports = {SearchRoute:route}