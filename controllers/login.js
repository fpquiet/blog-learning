'use strict';
const MongoClient = require('mongodb').MongoClient;

let loginController = module.exports;

loginController.login = (req, res) => {
  res.render('sign.html', {});
}


let url = 'mongodb://localhost:27017/itcast';

//处理登录的逻辑
loginController.handlelogin  = (req, res) => {
  //获取用户输入的账号和密码
  let username = req.body.username;
  let password = req.body.password;

  MongoClient.connect(url, (err, db) => {
    let users = db.collection('users');
    
    users.findOne({username: username}, (err, data) => {
      if(data && data.password === password) {

        //记录登录成功的状态
        req.session.user = data;

        res.json({code: 1, msg: '登录成功'});
      }else{
        res.json({code: 0, msg: '用户名或密码错误'});
      }
    })
  })
  
}