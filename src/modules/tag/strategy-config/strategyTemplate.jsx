import { createContainer } from 'Roof';
import { Table, Form, Input, Row, Col, Button, Select, InputNumber, Radio } from 'antd';
import fetchData from './fetchData.js';
import Utils from '../../../utils/index';
import React from 'react';
const RadioGroup = Radio.Group;
const ajax = Utils.ajax,
  commonUtils = Utils.common;

const StrategyTemplate = React.createClass({
  mixins: [fetchData],
  getInitialState() {
    return {
      value: '',
    };
  },
  _headleSelect(event) {
    const value = event.target.value;
    this.setState({
      value,
    });

    this.props.getRadioTemplateValue(value);
  },

  render() {
    const radioArr = [];
    const paramsList = this.props.data;
    paramsList.map((item, idx) => {
      radioArr.push(<Radio key={item.name} value={idx}>{item.name}</Radio>);
    });
    return (<div className="params-list-box">
			<RadioGroup onChange={this._headleSelect} value={this.state.value}>
				{radioArr}
			</RadioGroup>
		</div>);
  },
});
export default createContainer({
  tableList: 'tableList',
  paramsList: 'paramsList',
  addData: 'addData',
  configStrategyId: 'configStrategyId',
  configStrategyData: 'configStrategyData',
  editorData: 'editorData',
  editorSate: 'editorSate',
  accessDeny: 'accessDeny',
  channelData: 'channelData',
  siteData: 'siteData',
  allOperatorInfo: 'allOperatorInfo',
  allMetainfo: 'allMetainfo',
  strategyList: 'strategyList',
  strategyTemplate: 'strategyTemplate',
  channelConfig: 'channelConfig',
})(StrategyTemplate);
