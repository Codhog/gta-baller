// 聊天记录格式
// [roomid:[{username: text, time: time, userid:userid}, ...], ...]
// pymysql.connect('10.175.94.60', 'root', 'kangaroo_123.', 'usercenter')
// sql = "select user_name from user_usercenter WHERE staff_num = '{0}'".format(account)+
const chatHistory = [{'room': '4561234','friendName':'Ben', 'info':[{'sender': 'Ben', 'text': 'Hello World'}]}, {'room': '678543', 'friendName':'Ben','info':[{'sender': '678', 'chatText': 'Hello World'}]}]
const cors = require("cors");
const express = require("express");

const app = express();
const port = 3030;
const http = require("http");
const socketIO = require("socket.io");
// var firebase = require('firebase')
const path = require("path");

app.use(cors());
const server = http.createServer(app);
const firebaseConfig = {
    apiKey: "AIzaSyDlBFrUTOF7J6NvJlqeABSdtYKOr4qgiXs",
    authDomain: "gta-baller.firebaseapp.com",
    projectId: "gta-baller",
    storageBucket: "gta-baller.appspot.com",
    messagingSenderId: "184696766878",
    appId: "1:184696766878:web:af690da82b49bf3a2c968f",
    measurementId: "G-QZ685H3BSB"
}

// firebase.initializeApp(firebaseConfig)
//
// let database = firebase.database()

// write
// database.ref("customPath").set(obj, function(error) {
//     if (error) {
//         // The write failed...
//         console.log("Failed with error: " + error)
//     } else {
//         // The write was successful...
//         console.log("success")
//     }
// })
// read
// database.ref('customPath').once('value')
//     .then(function(snapshot) {
//         console.log( snapshot.val() )
//     })

const io = socketIO(server);

const users = new Map()



// ---------mysql
// var mysql = require('mysql');
// var connection = mysql.createConnection({
//   host     : '10.175.94.60',
//   user     : 'root',
//   password : 'kangaroo_123.',
//   database : 'usercenter'
// });

// connection.connect();
// let staff_num = 'F1238208'
// connection.query(`select user_name from user_usercenter WHERE staff_num = '${staff_num}'`, function (error, results, fields) {
//   if (error) throw error;
//   console.log('The solution is: ', results);
// });

// ---------mysql

// app.get("/", (req, res) => {
//     res.sendFile(path.join(__dirname, "public", "index.html"));
// });


// app.get('/api', (req,res)=>{
//     let _myid = req.query.rid
//     console.log('ReceivedID', _myid);
//     // let _keyArr = chatHistory.map(x => Object.keys(x)[0])
//     // console.log(_keyArr);
//     let _thisChatHistory = chatHistory.filter((obj)=>{
//         console.log(obj.room);
//         return (obj.room.includes(_myid))
//     })
//     // console.log(result, 'result');
//     // for(key in _keyArr){
//     //     console.log(_keyArr[key]);
//     //     if(_keyArr[key].includes(_myid)){
//     //         console.log('done');
//     //         _thisChatHistory.push(chatHistory[key])
//     //     }
//     // }
//     res.header("Access-Control-Allow-Origin", "*");
//     res.send(JSON.stringify(_thisChatHistory));
// })
    
io.on('connection', (socket)=>{

    socket.on('addUser', (data)=>{
        users.set(data.username, socket.id)
    })
    socket.on('disconnect', ()=>{
        for (var [key, value] of users.entries()) {
            if(value === socket.id){
                users.delete(key)
                console.log(users,' 删除后');
            }
          }
    })
    console.log('socket接收成功', users);
})

server.listen(3030, () => {
    console.log(`socket启动于 *:${port}`);
  });

exports.widgets = functions.https.onRequest(app);
// exports.widgets = functions.https.onRequest(server);

