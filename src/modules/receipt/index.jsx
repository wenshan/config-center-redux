import { createContainer, createRootContainer } from 'Roof';
import { Form, Input, Row, Col, Button, Select, InputNumber } from 'antd';
import React from 'react';
import './index.css';

import fetchData from './fetchData.js';
import SelectTool from '../components/select-tool/index';
import TableList from './tableList';
import Detail from './detail';

const Receipt = React.createClass({
  mixins: [fetchData],
  getInitialState(){
    return {
      receiptList:[],
      terminalNumber:"00956923E40F",
      shopEntity:{
        "modified_time": "Fri, 04 Nov 2016 14:25:54 GMT",
        "receipt_count": 45,
        "shop_entity_id": "1ADSSOFANL0RI600A1B8AMS4DO2ECUFI",
        "shop_entity_name": "上海办公室硬采设备",
        "shop_name": "测试商家",
        "terminal_number": [
          "00956923E40F",
          "00956923E40F"
        ]
      },
      mallEntity:{
        "shop_id": "1A08RV8DIJV5DA00A1B8B974M52AAN5M",
        "shop_name": "测试商家"
      },
      per_page: 20,
      current_page: 1,
      total_page: 50
    };
  },
  _getShopinfo(terminalNumber, shopEntity, mallEntity){
    this.setState({
      terminalNumber: terminalNumber,
      shopEntity: shopEntity,
      mallEntity: mallEntity
    });
  },
  componentDidMount(){
    this.setState({
      terminalNumber:"00956923E40F",
      shopEntity:{
        "modified_time": "Fri, 04 Nov 2016 14:25:54 GMT",
        "receipt_count": 45,
        "shop_entity_id": "1ADSSOFANL0RI600A1B8AMS4DO2ECUFI",
        "shop_entity_name": "上海办公室硬采设备",
        "shop_name": "测试商家",
        "terminal_number": [
          "00956923E40F",
          "00956923E40F"
        ]
      },
      mallEntity:{
        "shop_id": "1A08RV8DIJV5DA00A1B8B974M52AAN5M",
        "shop_name": "测试商家"
      }
    });
  },
  render() {
    //const store = this.props.getStoreState();
    return (
      <div>
      <Row>
        <Col><SelectTool terminalOnChange={this._getShopinfo}></SelectTool></Col>
      </Row>
      <Row>
        <Col><TableList dataSource={this.state}></TableList></Col>
      </Row>
      <Row>
        <Col><Detail></Detail></Col>
      </Row>
      </div>
    );
  }
});

export default createRootContainer({
  isUpData: false,
  receiptList: [],
  terminalNumber: '00956923E40F',
  shopEntity: {},
  mallEntity: {},
  billId: '',
  current_page: 1,
  per_page: 10,
  total_page: 10
})(Receipt);
