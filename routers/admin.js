'use strict';

const express = require('express');

let adminRouter = module.exports = express.Router();


const adminController = require('../controllers/admin');

//后台首页
adminRouter.get('/', adminController.gethome);


//1 获取所有的用户信息 
adminRouter.get('/users', adminController.getusers);
//2 根据id删除用户
adminRouter.get('/users/delete/:id', adminController.deleteuserbyid);
//3 添加用户
adminRouter.post('/users/add', adminController.adduser);
//4 修改用户
adminRouter.post('/users/update', adminController.updateuser);

//5 根据id查询一个用户信息
adminRouter.get('/users/:id', adminController.getuserbyid);