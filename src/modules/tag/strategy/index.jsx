import { createContainer, createRootContainer } from 'Roof';
import { Form, Input, Row, Col, Button, Select, InputNumber } from 'antd';
import React from 'react';
import TableList from './tableList';
import FormAction from './formAction';
import fetchData from './fetchData.js';
import Utils from '../../../utils/index';
const ajax = Utils.ajax,
  commonUtils = Utils.common;

const App = React.createClass({
  mixins: [fetchData],
  getInitialState() {
    return {
      visible: false,
    };
  },
  buttonCilck() {
    this.setState({
      visible: true,
    });
  },

  actionHandleVisible() {
    this.setState({
      visible: false,
    });
  },

  actionHandleVisibleShow() {
    this.setState({
      visible: true,
    });
  },

  render() {
    return (<div className="tagmanage-site">
			<Row>
				<Col>
					<div style={{ float: 'right', marginTop: '0px', paddingRight: '20px' }}>
						<Button type="primary" onClick={this.buttonCilck}>新建配置策略</Button>
					</div>
				</Col>
			</Row>
			<Row>
				<Col><TableList actionHandleVisibleShow={this.actionHandleVisibleShow} /></Col>
			</Row>
			<Row>
				<Col><FormAction visible={this.state.visible} actionHandleVisible={this.actionHandleVisible} /></Col>
			</Row>
		</div>);
  },
});
export default createRootContainer({
  tableList: [],
  tableSelsct: [],
  paramsList: 'paramsList',
  addData: {},
  configStrategyId: 'configStrategyId',
  configStrategyData: 'configStrategyData',
  strategyTemplateId: '',
  editorData: {},
  editorSate: false,
  accessDeny: false,
  selectedRowKeys: [],
  allOperatorInfo: {},
  allMetainfo: [],
  strategyList: [],
  strategyTemplate: [],
  channelConfig: [],
})(App);
