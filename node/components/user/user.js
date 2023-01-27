const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();

// 1.连接数据库
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://这里填你的mongodb数据库IP地址:27017/";
// 例如：const url = "mongodb://users:123456@114.114.114.114:27017/?authSource=musics"
// 宝塔 mongodb 默认没有密码，也没有安全保护。可以参考这个链接来调整：https://blog.csdn.net/qq_40881695/article/details/125426705

router.get('/', (req, res) => {
	console.log(req.query)
	res.send('用户模块！')
})

// 获取所有用户信息
router.post('/getAllUser', jsonParser, async (req, res)=>{
	res.setHeader("Access-Control-Allow-Origin","*");
    let jsons = "";
    MongoClient.connect(url, (err, db)=> {
        if (err) throw err;
        const dbo = db.db("musics");
        dbo.collection("user").find()
        .project({
            username: 1
        })
        .toArray((err, result)=> {
            if (err) throw err;
            jsons = result;
            db.close();
            res.send({value:jsons})
        });
    });
})

// 获取某一个用户信息
router.post('/getUser', jsonParser, async (req, res)=>{
	res.setHeader("Access-Control-Allow-Origin","*");
    let jsons = "";
    MongoClient.connect(url, (err, db)=> {
        if (err) throw err;
        const dbo = db.db("musics");
        dbo.collection("user")
        .find({
            username: req.body.username
        })
        .project({
            username: 1
        })
        .toArray((err, result)=> {
            if (err) throw err;
            jsons = result;
            db.close();
            res.send({value:jsons})
        });
    });
})

// 获取用户歌曲信息
router.post('/getUserMusic', jsonParser, async (req, res)=>{
	res.setHeader("Access-Control-Allow-Origin","*");
    let jsons = "";
    MongoClient.connect(url, (err, db)=> {
        if (err) throw err;
        const dbo = db.db("musics");
        dbo.collection("user")
        .find({
            username: req.body.username
        })
        .project({
            username: 1,
            list: 1
        })
        .toArray((err, result)=> {
            if (err) throw err;
            jsons = result;
            db.close();
            res.send({value:jsons})
        });
    });
})

// 更新用户歌曲信息
router.post('/updateUserMusic', jsonParser, async (req, res)=>{
	res.setHeader("Access-Control-Allow-Origin","*");
    MongoClient.connect(url, (err, db)=> {
        if (err) throw err;
        const dbo = db.db("musics");
        dbo.collection("user")
        .updateOne({
            username: req.body.username
        }, {
            $set: {
                list: req.body.list
            }
        }, (err, result)=> {
            if (err) throw err;
            db.close();
        });
        res.send({value:"更新成功！"})
    });
})

// 增加用户
router.post('/addUser', jsonParser, async (req, res)=>{
	res.setHeader("Access-Control-Allow-Origin","*");
    MongoClient.connect(url, (err, db)=> {
        if (err) throw err;
        const dbo = db.db("musics");
        let myobj = {
            'username': req.body.username,
            'list': []
        }
        dbo.collection("user")
        .insertOne(myobj, (err, result)=> {
            if (err) throw err;
            db.close();
        });
        res.send({value:"添加成功！"})
    });
})

//设置跨域访问
router.all('*',function(req,res,next) {
    res.header("Access-Control-Allow-Origin","*");
    res.header('Access-Control-Allow-Methods','PUT,GET,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers","X-Requested-With");
    res.header('Access-Control-Allow-Headers','Content-Type');
    next();
});

module.exports = router;