import { createContainer } from 'Roof';
import { Table, Form, Input, Row, Col, Button, Select, InputNumber, Popconfirm, message } from 'antd';
import React from 'react';

const InitializeSourceData = {
  HTTP: {
    requestUrl: '',
    parameterMapping: [
			{ key: '', value: '' },
    ],
    returnDataMapping: [
			{ key: '', value: '' },
    ],
  },
  HSF: {
    dataId: '',
    version: '',
    method: '',
    group: '',
    parameterMapping: [
			{ key: '', value: '' },
    ],
    returnDataMapping: [
			{ key: '', value: '' },
    ],
  },
  QUERY_STRING: {
    paramName: '',
  },
};


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
      dataSourceId: '',
    };
  },

  _delete(id) {
    this.props.setStoreState({
      dataSourceId: id,
      editorSate: false,
    });
    this.setState({
      dataSourceId: id,
      visible: true,
    });

    this.fetchDeleteData();
  },

  _editor(editorData) {
    const item = Object.assign({}, editorData);
    const sourceMeta = JSON.parse(editorData.sourceMeta);
    this.props.setStoreState({
      editorData: item,
      sourceMeta,
      initializeType: editorData.sourceType,
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
      title: '数据源名称',
      dataIndex: 'sourceName',
    }, {
      title: '数据源类型',
      dataIndex: 'sourceType',
    }, {
      title: '数据源描述',
      dataIndex: 'description',
    }, {
      title: 'sourceMeta',
      dataIndex: 'sourceMeta',
      render: (text, record) => {
        console.log(record);
        return (record.sourceMeta);
      },
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
  },

  render() {
    return (
			<Row>
				<Col>
					<Table columns={this._columns()} dataSource={this.props.tableList} pagination={false} />
				</Col>
			</Row>
		);
  },
});
export default createContainer({
  tableList: 'tableList',
  dataSourceId: 'dataSourceId',
  editorData: 'editorData',
  editorSate: 'editorSate',
  accessDeny: 'accessDeny',
  addData: 'addData',
  sourceMeta: 'sourceMeta',
  initializeType: 'initializeType',
})(TableList);
