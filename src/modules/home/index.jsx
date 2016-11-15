import { createContainer, createRootContainer } from 'Roof';
import { Form, Input, Row, Col, Button, Select, InputNumber } from 'antd';
import React from 'react';

import fetchData from './fetchData.js';
import SelectTool from '../components/select-tool/index';
import TableList from './tableList';

const Home = React.createClass({
  mixins: [fetchData],
  getInitialState(){
    return {
      billId:'',
      mallList:'',
      mallId: '',
      per_page: 20,
      current_page: 1,
      total_page: 10
    };
  },

  componentDidMount(){
    this.setState({
      per_page: 20,
      current_page: 1,
      total_page: 10
    });
  },
  render() {
    //const store = this.props.getStoreState();
    return (
      <div>
      <Row>
        <Col></Col>
      </Row>
      <Row>
        <Col><TableList dataSource={this.state}></TableList></Col>
      </Row>
      <Row>
        <Col></Col>
      </Row>
      </div>
    );
  }
});

export default createRootContainer({
  mallList: [],
  mallId: '',
  shopStore: [],
  current_page: 1,
  per_page: 20,
  total_page: 10,
  billId:'',
})(Home);
