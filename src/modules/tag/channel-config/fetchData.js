import { message, notification } from 'antd';
import Utils from '../../../utils/index';
import Moment from 'moment';
import Permission from '../../../components/permission/index';
const ajax = Utils.ajax,
  commonUtils = Utils.common;
const formatter = 'YYYY-MM-DD';


const API = {
  DELETEDATATAG: '/tag/channelconfig/DeleteChannelConfig.do',
  FINDDATATAG: '/tag/channelconfig/GetAvailableDisplayChannelConfig.do',
  UPDATATAG: '/tag/channelconfig/UpdateChannelConfig.do',
  ADDDATATAG: '/tag/channelconfig/AddChannelConfig.do',
  FINDPARAM: '/tag/param/QueryParam.do',
  PUBLISHTAG: '/tag/channelconfig/PublishChannelConfig.do',
  GETCHANNETAG: '/tag/channelconfig/GetChangedChannelConfig.do',
  FINDCSITE: '/tag/site/findSite.do',
  FINDCHANNEL: '/tag/channel/findChannel.do',
};


const fetchData = {
  setGroupLoading(status) {
  },
	// 获取初始数据列表
  fetchUpData() {
    const tableList = this.props.getStoreState().tableList;
    this.setGroupLoading(true);
    ajax({
      url: API.FINDDATATAG,
      data: { channelConfigQuery: JSON.stringify({ pageSize: 20 }) },
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
          editorSate: false,
        });
      }
    }).catch(err => {
      Permission(err);
    });
  },

	// 添加
  fetchAddData() {
    const parmas = this.props.getStoreState().addData;
    if (!parmas.paramIdList || parmas.paramIdList == '' || parmas.paramIdList.length == 0) {
      this.openNotificationWithIcon('error', '错误', 'paramIdList字段不能为空!')();
    }/*
		if(!parmas.abtestParamIdList || parmas.abtestParamIdList == "" || parmas.abtestParamIdList.length == 0){
			this.openNotificationWithIcon("error", "错误", "abtestParamIdList字段不能为空!")();
		}*/
    parmas.paramIdList = parmas.paramIdList.toString();
    parmas.abtestParamIdList = parmas.abtestParamIdList.toString();

    ajax({
      url: API.ADDDATATAG,
      data: { channelConfig: JSON.stringify(parmas) },
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

	// 删除
  fetchDeleteData(id) {
    const channelConfigId = this.props.getStoreState().channelConfigId;
    ajax({
      url: API.DELETEDATATAG,
      data: { channelConfigId: JSON.stringify(id) },
      method: 'get',
    }).then(resp => {
      if (resp.success) {
        this.setGroupLoading(false);
        this.props.setStoreState({
          editorSate: false,
        });
        this.fetchUpData();
        this.openNotificationWithIcon('success', '成功', '删除成功!')();
      }
    }).catch(err => {
      Permission(err);
    });
  },

	// 修改
  fetchEditorData() {
    const editor = this.props.getStoreState().editorData;
    if (!editor.paramIdList || editor.paramIdList == '' || editor.paramIdList.length == 0) {
      this.openNotificationWithIcon('error', '错误', 'paramIdList字段不能为空!')();
      return false;
    }
    if (!editor.abtestParamIdList || editor.abtestParamIdList == '' || editor.abtestParamIdList.length == 0) {
      this.openNotificationWithIcon('error', '错误', 'abtestParamIdList字段不能为空!')();
      return false;
    }
    editor.paramIdList = editor.paramIdList.join(',');
    editor.abtestParamIdList = editor.abtestParamIdList.join(',');
    ajax({
      url: API.UPDATATAG,
      data: { channelConfig: JSON.stringify(editor) },
      method: 'get',
    }).then(resp => {
      if (resp.success) {
        this.setGroupLoading(false);
        this.props.setStoreState({
          editorSate: false,
        });
        this.fetchUpData();
        this.openNotificationWithIcon('success', '成功', '修改成功!')();
      }
    }).catch(err => {
      Permission(err);
    });
  },
	// 发布
  publishChangeData() {
    const changeConfigId = this.props.getStoreState().changeConfigId;
    const changeConfigData = this.props.getStoreState().changeConfigData;

    this.setGroupLoading(true);
    ajax({
      url: API.PUBLISHTAG,
      data: { channelConfigIds: changeConfigId, comment: changeConfigData[0].comment },
      method: 'get',
    }).then(resp => {
      if (resp.success) {
        this.setGroupLoading(false);
        this.fetchUpData();
        this.openNotificationWithIcon('success', '成功', '发布成功!')();
      }
    }).catch(err => {
      Permission(err);
    });
  },

	// 获取初始数据列表
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
	// 获取初始数据列表
  getChannelData() {
    ajax({
      url: API.FINDCHANNEL,
      data: { channelQuery: JSON.stringify({}) },
      method: 'get',
    }).then(resp => {
      if (resp.success) {
        const tempArr = [];
        resp.data.map(item => {
          const temp = {};
          temp.key = item.id;
          temp.name = item.channelName;
          tempArr.push(temp);
        });

        this.props.setStoreState({
          channelData: tempArr,
        });
      }
    }).catch(err => {
      Permission(err);
    });
  },
	// 获取初始数据列表
  fetchUpDataParams() {
		// let siteId =  this.props.getStoreState().siteId;
		// if(!siteId || siteId == ""){
			// this.openNotificationWithIcon("error", "错误", "siteId字段不能为空!")();
			// return false;
		// }
    const paramsData = [];
    ajax({
      url: API.FINDPARAM,
			// data: {"paramQuery": JSON.stringify({'pageSize': 50, 'siteId': siteId})},
      data: { paramQuery: JSON.stringify({ pageSize: 50 }) },
      method: 'get',
    }).then(resp => {
      if (resp.data && resp.data != '') {
        resp.data.map(item => {
          const temp = {};
          temp.label = item.paramName;
          temp.value = item.id;
          temp.siteId = item.siteId;
          paramsData.push(temp);
        });
        console.log(paramsData);
        this.props.setStoreState({
          paramsList: paramsData,
        });
        console.log(this.props.getStoreState());
      } else {
        this.openNotificationWithIcon('error', '错误', '请选择正确的站点!')();
      }
    });
  },
	// 全局警告提醒
  openNotificationWithIcon(type, title, content) {
    return function () {
      notification[type]({
        message: title,
        description: content,
        duration: 15,
      });
    };
  },

};

export default fetchData;
