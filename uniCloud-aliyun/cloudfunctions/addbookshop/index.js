// 云函数代码（uploadBook.js）

'use strict';

exports.main = async (event, context) => {
  const db = uniCloud.database();

  try {
    // 从前端传递的参数中获取书籍信息
    const {
      bookuri,
      bookname,
      bookprice,
      count
    } = event;

    // 将书籍信息添加到数据库
    const res = await db.collection('shop').add({
      bookuri,
      bookname,
      bookprice,
      count
    });

    return {
      data: res.data
    };
  } catch (error) {
    console.error('上传书籍信息失败', error);
    return {
      error: error.message
    };
  }
};
