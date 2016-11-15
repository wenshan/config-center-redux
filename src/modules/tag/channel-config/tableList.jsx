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
      changeConfigId: '',
      changeConfigData: [],
    };
  },

  _delete(id) {
    this.props.setStoreState({
      channeConfigId: id,
    });
    this.setState({
      channeConfigId: id,
      visible: true,
    });

    this.fetchDeleteData(id);
  },

  _publish(id) {
    this.props.setStoreState({
      changeConfigId: id,
    });
    this.setState({
      changeConfigId: id,
      visibleState: false,
    });

    this._getChangeData(id);
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

  _editor(editorData) {
    const paramIdList = [];

    editorData.siteId = editorData.siteDTO.id;
    editorData.siteName = editorData.siteDTO.siteName;
    editorData.channelId = editorData.channelDTO.id;
    editorData.channelName = editorData.channelDTO.channelName;
    editorData.abtestPercentage = editorData.abtestPercentage || '';

    editorData.activeConfig = editorData.activeConfig;
    editorData.abtestParamIdList = editorData.abtestParamIdList || '';
    editorData.config = editorData.config;
    editorData.configName = editorData.configName;
    editorData.paramIdList = editorData.configName;

    console.log(editorData);

    editorData.paramDTOList.map(item => {
      paramIdList.push(item.id);
    });

    editorData.paramIdList = paramIdList;

    this.props.setStoreState({
      siteId: editorData.siteDTO.id,
      editorData,
      addData: editorData,
      editorSate: true,
    });

    this.props.actionHandleVisibleShow();
  },

  _handleVisibleState() {
    this.setState({
      visibleState: false,
    });
  },

	// 获取变更
  _getChangeData(id) {
    ajax({
      url: '/tag/channelconfig/GetChangedChannelConfig.do',
      data: { channelConfigIds: id },
      method: 'get',
    }).then(resp => {
      this.props.setStoreState({
        changeConfigData: resp.data,
      });

      this.setState({
        changeConfigData: resp.data,
        visibleState: true,
      });

      console.log(this.setState);
    });
  },

  _columns() {
    return [{
      title: 'ID',
      dataIndex: 'id',
    }, {
      title: '配置名称',
      dataIndex: 'configName',
    }, {
      title: '配置类型',
      dataIndex: 'type',
    }, {
      title: '配置描述',
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
      title: '站点名称',
      dataIndex: 'siteDTO',
      render: (text, record) => {
        return (<div>
					{record.siteDTO.siteName}
				</div>);
      },
    }, {
      title: '配置config',
      dataIndex: 'config',
      render: (text, record) => {
        return (<Input type="textarea" value={record.config} disabled={false} />);
      },
    }, {
      title: '生效配置config',
      dataIndex: 'activeConfig',
      render: (text, record) => {
      return (<Input type="textarea" value={record.activeConfig} disabled={false} />);
    },
    }, {
    title: '版本',
    dataIndex: 'version',
  }, {
  title: '创建人',
  dataIndex: 'creator',
  key: 'creator',
}, {
  title: '修改时间',
  dataIndex: 'gmtModified',
  key: 'gmtModified',
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
    } else {
      return (<div>{record.status}</div>);
    }
  },
}];
  },
  componentDidMount() {
    this.fetchUpData();
    this.getSiteData();
    this.getChannelData();
    this.fetchUpDataParams();
  },

  render() {
    return (
			<div>
				<div>
					<Table columns={this._columns()} dataSource={this.props.tableList} pagination={false} />
				</div>
				<div><ChangeInfo visibleState={this.state.visibleState} handleVisibleState={this._handleVisibleState}
  changeConfigData={this.state.changeConfigData}
    /></div>
			</div>);
  },
});
export default createContainer({
  tableList: 'tableList',
  siteId: 'siteId',
  paramsList: 'paramsList',
  abtestParamIdList: 'abtestParamIdList',
  addData: 'addData',
  channeConfigId: 'changeConfigId',
  changeConfigData: 'changeConfigData',
  editorData: 'editorData',
  editorSate: 'editorSate',
  accessDeny: 'accessDeny',
  channelData: 'channelData',
  siteData: 'siteData',
  createType: 'createType',
})(TableList);
