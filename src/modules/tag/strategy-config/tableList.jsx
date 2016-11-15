import { createContainer } from 'Roof';
import { Table, Form, Input, Row, Col, Button, Select, Tag, Popconfirm, message } from 'antd';
import React from 'react';
import ChangeInfo from './changeInfo';
import fetchData from './fetchData.js';
import Utils from '../../../utils/index';
const ajax = Utils.ajax,
  commonUtils = Utils.common;

const TableList = React.createClass({
  mixins: [fetchData],
  getInitialState() {
    return {
      selectedRowKeys: [],  // 这里配置默认勾选列
      loading: false,
      visible: false,
      visibleState: false,
      configStrategyId: '',
      configStrategyData: [],
    };
  },

  _delete(id) {
    this.props.setStoreState({
      configStrategyId: id,
    });
    this.setState({
      configStrategyId: id,
      visible: true,
    });

    this.fetchDeleteData(id);
  },

  _publish(id) {
    this.props.setStoreState({
      configStrategyId: id,
    });
    this.setState({
      configStrategyId: id,
      visibleState: false,
    });

    this._getChangeData(id);
  },

  _editor(editorData) {
    const strategyList = [];

    editorData.strategyList.map((item, idx) => {
      editorData.strategyList[idx].metaName = item.strategyMetaName;
    });

    editorData.id = editorData.id;
    editorData.configStrategyName = editorData.configStrategyName;
    editorData.siteDTO = editorData.siteDTO;
    editorData.siteDTO = editorData.siteDTO;
    editorData.channelDTO = editorData.channelDTO;
    editorData.configId = editorData.configId;
    editorData.description = editorData.description;
    editorData.endTime = editorData.endTime;
    editorData.startTime = editorData.startTime;
    editorData.strategyType = editorData.strategyType;
    editorData.configId = editorData.configId;
    editorData.syncMaxAmount = editorData.syncMaxAmount;
    editorData.syncPercentage = editorData.syncPercentage;
    editorData.configId = editorData.configId;
    editorData.strategyList = editorData.strategyList;
    editorData.siteName = editorData.siteDTO.siteName;
    editorData.channelName = editorData.channelDTO.channelName;

		// editorData = Object.assign(StrategyList[idx], tempObj);
    this.props.actionHandleVisibleShow();
    this.props.setStoreState({
      editorData,
      strategyList: editorData.strategyList,
      editorSate: true,
    });
  },

	// 确认删除
  _confirm(id) {
    message.success('正在删除');
    this._delete(id);
  },
	// 取消删除
  _cancel() {
    message.error('取消删除');
  },

  _handleVisibleState() {
    this.setState({
      visibleState: false,
    });
  },

  _columns() {
    return [{
      title: 'ID',
      dataIndex: 'id',
    }, {
      title: '策略配置名称',
      dataIndex: 'configStrategyName',
    }, {
      title: '策略配置类型',
      dataIndex: 'strategyType',
    }, {
      title: '策略配置描述',
      dataIndex: 'description',
    }, {
      title: '渠道',
      dataIndex: 'channelDTO',
      render: (text, record) => {
        return (<div>
					{record.channelDTO.channelName}
				</div>);
      },
    }, {
      title: '站点',
      dataIndex: 'siteDTO',
      render: (text, record) => {
        return (<div>
					{record.siteDTO.siteName}
				</div>);
      },
    }, {
      title: '每天推送最大量',
      dataIndex: 'syncMaxAmount',
    }, {
      title: '推送占比',
      dataIndex: 'syncPercentage',
    }, {
    title: '推送开始时间',
    dataIndex: 'startTime',
  }, {
  title: '推送结束时间',
  dataIndex: 'endTime',
}, {
  title: '策略列表',
  dataIndex: 'strategyExpression',
  render: (text, record) => {
    return (<ul>
					{record.strategyExpression}
				</ul>);
  },
}, {
  title: '版本',
  dataIndex: 'version',
}, {
  title: '创建人',
  dataIndex: 'creator',
  key: 'creator',
}, {
  title: '状态',
  dataIndex: 'status',
  key: 'status',
  render: (text, record) => {
    if (record.status == 'draft') {
      return (<Tag color="green">草稿</Tag>);
    } else if (record.status == 'delete') {
      return (<Tag color="yellow">删除</Tag>);
    } else if (record.status == 'pre_release_delete' || record.status == 'pre_release_draft') {
      let url;
      if (record.approveDTO && record.approveDTO.approveUrl) {
        url = record.approveDTO.approveUrl;
      } else {
        url = '';
      }
      return (<div><Tag color="blue">发布验证中...</Tag><a href={url} target="_blank">查看</a></div>);
    } else if (record.status == 'submit_draft' || record.status == 'submit_delete') {
      let url;
      if (record.approveDTO && record.approveDTO.approveUrl) {
        url = record.approveDTO.approveUrl;
      } else {
        url = '';
      }
      return (<div><Tag color="blue">发布审批中...</Tag><a href={url} target="_blank">查看</a></div>);
    } else if (record.status == 'active') {
      return (<Tag color="blue">生效</Tag>);
    } else {
      return (<Tag color="red">异常</Tag>);
    }
  },
}, {
  title: '操作',
  dataIndex: '',
  key: '',
  render: (text, record) => {
    if (record.status == 'draft') {
      return (<div>
						<Button size="small" value={record.id} onClick={this._editor.bind(this, record)}
  style={{ marginRight: '20px' }}
      >编辑</Button>
						<Popconfirm title="确定要删除吗？" onConfirm={this._confirm.bind(this, record.id)}
  onCancel={this._cancel}
      ><Button size="small" value={record.id}
        style={{ marginRight: '20px' }}
      >删除</Button></Popconfirm>
						<Button size="small" value={record.id} onClick={this._publish.bind(this, record.id)}>发布</Button>
					</div>);
    } else if (record.status == 'delete') {
      return (<div>
						<Popconfirm title="确定要撤销吗？" onConfirm={this._confirm.bind(this, record.id)}
  onCancel={this._cancel}
      ><Button size="small" value={record.id}
        style={{ marginRight: '20px' }}
      >撤销</Button></Popconfirm>
						<Button size="small" value={record.id} onClick={this._publish.bind(this, record.id)}>发布</Button>
					</div>);
    } else if (record.status == 'pre_release_delete' || record.status == 'pre_release_draft') {
      return (<div>{record.status}</div>);
    } else if (record.status == 'submit_draft' || record.status == 'submit_delete') {
      return (<div>{record.status}</div>);
    } else if (record.status == 'active') {
      return (<div>
						<Button size="small" value={record.id} onClick={this._editor.bind(this, record)}
  style={{ marginRight: '20px' }}
      >编辑</Button>
						<Popconfirm title="确定要删除吗？" onConfirm={this._confirm.bind(this, record.id)}
  onCancel={this._cancel}
      ><Button type="primary" size="small"
        value={record.id}
      >删除</Button></Popconfirm>
					</div>);
    }
  },
}];
  },

  componentDidMount() {
    this.fetchUpData();
    this.getSiteData();
    this.getChannelData();
    this.getAllStrategyOperator();
    this.getStratergMeta();
    this.getStrategyTemplate();
  },

  render() {
    return (
			<div>
				<div>
					<Table columns={this._columns()} dataSource={this.props.tableList} pagination={false} />
				</div>
				<div><ChangeInfo visibleState={this.state.visibleState} handleVisibleState={this._handleVisibleState}
  configStrategyData={this.state.configStrategyData}
    /></div>
			</div>);
  },
});
export default createContainer({
  tableList: 'tableList',
  paramsList: 'paramsList',
  addData: 'addData',
  configStrategyId: 'configStrategyId',
  configStrategyData: 'configStrategyData',
  editorData: 'editorData',
  editorSate: 'editorSate',
  accessDeny: 'accessDeny',
  channelData: 'channelData',
  siteData: 'siteData',
  allOperatorInfo: 'allOperatorInfo',
  allMetainfo: 'allMetainfo',
  strategyList: 'strategyList',
  strategyTemplate: 'strategyTemplate',
  channelConfig: 'channelConfig',
})(TableList);
