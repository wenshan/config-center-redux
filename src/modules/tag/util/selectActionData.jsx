import { createContainer } from 'Roof';
import { Tabs, Table, Form, Input, Row, Col, Button, Select, Icon } from 'antd';
import React from 'react';
const FormItem = Form.Item;
const Option = Select.Option;

import Utils from '../../../utils/index';
const ajax = Utils.ajax,
  commonUtils = Utils.common;

const SelectAction = React.createClass({
  getInitialState() {
    return {
      defaultValue: '',
    };
  },
  _onChange(value, option) {
    const temp = {};
    temp.key = value;
    temp.name = option.props.children;
    this.props.onChange(temp);
  },

  componentWillReceiveProps(nextProps) {
    if (nextProps.defaultValue != this.props.defaultValue) {
      this.setState({
        defaultValue: this.props.defaultValue,
      });
    }
  },

  render() {
    const data = this.props.data;
    const children = [];
    data.map(item => {
      children.push(<Option key={item.key}>{item.name}</Option>);
    });

    return (<Select showSearch={false}
      style={{ width: '200px' }}
      placeholder="Please select"
      onSelect={this._onChange}
      optionFilterProp="children"
      notFoundContent="无法找到"
      disabled={this.props.disabled}
      value={this.props.defaultValue}
    >
			{children}
		</Select>);
  },
});

export default SelectAction;
