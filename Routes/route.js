const express = require('express');
const {createUrl,redirect,home,MyUrls} = require('../controller/url')
const { OnlyLoggedIn } = require('../middleware/auth');

const route = express.Router();

route.get('/',home);
route.get('/MyUrls',OnlyLoggedIn,MyUrls);

route.get('/:url',redirect);
route.post('/createUrl',OnlyLoggedIn,createUrl);

module.exports = route;