import { createContainer } from 'Roof';
import { Table, Form, Input, Row, Col, Button, Select, InputNumber, Popconfirm, message } from 'antd';
import React from 'react';
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
    };
  },
  _delete(id) {
    this.props.setStoreState({
      strategyTemplateId: id,
    });
    this.setState({
      strategyTemplateId: id,
      visible: true,
    });
    this.fetchDeleteData();
  },

  _editor(editorData) {
    const strategyList = [];

    editorData.strategyList.map((item, idx) => {
      editorData.strategyList[idx].metaName = item.strategyMetaName;
    });

    editorData.strategyName = editorData.strategyName;
    editorData.description = editorData.description;
    editorData.strategyType = editorData.strategyType;
    editorData.strategyList = editorData.strategyList;

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

  _columns() {
    return [{
      title: '策略模板名称',
      dataIndex: 'strategyName',
    }, {
      title: '策略模板类型',
      dataIndex: 'strategyType',
    }, {
      title: '描述',
      dataIndex: 'description',
    }, {
      title: '值域',
      dataIndex: 'expression',
    }, {
      title: '编辑人',
      dataIndex: 'editor',
      key: 'editor',
    }, {
      title: '创建人',
      dataIndex: 'creator',
      key: 'creator',
    }, {
      title: '操作',
      dataIndex: 'id',
      key: 'id',
      render: (text, record) => {
        return (
					<div>
						<Button type="primary" size="small" value={record.id} onClick={this._editor.bind(this, record)}
  style={{ marginRight: '20px' }}
      >修改</Button>
						<Popconfirm title="确定要删除吗？" onConfirm={this._confirm.bind(this, record.id)}
  onCancel={this._cancel}
      ><Button type="primary" size="small"
        value={record.id}
      >删除</Button></Popconfirm>
					</div>);
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
				<Table columns={this._columns()} dataSource={this.props.tableList} pagination={false} />
			</div>
		);
  },
});
export default createContainer({
  tableList: 'tableList',
  tableSelsct: 'tableSelsct',
  paramsList: 'paramsList',
  addData: 'addData',
  configStrategyId: 'configStrategyId',
  configStrategyData: 'configStrategyData',
  strategyTemplateId: 'strategyTemplateId',
  editorData: 'editorData',
  editorSate: 'editorSate',
  accessDeny: 'accessDeny',
  channelData: 'channelData',
  siteData: 'siteData',
  selectedRowKeys: 'selectedRowKeys',
  allOperatorInfo: 'allOperatorInfo',
  allMetainfo: 'allMetainfo',
  strategyList: 'strategyList',
  strategyTemplate: 'strategyTemplate',
  channelConfig: 'channelConfig',
})(TableList);
