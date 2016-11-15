/**
 * ant 1.5.0 以后版本支持 labelInValue
 */

import { createContainer } from 'Roof';
import { Tabs, Table, Form, Input, Row, Col, Button, Select, Icon } from 'antd';
import React from 'react';
const FormItem = Form.Item;
const Option = Select.Option;

import Utils from '../../../utils/index';
const ajax = Utils.ajax,
  commonUtils = Utils.common;

const API = {
  BUC: '/tag/user/SearchEmployeeInfo.do',
};

const personData = [];
const User = React.createClass({
  getInitialState() {
    const editorSate = this.props.getStoreState().editorSate;
    const defaultValue = [];
    const newItemOption = [];
    let interfacePersonList = [];

    if (editorSate) {
      interfacePersonList = this.props.getStoreState().editorData.interfacePersonList;
      interfacePersonList.map(item => {
        const temp = {};
        temp.key = item.empId;
        temp.label = item.lastName;
        newItemOption.push(temp);
        defaultValue.push(item.empId);
      });
    }

    return {
      interfacePersonList: newItemOption,
      defaultValue,
    };
  },

  _onChange(value, label) {
    const interfacePersonList = [];

    if (value.length == 0) {
      return false;
    }

    value.map((item, idx) => {
      const temp = {};
      temp.empId = item;
      temp.lastName = label[idx];
      interfacePersonList.push(temp);
    });

    this.setState({
      interfacePersonList,
    });

    this.props.onChange(interfacePersonList);
  },

  _onSearch(value) {
    const defaultValue = [];
    const temp = {};
    const _self = this;
    let currentStream;

    if (!value) {
      return false;
    }

    if (currentStream) {
      clearTimeout(currentStream);
    }

    if (!currentStream) {
      currentStream = setTimeout(() => {
        ajax({
          url: API.BUC,
          data: { query: value },
          method: 'get',
        }).then(resp => {
          if (resp.success && resp.data.items.length > 0) {
            const items = [];
            resp.data.items.map(item => {
              const temp = {};
              temp.key = item.empId;
              temp.label = item.lastName;
              items.push(temp);
            });
            _self.setState({
              interfacePersonList: items,
              defaultValue: [],
            });
          }
        });
      }, 200);
    }
  },

  componentWillReceiveProps(nextProps) {
    const defaultValue = [];
    const newItemOption = [];

    if (nextProps.editorSate) {
      nextProps.editorData.interfacePersonList.map((item, idx) => {
        const temp = {};
        temp.key = item.empId;
        temp.label = item.lastName;
        newItemOption.push(temp);
        defaultValue.push(item.empId);
      });
      this.setState({
        interfacePersonList: newItemOption,
        defaultValue,
      });
    } else {
      this.setState({
        interfacePersonList: [],
        defaultValue: [],
      });
    }
  },

  render() {
    const editorSate = this.props.getStoreState().editorSate;
    const children = [];

    this.state.interfacePersonList.map(item => {
      children.push(<Option key={item.key}>{item.label}</Option>);
    });

    return (<Select
      multiple
			// labelInValue
			// tags
      placeholder="Please select"
      style={{ width: '100%' }}
      onChange={this._onChange}
      onSearch={this._onSearch}
      disabled={this.props.disabled}
      value={this.state.defaultValue}
    >
			{children}
		</Select>);
  },
});

export default createContainer({
  tableList: 'tableList',
  siteId: 'siteId',
  editorData: 'editorData',
  editorSate: 'editorSate',
  accessDeny: 'accessDeny',
  addData: 'addData',
  interfacePersonList: 'interfacePersonList',
})(User);
