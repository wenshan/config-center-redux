import { message, notification } from 'antd';
import Utils from '../../../utils/index';
import Moment from 'moment';
import Permission from '../../../components/permission/index';
const ajax = Utils.ajax,
  commonUtils = Utils.common;
const formatter = 'YYYY-MM-DD';

const API = {
  ADDPLAN: '/tag/strategy/AddStrategyTemplate.do',
  DELETEPLAN: '/tag/strategy/DeleteStrategyTemplate.do',
  FINDSTRATEGYMETA: '/tag/strategy/GetAllStrategyMeta.do',
  UPDATAPLAN: '/tag/strategy/UpdateStrategyTemplate.do',
  FINDDATASOURCE: '/tag/strategy/QueryStrategyTemplate.do', // 数据源
  OPERATINPLAN: '/tag/strategy/GetAllStrategyOperator.do', // 策略操作

  FINDCSITE: '/tag/site/findSite.do',
  FINDCHANNEL: '/tag/channel/findChannel.do',
	// 获取meta
  FINDSTRATEGYMETA: '/tag/strategy/GetAllStrategyMeta.do',
	// 获取操纵符
  OPERATINPLAN: '/tag/strategy/GetAllStrategyOperator.do',
  QUERYSTRATEGYTEMPLATE: '/tag/strategy/QueryStrategyTemplate.do',
};


const data = {
  strategyName: 'country',
  description: 'country',
  strategyType: 'and',
  strategyList: [
    {
      strategyMetaName: 'country',
      operatorType: '>',
      compareValue: '100',
    },
  ],
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
      data: { strategyQuery: JSON.stringify({ pageSize: 20 }, { sourceType: 'HTTP' }) },
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
        tableList: resp.data,
      });
    }).catch(err => {
      Permission(err);
    });
  },
	// 添加渠道
  fetchAddData() {
    const paramas = this.props.getStoreState().addData;

    paramas.strategyList.map((item, idx) => {
      paramas.strategyList[idx].compareValue = item.compareValue.toString();
    });

    ajax({
      url: API.ADDPLAN,
      data: { strategyTemplate: JSON.stringify(paramas) },
      method: 'get',
    }).then(resp => {
      this.setGroupLoading(false);
      this.props.setStoreState({
        editorSate: false,
      });
      this.openNotificationWithIcon('success', '成功', '添加成功!')();
      this.fetchUpData();
    }).catch(err => {
      Permission(err);
    });
  },
	// 删除渠道
  fetchDeleteData() {
    const strategyTemplateId = this.props.getStoreState().strategyTemplateId;
    ajax({
      url: API.DELETEPLAN,
      data: { strategyTemplateId: JSON.stringify(strategyTemplateId) },
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
    const editorData = this.props.getStoreState().editorData;

    ajax({
      url: API.UPDATAPLAN,
      data: { strategyTemplate: JSON.stringify(editorData) },
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
	// 获取数据源数据
  fetchUpDataSource() {
    this.setGroupLoading(true);
    ajax({
      url: API.FINDDATASOURCE,
      data: { dataSource: JSON.stringify({ pageSize: 20 }) },
      method: 'get',
    }).then(resp => {
      resp.data.map((item, idx) => {
        resp.data[idx].key = item.id;
      });

      this.setGroupLoading(false);
      this.props.setStoreState({
        tableSelsct: resp.data,
      });
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
