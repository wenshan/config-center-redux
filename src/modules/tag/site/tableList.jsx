import { createContainer } from 'Roof';
import { Table, Form, Input, Row, Col, Button, Select, InputNumber, Popconfirm, message, Pagination } from 'antd';
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
      sitId: '',
      pageData:{
        defaultCurrent:1,
        current:1,
        total:50
      }
    };
  },

  _delete(id) {
    this.props.setStoreState({
      siteId: id,
    });
    this.setState({
      siteId: id,
      visible: true,
    });
    this.fetchDeleteData();
  },

  _editor(editorData) {
    this.props.actionHandleVisibleShow();
    this.props.setStoreState({
      editorData,
      editorSate: true,
    });
  },
  _pageTrun(current){
    this.props.setStoreState({
      pageData: Object.assign(this.state.pageData, { current: current })
    });
    this.setState({
      pageData: Object.assign(this.state.pageData, { current: current })
    });

    this.fetchUpData();
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
      title: '站点名称',
      dataIndex: 'siteName',
    }, {
      title: '站点域名',
      dataIndex: 'domain',
    }, {
      title: '站点描述',
      dataIndex: 'description',
    }, {
      title: '接口人',
      dataIndex: 'interfacePersonList',
      render: (text, record) => {
        const items = [];
        record.interfacePersonList.map((item) => {
          items.push(item.lastName);
        });

        return (<div>{items.toString()}</div>);
      },
    }, {
      title: '操作',
      dataIndex: 'id',
      render: (text, record) => {
        return (<div>
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
  },

  render() {
    const initData = [{
      siteName: 'mailto://pnkrdddrwx.fr/nxrwatk',
      interfacePersonList: '尹涛',
      id: '123123',
      domain: 'ftp://eesllc.mobi/iebwowdsnq',
      description: 'description',
    }];
    return (
			<div>
				<Table columns={this._columns()} dataSource={this.props.tableList} pagination={false} />
                <Pagination onChange={this._pageTrun} defaultCurrent={this.state.pageData.defaultCurrent} total={this.state.pageData.total} current={this.state.pageData.current}/>
			</div>
		);
  },
});
export default createContainer({
  tableList: 'tableList',
  siteId: 'siteId',
  editorData: 'editorData',
  editorSate: 'editorSate',
  accessDeny: 'accessDeny',
  addData: 'addData',
  interfacePersonList: 'interfacePersonList',
  pageData:'pageData'
})(TableList);
