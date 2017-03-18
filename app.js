'use strict';

const express = require('express');
const xtpl = require('xtpl');
let app = express();


//配置session
var session = require('express-session');
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}))

//设置模板引擎
app.set('views', './views');
app.set('view engine', 'html');
app.engine('html', xtpl.renderFile);

//设置静态资源
app.use('/statics', express.static('./statics'))

//设置解析post数据的包
const bodyParser = require('body-parser')
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json());

//引入路由模块
const homeRouter = require('./routers/home');
app.use('/', homeRouter);

const adminRouter = require('./routers/admin');
app.use('/admin', adminRouter);

const loginRouter = require('./routers/login');
app.use('/', loginRouter);


//处理错误
app.use((req, res) => {
  //设置状态码
  res.status(404);
  res.redirect('/statics/www/404.html');
})

app.use((err, req, res, next) => {
  res.status(500);
  res.redirect('/statics/www/500.html');
})

app.listen(2222, () => {
  console.log('正在监听：2222')
})