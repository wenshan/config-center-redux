import { createContainer } from 'Roof';
import { Table, Form, Input, Row, Col, Button, Select, InputNumber, Popconfirm, message } from 'antd';
import React from 'react';

import fetchData from './fetchData.js';

const TableList = React.createClass({
  mixins: [fetchData],
  getInitialState() {
    return {
      selectedRowKeys: [],  // 这里配置默认勾选列
      loading: false,
      visible: false,
      tableList: [],
      editor: {},
      channelId: '',
    };
  },

  _delete(id) {
    this.props.setStoreState({
      paramId: id,
    });
    this.setState({
      paramId: id,
      visible: true,
    });
    this.fetchDeleteData();
  },

  _editor(editorData) {
    this.props.setStoreState({
      editorData,
      editorSate: true,
    });
    this.props.actionHandleVisibleShow();
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
      title: '参数名称',
      dataIndex: 'paramName',
      key: 'paramName',
    }, {
      title: '参数描述',
      dataIndex: 'description',
      key: 'description',
    }, {
      title: '数据源',
      dataIndex: 'dataSourceDTO',
      key: 'dataSourceDTO',
      render: (text, record) => {
        return (<div>{record.dataSourceDTO.sourceName}</div>);
      },
    }, {
      title: '所属站点',
      dataIndex: 'siteDTO',
      key: 'siteDTO',
      render: (text, record) => {
        return (<div>{record.siteDTO.siteName}</div>);
      },
    }, {
      title: '创建时间',
      dataIndex: 'gmtCreate',
      key: 'gmtCreate',
    }, {
      title: '修改时间',
      dataIndex: 'gmtModified',
      key: 'gmtModified',
    }, {
      title: '操作',
      dataIndex: 'id',
      key: 'id',
      render: (text, record) => {
        return (
					<div><Button type="primary" size="small" value={record.id} onClick={this._editor.bind(this, record)}
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
    this.getfetchUpDataSource();
    this.getSiteData();
  },

  render() {
    return (
			<div>
				<Table columns={this._columns()} dataSource={this.props.getStoreState().tableList} pagination={false} />
			</div>
		);
  },
});
export default createContainer({
  tableList: 'tableList',
  paramId: 'channelId',
  addData: 'addData',
  editorData: 'editorData',
  editorSate: 'editorSate',
  accessDeny: 'accessDeny',
  dataSource: 'dataSource',
  siteData: 'siteData',
})(TableList);
