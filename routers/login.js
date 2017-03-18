'use strict';

const express = require('express');

let loginRouter = module.exports = express.Router();

const loginController = require('../controllers/login');
loginRouter.get('/login', loginController.login);

//处理登录的逻辑
loginRouter.post('/login', loginController.handlelogin);