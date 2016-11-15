import { createContainer, createRootContainer } from 'Roof';
import { Form, Input, Row, Col, Button, Select, InputNumber } from 'antd';
import React from 'react';
import TableList from './tableList';
import FormAction from './formAction';

const App = React.createClass({
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
  componentDidMount() {
		// console.log($("body"));
  },
  render() {
    return (<div className="tagmanage-site">
			<Row>
				<Col>
					<div style={{ float: 'right', marginTop: '0px', paddingRight: '20px' }}>
						<Button type="primary" onClick={this.buttonCilck}>新建策略配置</Button>
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
  paramsList: [],
  addData: {},
  configStrategyId: '',
  configStrategyData: [],
  editorData: {},
  editorSate: false,
  accessDeny: false,
  channelData: [],
  siteData: [],
  allOperatorInfo: {},
  allMetainfo: [],
  strategyList: [],
  strategyTemplate: [],
  channelConfig: [],
})(App);
