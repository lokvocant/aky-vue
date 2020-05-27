// 引入express
const express = require('express');
// 只使用router
const router = express.Router();
const fs = require('fs')
const glob = require("glob");
const app = express()
const path = require('path');
// 引入Mock对象
const Mock = require('mockjs')
// 定义生成数据列表的方法
const generateData = () => {
  // 使用Mock.mock方法来生成mock数据
  return Mock.mock({
    "code": 200,
    "data|12": [
      {
        "id": "@id",
        "title": "@ctitle(15, 25)",
        "author": "@cname",
        "volume": "@int(100, 300)",
        "createAt": "@int(10000000000000, 1554363040517)"
      }
    ]
  })
}
app.use(express.static(path.join(__dirname, '../resource')))

/* 获取用户列表方式 */
app.get('/data', function (req, res) {
  res.json(generateData())
})
app.listen(8000, function () {
  console.log('server is listening on 8000')
})