'use strict';

const qs = require('qs');
const mockjs = require('mockjs');

// 数据持久
//mall list
let tableListData = {};
if (!global.tableListData) {
  const mallData = mockjs.mock({
    'data|100': [{
      'id|+1': 1,
      shop_entity_name: '@cname',
      'terminal_number|11-99': 1,
      'receipt_count|11-99': 1,
      mall_name: '@region',
      'shop_entity_id|1000000-99999999': 1,
      'modified_time':'2016-10-16'
    }],
    page: {
      total: 100,
      current: 1
    }
  });
  tableListData = mallData;
  global.tableListData = tableListData;
} else {
  tableListData = global.tableListData;
}

module.exports = {

  'GET /api/homePage' (req, res) {
  const page = qs.parse(req.query);
  const pageSize = page.pageSize || 10;
  const currentPage = page.page || 1;

  let data;
  let newPage;

  let newData = tableListData.data.concat();

  if (page.field) {
    const d = newData.filter(function (item) {
      return item[page.field].indexOf(page.keyword) > -1;
    });

    data = d.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    newPage = {
      current: currentPage * 1,
      total: d.length
    };
  } else {
    data = tableListData.data.slice((currentPage - 1) * pageSize, currentPage * pageSize);
    tableListData.page.current = currentPage * 1;
    newPage = {
      current: tableListData.page.current,
      total: tableListData.page.total
    };
  }


  setTimeout(function () {
    res.json({
      success: true,
      data,
      page: newPage
    });
  }, 500);
}

};
