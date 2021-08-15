/*
 * @Description: 全局配置信息
 * @Author: silin7
 * @Date: 2021-08-15
 */

const path = require('path');

module.exports = {
  Port: 3000, // 启动端口
  staticDir: path.resolve('./public'), // 静态资源路径
  uploadDir: path.join(__dirname, path.resolve('public/')), // 上传文件路径
  dbConfig: { // 数据库连接设置
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'birch-forest',
    timezone: "08:00"
  }
}