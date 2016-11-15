import { message, notification } from 'antd';
import Utils from '../../../utils/index';
import Moment from 'moment';
import Permission from '../../../components/permission/index';
const ajax = Utils.ajax,
  commonUtils = Utils.common;
const formatter = 'YYYY-MM-DD';

const API = {
  DELETEDATASOURCE: '/tag/datasource/deleteDataSource.do',
  FINDDATASOURCE: '/tag/datasource/findDataSource.do',
  UPDATASOURCE: '/tag/datasource/updateDataSource.do',
  ADDDATASOURCE: '/tag/datasource/addDataSource.do',
};
const DATA = {
  HTTP: {
    sourceName: 'ali',
    sourceType: 'HTTP',
    sourceMeta: {
      requestUrl: 'http://www.aa.com',
      parameterMapping: {
        K: 'V',
      },
      returnDataMapping: {
        K: 'V',
      },
    },
    description: 'test',
  },
  HSF: {
    sourceName: 'ali',
    sourceType: 'HSF',
    sourceMeta: {
      dataId: 'com.aa.a21',
      version: '1.0',
      method: 'aaCC',
      group: '',
      parameterMapping: { K: 'V' },
      returnDataMapping: { K: 'V' },
    },
    description: 'test',
  },
  QUERY_STRING: {
    sourceName: 'ali',
    sourceType: 'QUERY_STRING',
    sourceMeta: {
      paramName: 'name',
    },
    description: 'test',
  },
};


const fetchData = {
  setGroupLoading(status) {
		// console.log(status);
  },
	// 获取初始数据列表
  fetchUpData() {
    const tableList = this.props.getStoreState().tableList;
    this.setGroupLoading(true);
    ajax({
      url: API.FINDDATASOURCE,
      data: { dataSource: JSON.stringify({ pageSize: 20 }) },
      method: 'get',
    }).then(resp => {
      const data = resp.data;
      data.map((item, idx) => {
        if (item.gmtCreate && item.gmtModified) {
          data[idx].gmtCreate = Moment(item.gmtCreate).format(formatter);
          data[idx].gmtModified = Moment(item.gmtModified).format(formatter);
        }
      });
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
    const addData = this.props.getStoreState().addData;

    ajax({
      url: API.ADDDATASOURCE,
      data: { datasource: JSON.stringify(addData) },
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
    const deleteSiteId = this.props.getStoreState().dataSourceId;
    ajax({
      url: API.DELETEDATASOURCE,
      data: { dataSourceId: JSON.stringify(deleteSiteId) },
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
      url: API.UPDATASOURCE,
      data: { dataSource: JSON.stringify(editor) },
      method: 'get',
    }).then(resp => {
      if (resp.success) {
        this.setGroupLoading(false);
        this.props.setStoreState({
          editorSate: false,
        });
        this.fetchUpData();
      } else {
				// this.fetchUpData();
      }
    }).catch(err => {
				// Permission(err);
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
