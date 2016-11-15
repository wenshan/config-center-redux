import { message, notification } from 'antd';
import Utils from '../../utils/index';
import Moment from 'moment';
import Permission from '../../components/permission/index';
const Ajax = Utils.ajax, commonUtils = Utils.common;

const API = {
  RECEIPTLIST: Domain + '/choose_receipt.json'
};

const fetchData = {
	// 获取初始数据列表
  fetchUpData() {
    const store = this.props.getStoreState();

    const postData = {
      action: 'get_list',
      terminal_number: store.terminalNumber,
      per_page: store.per_page,
      current_page: store.current_page
    };
    Ajax({
      url: API.RECEIPTLIST,
      data: postData,
      type: 'json',
      method: 'post'
    }).then(resp => {
      if (resp.status == 'S') {
        const data = resp.data;
        const receiptList = [];
        data.receipt_list.map(item => {
          item['shop_name'] = data.shop_name;
          item['terminal_number'] = data.terminal_number;
          item['shop_entity_id'] = data.shop_entity_id;
          item['shop_entity_name'] = data.shop_entity_name;
          receiptList.push(item);
        });

        this.props.setStoreState({
          receiptList: receiptList,
          total_page: data.page_info.total_page,
          per_page: data.page_info.per_page,
          isUpData: true
        });
        console.log(this.props.getStoreState(),1212121212);
      }
    }).catch(err => {
      Permission(err);
    });
  },

	// 全局警告提醒
  openNotificationWithIcon(type, title, content) {
    return function () {
      notification[type]({
        message: title,
        description: content,
        duration: 8,
      });
    };
  },
};

export default fetchData;
