import { createContainer } from 'Roof';
import { Table, Form, Input, Row, Col, Button, Select, InputNumber, Popconfirm, message, Pagination } from 'antd';
import React from 'react';
import DeepAssign from 'deep-assign';
import fetchData from './fetchData.js';
const Option = Select.Option;
const TableList = React.createClass({
  mixins: [fetchData],
  getInitialState() {
    return {
      billId: '',
      mallIndex: 0,
      shopIndex: 0,
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

    this.fetchAllMallList(this.state);
  },
  _columns() {
    return [{
      title: 'Mall',
      dataIndex: 'shop_name',
      key: 'shop_name'
    },{
      title: '店铺',
      dataIndex: 'shop_entity_name',
      key: 'shop_entity_name'
    },{
      title: '设备',
      dataIndex: 'terminal_number',
      key: 'terminal_number',
      render: (text, record) => {
          return record.terminal_number.toString();
      }
    },{
      title: '涉及小票数量',
      dataIndex: 'receipt_count',
      key: 'receipt_count'
    },{
      title: '上次修改时间',
      dataIndex: 'modified_time',
      key: 'modified_time'
    },{
      title: '状态',
      dataIndex: 'review_state',
      key: 'review_state',
      render: (text, record) => {
        return record.review_state.toString();
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
  _handleChange(value){
    this.props.setStoreState({
      mallId: value
    });
    this.setState({
      mallId: value,
      current_page: 1,
      per_page: 10,
      total_page: 10,
    });
    this.fetchAllMallList();
  },
  componentDidMount() {
    const store = this.props.getStoreState();
    console.log(store);
    this.props.setStoreState({
      current_page: this.state.current_page,
      total_page: this.state.total_page
    });

    this.fetchAllMallList();

    this.setState({
      shopStore: store.shopStore,
      current_page: store.current_page,
      total_page: store.total_page
    });
  },

  componentWillReceiveProps(object, nextProps){
    console.log(this.props.dataSource.terminalNumber !== object.dataSource.terminalNumber);
    const state = this.props.getStoreState();
    if(this.props.current_page !== object.current_page){
      this.props.setStoreState({
        current_page: object.current_page
      });
      this.setState({
        shopStore: object.shopStore,
        current_page: object.current_page,
        total_page: object.total_page
      });
      this.fetchAllMallList();
    }else{
      this.setState({
        shopStore: object.shopStore,
        current_page: object.current_page,
        total_page: object.total_page
      });
    }
  },

  render() {
    const mallList = this.props.getStoreState().mallList;
    const pagination = {
      current: this.state.current_page,
      defaultCurrent: 1,
      total: this.state.total_page * this.state.per_page,
      pageSize: this.state.per_page,
      onChange: this._paginationOnChange
    };
    const selectOption = [];

    mallList.map((item, idx) =>{
      selectOption.push(<Option value={item.shop_id}>{item.shop_name}</Option>);
    });

    return (
      <div>
      <Row>
        <Col></Col>
        <Col>
          <Select
            showSearch
      style={{ width: 260 }}
      placeholder="Select a person"
      optionFilterProp="children"
      onChange={this._handleChange}
      notFoundContent=""
    >
    {selectOption}
    </Select>
        </Col>
      </Row>
      <Row>
        <Col>
          <Table columns={this._columns()} dataSource={this.state.shopStore} pagination={pagination} />
        </Col>
      </Row>
</div>
		);
  },
});
export default createContainer({
  mallList: 'mallList',
  mallId:'mallId',
  shopStore: 'shopStore',
  current_page: 'current_page',
  per_page: 'per_page',
  total_page: 'total_page',
  billId:'billId',
})(TableList);
