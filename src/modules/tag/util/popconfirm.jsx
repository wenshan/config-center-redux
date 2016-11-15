import { createContainer } from 'Roof';
import { Popconfirm, message } from 'antd';
import React from 'react';

const PopconfirmBox = React.createClass({
  getInitialState() {
    return {
      defaultValue: '',
    };
  },
  _confirm() {
    message.success('点击了确定');
  },

  _cancel() {
    message.error('点击了取消');
  },

  render() {
    return (<Popconfirm title="确定要删除这个任务吗？" onConfirm={this.props.onConfirm} onCancel={this.props.onCancel}>
			<a href="#">删除</a>
		</Popconfirm>);
  },
});

export default PopconfirmBox;
