'use strict';

const express = require('express');


let homeRouter = module.exports = express.Router();





//获取控制器模块
const homeController = require('../controllers/home');



//分页的接口    pageindex 页码
homeRouter.get('/getpagedatas/:pageindex', homeController.getpagedatas);

//获取总页数
homeRouter.get('/getpagecount', homeController.getpagecount);


//首页
homeRouter.get('/', homeController.gethome);

//详细页面
//http://127.0.0.1:2222/blog?id=xxxxx
homeRouter.get('/blog', homeController.getdetail);


//接口
//获取某个文章的所有评论
//  http://127.0.0.1:2222/getcomments/xxxx
homeRouter.get('/getcomments/:id', homeController.getcommentsbyid);


//发表评论
homeRouter.post('/addblog', homeController.addblog);


