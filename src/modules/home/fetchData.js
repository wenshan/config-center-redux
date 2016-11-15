import { message, notification } from 'antd';
import Utils from '../../utils/index';
import Moment from 'moment';
import Permission from '../../components/permission/index';
const Ajax = Utils.ajax,commonUtils = Utils.common;

const API = {
  SEARCHMALL: Domain + '/choose_shop_entity.json',
  SEARHSHOP: Domain + '/choose_shop_entity.json',
};

const fetchData = {
  fetchAllMallList(){
    const store = this.props.getStoreState();
    const shopStore = store.shopStore;
    const postData = {
      action: 'get_list',
      per_page: store.per_page,
      current_page: store.current_page,
      shop_id: store.mallId
    };

    Ajax({
      url: API.SEARCHMALL,
      data: postData,
      type: 'json',
      method:'post'
    }).then(resp => {
      if (resp.status == 'S') {
        var dataShopList = resp.data.shop_list;
        var dataEntityList = resp.data.shop_entity_list;

        this.props.setStoreState({
          shopStore: dataEntityList,
           mallList: dataShopList
        });
      }
    }).catch(err => {
      Permission(err);
    });
  },

  fetchShopList(){
    const store = this.props.getStoreState();
    const shopStore = store.shopStore;
    const postData = {
      action: 'get_list',
      per_page: store.per_page,
      current_page: store.current_page,
      shop_id: store.mallId
    };
      Ajax({
        url: API.SEARHSHOP,
        data: postData,
        type: 'json',
        method:'post'
      }).then(resp => {
        if (resp.status == 'S') {
          shopStore[idx]['shop_entity_list'] = resp.data.shop_entity_list;
          this.props.setStoreState({
            shopStore: dataShopList
          });
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
