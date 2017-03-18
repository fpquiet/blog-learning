'use strict';

const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

let homeController = module.exports;



//数据库连接的字符串
let url = 'mongodb://localhost:27017/itcast';
// posts  comments  users

//每页显示多少条数据
let pagesize = 5;
//获取分页数据  /getpagedatas/:pageindex
homeController.getpagedatas = (req, res) => {
  //获取页码
  let pageindex = req.params.pageindex;

  MongoClient.connect(url, (err, db) => {
    let posts = db.collection('posts');
    //第1页 跳过 0   (pageindex-1) * pagesize
    //第2页 跳过 5
    //第3页 跳过 10
    posts.find({}).skip((pageindex - 1) * pagesize).limit(pagesize).toArray((err, pagedata) => {
      
      //获取总页数
      posts.find({}).toArray((err, data) => {
        //总数据条数
        let count = data.length;
        let pagecount = Math.ceil(count / pagesize);

        ////{pagecount:9, data: data}
        res.json({pagecount: pagecount, data: pagedata});
      })

      
    })
  })
}

//获取总页数
homeController.getpagecount = (req, res) => {
  MongoClient.connect(url, (err, db) => {
    let posts = db.collection('posts');
    posts.find({}).toArray((err, data) => {
      //总数据条数
        let count = data.length;
        let pagecount = Math.ceil(count / pagesize);
        res.json({pagecount: pagecount})
    })
  })
}


homeController.gethome = (req, res) => {


  a = 5;

  //连接数据库
  MongoClient.connect(url, (err, db) => {
    if(err) throw err;

    //获取要操作的集合
    let posts = db.collection('posts');
    //查询所有的数据--查询所有的博客数据
    posts.find({}).skip(0).limit(pagesize).toArray((err, postsData) => {
      if(err) throw err;
       //渲染模板和数据，输出给浏览器
      res.render('index.html', {title: '这是博客的首页', data: postsData})

      db.close();
     
    });
  })
}

//详细页面
homeController.getdetail = (req, res) => {
  //获取url上的id,  query获取的是查询字符串  ?id=xxx
  let id = req.query.id;
  //根据id查询 博客的详细内容
  MongoClient.connect(url, (err, db) => {

    let posts = db.collection('posts');
    
    posts.findOne({_id: ObjectID(id)}, (err, data) => {
      //渲染模板，发送数据给浏览器
      res.render('post.html', {data: data})
    })

    db.close();
  })
}


//接口

//根据id返回评论数据
homeController.getcommentsbyid = (req, res) => {
  //  /getcomments/:id
  //获取id 
  let id = req.params.id;
  // console.log(id);

  MongoClient.connect(url, (err, db) => {
    //
    let comments = db.collection('comments');
    comments.find({post_id: ObjectID(id)}).toArray((err, data) => {
      //res.send(data);

      res.json(data);
    })
  })
}



//测试接口的工具
//  fiddler  客户端软件
//  postman  chrome的插件

//发表评论
homeController.addblog = (req, res) => {
//   author: item.author,
// author_email: item.author_email,
// author_ip: item.author_ip,     --服务端获取的
// content: item.content,
// support: item.support,      --默认  0
// oppose: item.oppose,        -- 默认 0
// created: item.created,      -- 发表事件  服务端获取
// post_id:ObjectID('58abf862f15e8911e4288502')

  // req.body

  MongoClient.connect(url, (err, db) => {
    let comments = db.collection('comments');

    comments.insert({
        author: req.body.name,
        author_email: req.body.email,
        author_ip: req.socket.remoteAddress,     //服务端获取的
        content: req.body.comment,
        support: 0,      //默认  0
        oppose: 0,        //默认 0
        created: new Date(),      //发表事件  服务端获取
        post_id: ObjectID( req.body.postid)
    }, (err, result) => {
      if(err) {
        res.json({code: 0, msg: '评论失败'});
      }else{
        res.json({code: 1, msg: '评论成功'});
      }
    })
  })
}