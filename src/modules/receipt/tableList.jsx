import { createContainer } from 'Roof';
import { Table, Form, Input, Row, Col, Button, Select, InputNumber, Popconfirm, message, Pagination } from 'antd';
import React from 'react';
import DeepAssign from 'deep-assign';
import fetchData from './fetchData.js';

const TableList = React.createClass({
  mixins: [fetchData],
  getInitialState() {
    return {
      receiptList: [],
      terminalNumber: '',
      shopEntity: [],
      mallEntity: [],
      billId:'',
      per_page: 10,
      current_page: 1,
      total_page: 10
    };
  },
  _check(receipt) {
    console.log(receipt);
  },
  _paginationOnChange(current){

    this.setState({
      current_page: current,
      total_page: this.props.total_page
    });

    this.props.setStoreState({
      current_page: current,
      per_page: this.state.per_page
    });

    this.fetchUpData(this.state);
  },
  _columns() {
    return [{
      title: '票号',
      dataIndex: 'bill_id',
      key: 'bill_id'
    },{
      title: '错误类型',
      dataIndex: 'error_type',
      key: 'error_type'
    },{
      title: '错误描述',
      dataIndex: 'error',
      key: 'error',
      width: 150
    },{
      title: '版本号',
      dataIndex: 'version',
      key: 'version'
    },{
      title: '小票图片',
      dataIndex: 'bill_img_url',
      key: 'bill_img_url',
      render: (text, record) => {
        return <img src={record.bill_img_url} width='250'/>;
      }
    },{
      title: '原始文本',
      dataIndex: 'bill_orig_text',
      key: 'bill_orig_text',
      width: 250,
      render: (text, record) => {
        var textHtml = record.bill_orig_text.replace(/\n/g,'<br/>');
        return <div dangerouslySetInnerHTML={{__html:textHtml}}></div>;
      }
    },{
      title: '操作',
      render: (text, record) => {
        return (<div>
          <Button type="primary" size="small" value={record.bill_id} onClick={this._check.bind(this, record)}
  style={{ marginRight: '20px' }}>查看</Button>
				</div>);
      },
    }];
  },

  componentDidMount() {
    const store = this.props.getStoreState();
    this.props.setStoreState({
      terminalNumber: this.props.dataSource.terminalNumber,
      shopEntity: this.props.dataSource.shopEntity,
      mallEntity: this.props.dataSource.mallEntity
    });

    this.fetchUpData();
    this.setState({
      receiptList: store.receiptList,
      terminalNumber: store.terminalNumber,
      shopEntity: store.shopEntity,
      mallEntity: store.mallEntity,
      current_page: store.current_page,
      total_page: store.total_page
    });
  },

  componentWillReceiveProps(object, nextProps){
    console.log(this.props.dataSource.terminalNumber !== object.dataSource.terminalNumber);
    const state = this.props.getStoreState();
    if(this.props.dataSource.terminalNumber !== object.dataSource.terminalNumber){
      this.props.setStoreState({
        terminalNumber: object.dataSource.terminalNumber
      });

      this.setState({
        receiptList: object.receiptList,
        terminalNumber: object.dataSource.terminalNumber,
        shopEntity: object.dataSource.shopEntity,
        mallEntity: object.dataSource.mallEntity,
        current_page: object.current_page,
        total_page: object.total_page
      });

      this.fetchUpData();
    }else{
      this.setState({
        receiptList: object.receiptList,
        terminalNumber: object.dataSource.terminalNumber,
        shopEntity: object.dataSource.shopEntity,
        mallEntity: object.dataSource.mallEntity,
        current_page: object.current_page,
        total_page: object.total_page
      });
    }
  },
  _setHeader(){
    const store = this.state;
    return (<div style={{height:40,paddingTop:20}}> {store.mallEntity.shop_name}  >   {store.shopEntity.shop_entity_name}  >  {store.terminalNumber}</div>);
  },
  render() {
    const pagination = {
      current: this.state.current_page,
      defaultCurrent: 1,
      total: this.state.total_page * this.state.per_page,
      pageSize: this.state.per_page,
      onChange: this._paginationOnChange
    };
    console.log(pagination);
    return (
				<Table title={this._setHeader} columns={this._columns()} dataSource={this.state.receiptList} pagination={pagination} />
		);
  },
});
export default createContainer({
  isUpData: 'isUpData',
  receiptList: 'receiptList',
  terminalNumber: 'terminalNumber',
  shopEntity: 'shopEntity',
  mallEntity: 'mallEntity',
  billId:'billId',
  current_page: 'current_page',
  per_page: 'per_page',
  total_page: 'total_page'
})(TableList);
