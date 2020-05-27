const express = require('express')
const ReactSSR = require('react-dom/server')
const fs = require('fs')
const path = require('path')
const serverEntry = require('../build/server.entry').default
//创建一个中间文件接收html
const template = fs.readFileSync(path.join(__dirname, '../build/index.html'),'utf8')

const map = require('../mock/map');
const loan = require('../mock/loan');
const userConver = require('../mock/userConver');
const product = require('../mock/product');
const cooperator = require('../mock/cooperator');
const equipment = require('../mock/equipment');
//服务端使用express
const app = express()
const server = require('http').createServer(app);
const io = require('socket.io')(server);
// const DIST_DIR = path.resolve(__dirname, '../', 'dist'); // 设置静态访问文件路径
const port = parseInt(process.env.PORT, 10) || 8586;
const host = process.env.HOST || 'localhost';
let t = null;
io.on('connection', socket => {
  socket.on('msg', () => {
    socket.emit('message', {
      contentType: 'msg',
      data: map(),
    });

    if (t) {
      clearInterval(t);
      t = null;
    }

    t = setInterval(() => {
      socket.emit('message', {
        contentType: 'msg',
        data: map(),
      });
    }, 5000);
  });

  socket.on('loan', () => {
    socket.emit('message', {
      contentType: 'loan',
      data: loan(),
    });
  });

  socket.on('userConver', () => {
    socket.emit('message', {
      contentType: 'userConver',
      data: userConver(),
    });
  });

  socket.on('product', () => {
    socket.emit('message', {
      contentType: 'product',
      data: product(),
    });
  });

  socket.on('cooperator', () => {
    socket.emit('message', {
      contentType: 'cooperator',
      data: cooperator(),
    });
  });

  socket.on('equipment', () => {
    socket.emit('message', {
      contentType: 'equipment',
      data: equipment(),
    });
  });
});

io.on('disconnect', () => {
  console.log('disconnect');
  if (t) {
    clearInterval(t);
    t = null;
  }
});
app.use('*',express.static(path.join(__dirname,'../build')))
//发送给前端页面
app.get('*',function(req,res){
  const appString = ReactSSR.renderToString(serverEntry)
  res.send(template.replace('<!-- app -->',appString))
})
//监听3333端口号内容
app.listen(3333,function(){
	console.log('server is listening on 3333')
})

// const express = require('express')
// const path = require('path')
// const port = process.env.PORT || 8888
// const app = express()

// // 通常用于加载静态资源
// app.use(express.static(__dirname + '../build'))

// // 在你应用 JavaScript 文件中包含了一个 script 标签
// // 的 index.html 中处理任何一个 route
// app.get('*', function (request, response){
//   response.sendFile(path.resolve(__dirname, '../build', 'index.html'))
// })

// app.listen(port)
// console.log("server started on port " + port)