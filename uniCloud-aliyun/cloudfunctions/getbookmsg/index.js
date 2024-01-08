'use strict';

const { basename } = require("path");

exports.main = async (event, context) => {
  const db = uniCloud.database();

  try {
    // 获取前端传递的书籍名字
    const bookName = event.bookName;
    // 在云函数中添加日志
    console.log('接收到的书籍名字:', bookName);

    // 使用 where 条件进行数据库查询
    const res = await db.collection('BookMsg').where({
      name: bookName
    }).get();

    return {
      data: res.data
    };
  } catch (error) {
    console.error('查询数据失败', error);
    return {
      error: error.message
    };
  }
};
