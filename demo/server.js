var express = require('express');
var bodyParser=require("body-parser");
//创建服务器
var fs=require('fs');
var server = express();
//设置静态资料路径
server.use('/q',express.static('src'));
var urlencodedParser = bodyParser.urlencoded({ extended: false });
//设置模板引擎为ejs 模板引擎
server.set('views engine','ejs');
server.get('/',function(req,res){
    res.render(`home.ejs`)
});
server.get('/mem',function(req,res){
    res.render(`member.ejs`)
});
server.get('/one',function(req,res){
    res.render(`one.ejs`)
});
server.get('/two',function(req,res){
    res.render(`two.ejs`)
});
server.get('/three',function(req,res){
    res.render(`three.ejs`)
});
server.get('/user',function(req,res){
    var data=fs.readFileSync('demo.txt','utf-8');
    data=JSON.parse(data);
    res.render('user.ejs',{data:data})
});
server.get('/chat',function(req,res){
    res.render(`chat.ejs`)
});
server.post('/user',bodyParser.urlencoded({ extended: false }),function (req, res) {
    var data=fs.readFileSync('demo.txt','utf-8');
    //转换JSON对象
    data=JSON.parse(data);
    data.push(req.body);
    fs.writeFileSync('demo.txt',JSON.stringify(data));
    //渲染数据
    res.render('user.ejs',{data:data})
});
server.listen(3000,function () {
    console.log("成功了")
});