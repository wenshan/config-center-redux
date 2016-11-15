import { createContainer, createRootContainer } from 'Roof';
import { Form, Input, Row, Col, Button, Select, InputNumber } from 'antd';
import React from 'react';
import TableList from './tableList';
import FormAction from './formAction';
const App = React.createClass({
  getInitialState() {
    return {
      visible: false,
      editorSate: false,
    };
  },

  buttonCilck() {
    this.setState({
      visible: true,
      editorSate: false,
    });
  },

  actionHandleVisible() {
    this.setState({
      visible: false,
      editorSate: false,
    });
  },

  actionHandleVisibleShow() {
    this.setState({
      visible: true,
      editorSate: true,
    });
  },

  render() {
    return (<div className="tagmanage-site">
			<Row>
				<Col>
					<div style={{ float: 'right', marginTop: '0px', paddingRight: '20px' }}>
						<Button type="primary" onClick={this.buttonCilck}>新建渠道配置</Button>
					</div>
				</Col>
			</Row>
			<Row>
				<Col><TableList actionHandleVisibleShow={this.actionHandleVisibleShow} /></Col>
			</Row>
			<Row>
				<Col><FormAction visible={this.state.visible} actionHandleVisible={this.actionHandleVisible}
  editorSate={this.state.editorSate}
    /></Col>
			</Row>
		</div>);
  },
});

export default createRootContainer({
  tableList: [],
  siteId: '',
  paramsList: [],
  abtestParamIdList: [],
  addData: {},
  changeConfigId: '',
  changeConfigData: [],
  editorData: {},
  editorSate: false,
  accessDeny: false,
  channelData: [],
  siteData: [],
  createType: '',
})(App);
