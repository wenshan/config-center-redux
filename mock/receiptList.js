'use strict';

const qs = require('qs');
const mockjs = require('mockjs');

// 数据持久
//receiptList list
let receiptListData = {};
if (!global.receiptListData) {
	const data = mockjs.mock({
		'data|100': [{
			'id|+1': 1,
			'bill_id|11-99': 1,
			bill_img_url:'@url',
			bill_orig_text:'@region',
			modified_time:'2016-10-07-11',
			version:'1.0.0',
			error_type:'new',
			error:'@region'
		}],
		page: {
			total: 100,
			current: 1
		}
	});
	receiptListData = data;
	global.receiptListData = receiptListData;
} else {
	receiptListData = global.receiptListData;
}

module.exports = {

	'GET /api/receiptList' (req, res) {
	const page = qs.parse(req.query);
	const pageSize = page.pageSize || 10;
	const currentPage = page.page || 1;

	let data;
	let newPage;

	let newData = receiptListData.data.concat();

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
		data = receiptListData.data.slice((currentPage - 1) * pageSize, currentPage * pageSize);
		receiptListData.page.current = currentPage * 1;
		newPage = {
			current: receiptListData.page.current,
			total: receiptListData.page.total
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