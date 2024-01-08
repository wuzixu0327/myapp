'use strict';

exports.main = async (event, context) => {
  const db = uniCloud.database();

  try {
    // 从前端传递的参数中获取要删除的书名
    const bookName = event.bookName;

    // 查询符合条件的记录
    const queryResult = await db.collection('shop').where({ bookname: bookName }).get();

    // 如果存在符合条件的记录，删除它们
    if (queryResult.data && queryResult.data.length > 0) {
      const deleteResult = await db.collection('shop').where({ bookname: bookName }).remove();
      return {
        data: deleteResult.data
      };
    } else {
      return {
        data: "No matching records found for deletion."
      };
    }
  } catch (error) {
    console.error('删除数据失败', error);
    return {
      error: error.message
    };
  }
};
