import { message, notification } from 'antd';
import Utils from '../../../utils/index';
import Moment from 'moment';
import Permission from '../../../components/permission/index';
const ajax = Utils.ajax,
  commonUtils = Utils.common;
const formatter = 'YYYY-MM-DD';

const API = {
  ADDPARAM: '/tag/param/AddParam.do',
  DELETEPARAM: '/tag/param/DeleteParam.do',
  FINDPARAM: '/tag/param/QueryParam.do',
  UPDATAPARAM: '/tag/param/UpdateParam.do',
  FINDCSITE: '/tag/site/findSite.do',
  FINDDATASOURCE: '/tag/datasource/findDataSource.do',
};

const fetchData = {
  setGroupLoading(status) {
		// console.log(status);
  },
	// 获取初始数据列表
  fetchUpData() {
    this.setGroupLoading(true);
    ajax({
      url: API.FINDPARAM,
      data: { paramQuery: JSON.stringify({ pageSize: 50 }) },
      method: 'get',
    }).then(resp => {
      const data = resp.data;
      if (data.length > 0) {
        data.map((item, idx) => {
          if (item.gmtCreate && item.gmtModified) {
            data[idx].gmtCreate = Moment(item.gmtCreate).format(formatter);
            data[idx].gmtModified = Moment(item.gmtModified).format(formatter);
          }
        });
      }

      this.setGroupLoading(false);

      this.props.setStoreState({
        tableList: data,
      });
    }).catch(err => {
      Permission(err);
    });
  },
	// 添加渠道
  fetchAddData() {
    const parmas = this.props.getStoreState().addData;
    ajax({
      url: API.ADDPARAM,
      data: { param: JSON.stringify(parmas) },
      method: 'get',
    }).then(resp => {
      this.setGroupLoading(false);
      this.props.setStoreState({
        editorSate: false,
      });
      this.fetchUpData();
    }).catch(err => {
      Permission(err);
    });
  },
	// 删除渠道
  fetchDeleteData() {
    const deleteSiteId = this.props.getStoreState().paramId;
    ajax({
      url: API.DELETEPARAM,
      data: { paramId: JSON.stringify(deleteSiteId) },
      method: 'get',
    }).then(resp => {
      this.setGroupLoading(false);
      this.props.setStoreState({
        editorSate: false,
      });
      this.fetchUpData();
    }).catch(err => {
      Permission(err);
    });
  },
	// 修改
  fetchEditorData() {
    const editor = this.props.getStoreState().editorData;
    ajax({
      url: API.UPDATAPARAM,
      data: { param: JSON.stringify(editor) },
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
	// 获取site初始数据列表
  getSiteData() {
    ajax({
      url: API.FINDCSITE,
      data: { siteQuery: JSON.stringify({}) },
      type: 'json',
    }).then(resp => {
      const tempArr = [];
      resp.data.map(item => {
        const temp = {};
        temp.key = item.id;
        temp.name = item.siteName;
        tempArr.push(temp);
      });
      if (resp.success) {
        this.props.setStoreState({
          siteData: tempArr,
        });
      }
    }).catch(err => {
      Permission(err);
    });
  },
	// 获取数据源初始数据列表
  getfetchUpDataSource() {
    ajax({
      url: API.FINDDATASOURCE,
      data: { dataSource: JSON.stringify({ pageSize: 20 }) },
      method: 'get',
    }).then(resp => {
      const tempArr = [];
      resp.data.map(item => {
        const temp = {};
        temp.key = item.id;
        temp.name = item.sourceName;
        tempArr.push(temp);
      });
      if (resp.success) {
        this.props.setStoreState({
          dataSource: tempArr,
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
