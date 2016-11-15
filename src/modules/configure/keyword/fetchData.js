import { message, notification } from 'antd';
import Utils from '../../../utils/index';
import Moment from 'moment';
import Permission from '../../../components/permission/index';
const ajax = Utils.ajax,
  commonUtils = Utils.common;
const formatter = 'YYYY-MM-DD';

const API = {
  ADDSITE: '/tag/site/addSite.do',
  DELETESITE: '/tag/site/deleteSite.do',
  FINDCSITE: '/tag/site/findSite.do',
  UPDATESITEL: '/tag/site/updateSite.do',
};

const fetchData = {
  setGroupLoading(status) {
		// console.log(status);
  },
	// 获取初始数据列表
  fetchUpData() {
    const tableList = this.props.getStoreState().tableList;
    const pageData = this.props.getStoreState().pageData;
    this.setGroupLoading(true);
    ajax({
      url: API.FINDCSITE,
      data: pageData,
      type: 'json',
    }).then(resp => {
      if (resp.success) {
        const data = resp.data;
        this.setGroupLoading(false);
        this.props.setStoreState({
          tableList: data,
          editorSate: false,
        });
      }
    }).catch(err => {
      Permission(err);
    });
  },
	// 添加渠道
  fetchAddData() {
    const parmas = this.props.getStoreState().addData;
    ajax({
      url: API.ADDSITE,
      data: { site: JSON.stringify(parmas) },
      method: 'get',
    }).then(resp => {
      if (resp.success) {
        this.setGroupLoading(false);
        this.props.setStoreState({
          editorSate: false,
        });
        this.fetchUpData();
      }
    }).catch(err => {
      Permission(err);
    });
  },
	// 删除渠道
  fetchDeleteData() {
    const deleteSiteId = this.props.getStoreState().siteId;
    ajax({
      url: API.DELETESITE,
      data: { siteId: JSON.stringify(deleteSiteId) },
      method: 'get',
    }).then(resp => {
      if (resp.success) {
        this.setGroupLoading(false);
        this.props.setStoreState({
          editorSate: false,
        });
        this.fetchUpData();
      }
    });
  },
	// 修改
  fetchEditorData() {
    const editor = this.props.getStoreState().editorData;
    ajax({
      url: API.UPDATESITEL,
      data: { site: JSON.stringify(editor) },
      method: 'get',
    }).then(resp => {
      if (resp.success) {
        this.setGroupLoading(false);
        this.props.setStoreState({
          editorSate: false,
        });
        this.fetchUpData();
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
