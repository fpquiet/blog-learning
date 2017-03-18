'use strict';

const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

let adminController = module.exports;

let url = 'mongodb://localhost:27017/itcast';


//后台首页
adminController.gethome = (req, res) => {
  res.setHeader('Set-Cookie', 'name=123; max-age=1600');


  //判断是否登录
  if(req.session.user) {
    res.render('admin/index.html', {});
  }else{
    //res.redirect('/login');

    res.send('<script>alert("请先登录;");location.href="/login"</script>')
  }

}

//连接数据库
//获取要操作的集合
//执行响应操作（增删改查）
//返回数据

//后台接口

//1 查询所有用户
adminController.getusers = (req, res) => {
  MongoClient.connect(url, (err, db) => {
    //获取要操作的集合
    let users = db.collection('users');
    users.find({}).toArray((err, data) => {
      res.json(data);
    })
  })
}

//2 根据id删除用户
adminController.deleteuserbyid = (req, res) => {
   //判断是否登录
  if(!req.session.user) {
    res.json({code: -1, msg: '请先登录'});
    return;
  }


  //获取url上的id参数   /admin/delete/:id
  let id = req.params.id;

  MongoClient.connect(url, (err, db) => {
    let users = db.collection('users');
    users.remove({_id: ObjectID(id)}, (err, result) => {
      if(err) {
        res.json({code: 0, msg: '删除失败'});
      }else{
        res.json({code: 1, msg: '删除成功'});
      }
    });
  })
}


//3 添加用户
 adminController.adduser = (req, res) => {
   MongoClient.connect(url, (err, db) => {
     let users = db.collection('users');

//      username: item.username,
// password: item.password,
// nickname: item.nickname,
// email: item.email,
// created: item.created

     users.insertOne({
       username: req.body.username,
       nickname: req.body.nickname,
       password: req.body.password,
       email: req.body.email,
       created: new Date()
     }, (err, result) => {
       if(err) {
         res.json({code: 0, msg: '添加失败'});
       }else{
         res.json({code: 1, msg: '添加成功'});
       }
     })
   })
 }

//4 修改用户
adminController.updateuser = (req, res) => {
  MongoClient.connect(url, (err, db) => {
    let users = db.collection('users');

    var password = req.body.password;
    var user = {};
    if(password) {
      //如果password有值，修改密码
      user = {
        username: req.body.username,
        nickname: req.body.nickname,
        password: req.body.password,
        email: req.body.email
      };
    }else{
      //如果password为空，不修改密码
      user = {
        username: req.body.username,
        nickname: req.body.nickname,
        email: req.body.email
      };
    }


    users.update({_id: ObjectID(req.body.id)}, {$set: user}, (err, result) => {
      if(err) {
         res.json({code: 0, msg: '修改失败'});
       }else{
         res.json({code: 1, msg: '修改成功'});
       }
    })
  })
}

//5 根据id查询一个用户信息
adminController.getuserbyid = (req, res) => {
  //  /users/:id
  let id = req.params.id;

  MongoClient.connect(url, (err, db) => {
    let users = db.collection('users');

    users.findOne({_id: ObjectID(id)}, (err, data) => {
      res.json(data);
    })
  })
}