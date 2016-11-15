import { createContainer } from 'Roof';
import { Modal, Table, Form, Input, Row, Col, Button, Select, InputNumber, Popconfirm, message, Pagination } from 'antd';
import React from 'react';
import DeepAssign from 'deep-assign';
import fetchData from './fetchData.js';


const Detail = React.createClass({
  mixins: [fetchData],
  getInitialState() {
    return {
      receiptList: [],
      terminalNumber: '',
      shopEntity: [],
      mallEntity: [],
      billId:'',
      visible: false
    };
  },
  componentDidMount() {

  },
  componentWillReceiveProps(object, nextProps){

  },
  render() {
    return (<div>
      <Modal width={1000} wrapClassName="vertical-center-modal" title="小票详情：" visible={this.state.visible} onOk={this.handleOk} onCancel={this.handleCancel}>
          <Row>
            <Col></Col>
          </Row>
          <Row>
            <Col></Col>
            <Col></Col>
          </Row>
          <Row>
            <Col></Col>
          </Row>
          <Row>
            <Col></Col>
          </Row>
      </Modal>
      <Modal
          title="20px to Top"
          style={{ top: 20 }}
          visible={false}
        >
          <p>some contents...</p>
          <p>some contents...</p>
          <p>some contents...</p>
        </Modal>
        </div>
    );
  }
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
})(Detail);
