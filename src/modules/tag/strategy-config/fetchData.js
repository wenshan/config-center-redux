import { message, notification } from 'antd';
import Utils from '../../../utils/index';
import Moment from 'moment';
import Permission from '../../../components/permission/index';
const ajax = Utils.ajax,
  commonUtils = Utils.common;
const formatter = 'YYYY-MM-DD hh:mm:ss';

const API = {
  FINDCSITE: '/tag/site/findSite.do',
  FINDCHANNEL: '/tag/channel/findChannel.do',
	// 获取meta
  FINDSTRATEGYMETA: '/tag/strategy/GetAllStrategyMeta.do',
	// 获取操纵符
  OPERATINPLAN: '/tag/strategy/GetAllStrategyOperator.do',
	// 查询渠道配置
  FINDSTRATEGYCONFIG: '/tag/strategy/GetAvailableDisplayConfigStrategy.do',
  PUBLISHSTRATEGYCONFIG: '/tag/strategy/PublishConfigStrategy.do',
  DELETESTRATEGYCONFIG: '/tag/strategy/DeleteConfigStrategy.do',
  QUERYCHANNECLANNELCONFIG: '/tag/channelconfig/QueryChannelConfig.do',
  ADDDSTRATEGYCONFIG: '/tag/strategy/AddConfigStrategy.do',
  UPDATASTRATEGYCONFIG: '/tag/strategy/UpdateConfigStrategy.do',
  QUERYSTRATEGYTEMPLATE: '/tag/strategy/QueryStrategyTemplate.do',
  GETCHANGEDCONFIGSTRATEGY: '/tag/strategy/GetChangedConfigStrategy.do',
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
      url: API.FINDSTRATEGYCONFIG,
      data: { configStrategy: JSON.stringify({ pageSize: 20 }) },
      method: 'get',
    }).then(resp => {
      const data = resp.data;
      data.map((item, idx) => {
        if (item.gmtCreate && item.gmtModified && item.endTime && item.startTime) {
          data[idx].endTime = Moment(item.endTime).format(formatter);
          data[idx].startTime = Moment(item.startTime).format(formatter);
          data[idx].gmtCreate = Moment(item.gmtCreate).format(formatter);
          data[idx].gmtModified = Moment(item.gmtModified).format(formatter);
        }
      });
      this.setGroupLoading(false);
      this.props.setStoreState({
        tableList: data,
        editorSate: false,
      });
    }).catch(err => {
      Permission(err);
    });
  },
	// 添加渠道
  fetchAddData() {
    const arr = [];
    const parmas = this.props.getStoreState().addData;


    if (parmas.strategyList) {
      parmas.strategyList.map((item, idx) => {
        parmas.strategyList[idx].valueListHtml = '';
      });
    }

    ajax({
      url: API.ADDDSTRATEGYCONFIG,
      data: { configStrategy: JSON.stringify(parmas) },
      method: 'get',
    }).then(resp => {
      this.setGroupLoading(false);
      this.props.setStoreState({
        editorSate: false,
      });
      this.fetchUpData();
      this.openNotificationWithIcon('success', '成功', '添加成功!')();
    }).catch(err => {
      Permission(err);
    });
  },

	// 删除渠道
  fetchDeleteData(id) {
    const configStrategyId = this.props.getStoreState().configStrategyId;
    ajax({
      url: API.DELETESTRATEGYCONFIG,
      data: { configStrategyId: JSON.stringify(configStrategyId) },
      method: 'get',
    }).then(resp => {
      this.setGroupLoading(false);
      this.props.setStoreState({
        editorSate: false,
      });
      this.fetchUpData();
      this.openNotificationWithIcon('success', '成功', `${resp.errorMsg}删除成功!`)();
    }).catch(err => {
      Permission(err);
    });
  },

	// 修改
  fetchEditorData() {
    const editorData = this.props.getStoreState().editorData;
    ajax({
      url: API.UPDATASTRATEGYCONFIG,
      data: { configStrategy: JSON.stringify(editorData) },
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

	// 获取变更
  _getChangeData(id) {
    ajax({
      url: API.GETCHANGEDCONFIGSTRATEGY,
      data: { configStrategyIds: id },
      method: 'get',
    }).then(resp => {
      if (resp.success) {
        const temp = {};

        const data = resp.data;

        data.map((ietm, idx) => {
          data[idx].comment = '';
        });

        this.props.setStoreState({
          configStrategyData: data,
        });

        this.setState({
          configStrategyData: data,
          visibleState: true,
        });
      }
    }).catch(err => {
      Permission(err);
    });
  },
	// 发布
  publishChangeData() {
    const configStrategyId = this.props.getStoreState().configStrategyId;
    const configStrategyData = this.props.getStoreState().configStrategyData;
    this.setGroupLoading(true);
    ajax({
      url: API.PUBLISHSTRATEGYCONFIG,
      data: { configStrategyIds: configStrategyId, comment: configStrategyData[0].comment },
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

	// 获取初始渠道数据列表
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

	// 获取TAG配置
  getChannelConfig() {
    const postData = {};
    const addData = this.props.getStoreState().addData;
    const siteId = addData.siteId;
    const channelId = addData.channelId;

    postData.siteId = siteId;
    postData.channelId = channelId;
    postData.status = 'active';
    postData.pageSize = 20;

    ajax({
      url: API.QUERYCHANNECLANNELCONFIG,
      data: { channelConfigQuery: JSON.stringify(postData) },
      method: 'get',
    }).then(resp => {
      if (resp.success) {
        const tempArr = [];
        resp.data.map(item => {
          const temp = {};
          temp.key = item.id;
          temp.name = item.configName;
          tempArr.push(temp);
        });
        this.props.setStoreState({
          channelConfig: tempArr,
        });
      } else {
        this.props.setStoreState({
          channelConfig: [],
        });
      }
    }).catch(err => {
      Permission(err);
    });
  },

	// 获取策略模板
  getStrategyTemplate() {
    ajax({
      url: API.QUERYSTRATEGYTEMPLATE,
      data: { strategyQuery: JSON.stringify({ pageSize: 30 }) },
      method: 'get',
    }).then(resp => {
      if (resp.success) {
        const data = resp.data;
        data.map((item, idx) => {
          data[idx].key = item.id;
          data[idx].name = item.strategyName;
        });
        this.props.setStoreState({
          strategyTemplate: data,
        });
      }
    }).catch(err => {
      Permission(err);
    });
  },


	// 获取操纵符
  getAllStrategyOperator() {
    const item = this.state.operatorData;
    ajax({
      url: API.OPERATINPLAN,
      data: {},
      method: 'get',
    }).then(resp => {
      if (resp.success) {
        this.props.setStoreState({
          allOperatorInfo: resp.data,
        });
      } else {
        this.openNotificationWithIcon('error', '错误', resp.errorMsg)();
      }
    }).catch(err => {
      Permission(err);
    });
  },

	// 初始化meta
  getStratergMeta() {
    ajax({
      url: API.FINDSTRATEGYMETA,
      data: {},
      method: 'get',
    }).then(resp => {
      if (resp.success) {
        this.props.setStoreState({
          allMetainfo: resp.data,
        });
      } else {
        this.openNotificationWithIcon('error', '错误', resp.errorMsg)();
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
