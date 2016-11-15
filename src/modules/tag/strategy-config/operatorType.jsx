import { createContainer, createRootContainer } from 'Roof';
import { Form, Input, Row, Col, Button, Select, Modal, Checkbox, message, notification } from 'antd';
import React from 'react';
import Utils from '../../../utils/index';
import fetchData from './fetchData.js';

const CheckboxGroup = Checkbox.Group;
const ButtonGroup = Button.Group;
const FormItem = Form.Item;
const ajax = Utils.ajax,
  commonUtils = Utils.common;
const API = {
  OPERATINPLAN: '/tag/strategy/GetAllStrategyOperator.do',
};

const OperatorType = React.createClass({
  mixins: [fetchData],
  getInitialState() {
    return {
      index: 0,
      defaultValue: 'GreaterThanOperator',
      operatorData: {
        EqualToOperator: {
          description: '等于',
          operatorSymbol: '=',
        },
        GreaterOrEqualToOperator: {
          description: '大于等于',
          operatorSymbol: '>=',
        },
        GreaterThanOperator: {
          description: '大于',
          operatorSymbol: '>',
        },
        InOperator: {
          description: '在列表内',
          operatorSymbol: 'in',
        },
        LessOrEqualToOperator: {
          description: '小于等于',
          operatorSymbol: '<=',
        },
        LessThanOperator: {
          description: '小于',
          operatorSymbol: '<',
        },

      },
    };
  },

  _handleOperatorType(key, idx, value) {
    this.props.handleStrategyType(key, idx, value);
  },

	// 初始化meta
  _getAllStrategyOperator() {
    const item = this.state.operatorData;
    ajax({
      url: API.OPERATINPLAN,
      data: {},
      method: 'get',
    }).then(resp => {
      if (resp.success) {
        this.setState({
          operatorData: Object.assign(item, resp.data),
          index: this.props.index,
        });
      } else {
        this.openNotificationWithIcon('error', '错误', resp.errorMsg)();
      }
    });
  },

  render() {
    const operatorData = this.props.getStoreState().allOperatorInfo;
    const childrensItems = [];

    for (const key in operatorData) {
      childrensItems.push(<Option value={key}>{operatorData[key].description}</Option>);
    }

    return (<Select value={this.props.defaultValue}
      onChange={this._handleOperatorType.bind(this, 'operatorType', this.props.index)}
      index={this.props.index}
    >
			{childrensItems}
		</Select>);
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
})(OperatorType);
