import { message, notification } from 'antd';
import Utils from '../../../utils/index';
import Moment from 'moment';
import Permission from '../../../components/permission/index';

const ajax = Utils.ajax,
  commonUtils = Utils.common;
const formatter = 'YYYY-MM-DD';

const API = {
  ADDCHANNEL: '/tag/channel/addChannel.do',
  DELETECHANNEL: '/tag/channel/deleteChannel.do',
  FINDCHANNEL: '/tag/channel/findChannel.do',
  UPDATACHANNEL: '/tag/channel/updateChannel.do',
};

const fetchData = {
  setGroupLoading(status) {
		// console.log(status);
  },
	// 获取初始数据列表
  fetchUpData() {
    this.setGroupLoading(true);
    ajax({
      url: API.FINDCHANNEL,
      data: { channelQuery: JSON.stringify({}) },
      method: 'get',
    }).then(resp => {
      if (resp.success) {
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
      }
    }).catch(err => {
      Permission(err);
    });
  },
	// 添加渠道
  fetchAddData() {
    const parmas = this.props.getStoreState().addData;
    ajax({
      url: API.ADDCHANNEL,
      data: { channel: JSON.stringify(parmas) },
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
    const deleteSiteId = this.props.getStoreState().channelId;
    ajax({
      url: API.DELETECHANNEL,
      data: { channelId: JSON.stringify(deleteSiteId) },
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
      url: API.UPDATACHANNEL,
      data: { channel: JSON.stringify(editor) },
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
