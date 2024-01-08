// 云函数代码（例如云函数的 index.js）

'use strict';

exports.main = async (event, context) => {
  const db = uniCloud.database();

  try {
    const res = await db.collection('masterpiece').get();

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
