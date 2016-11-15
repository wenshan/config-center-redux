import { createContainer } from 'Roof';
import { Table, Form, Input, Row, Col, Button, Select, Modal, Checkbox } from 'antd';
import fetchData from './fetchData.js';
import React from 'react';
import Utils from '../../../utils/index';
import Permission from '../../../components/permission/index';


const FormItem = Form.Item;
const CheckboxGroup = Checkbox.Group;
const ajax = Utils.ajax,
  commonUtils = Utils.common;

const ChangeInfo = React.createClass({
  mixins: [fetchData],
  getInitialState() {
    return {
      visibleState: false,
      changeConfigData: [],
    };
  },

  _handleOk() {
    this.setState({
      visibleState: false,
    });
    this.props.handleVisibleState();
    this.publishChangeData();
  },
  _handleCancel(e) {
    this.setState({
      visibleState: false,
    });
    this.props.handleVisibleState();
  },

  _handleTextValue(idx, event) {
    const text = event.target.value;
    const temp = {};

    if (text == '') {
      this.openNotificationWithIcon('failure', '失败', '请填写变更详情!')();
      return false;
    }

    const items = this.props.getStoreState().changeConfigData;
    temp.comment = text;
    items[idx] = Object.assign(items[idx], temp);
    this.setState({
      visibleState: false,
      changeConfigData: items,
    });
  },

  render() {
    const chrildHtml = [];
    const changeData = this.props.getStoreState().changeConfigData;
    changeData.map((item, idx) => {
      chrildHtml.push(<Form horizontal>
				<Row>
					<Col>
						<Switch var={item.changeType}>
							<Case value={'ADD'}>
								<div>
									<FormItem
  label="变更类型:"
  labelCol={{ span: 4 }}
  wrapperCol={{ span: 14 }}
									>
										<Input value={item.changeType} name="changeType" disabled />
									</FormItem>
									<FormItem
  label="渠道名称:"
  labelCol={{ span: 4 }}
  wrapperCol={{ span: 14 }}
									>
										<Input value={item.channelName} name="channelName" disabled />
									</FormItem>
									<FormItem
  label="新的配置:"
  labelCol={{ span: 4 }}
  wrapperCol={{ span: 14 }}
									>
										<Input type="textarea" value={item.newConfig} name="newConfig" disabled />
									</FormItem>
									<FormItem
  label="变更描述:"
  labelCol={{ span: 4 }}
  wrapperCol={{ span: 14 }}
									>
										<Input type="textarea" value={item.comment || ''} name="comment"
  onChange={this._handleTextValue.bind(this, idx)}
          />
									</FormItem>
								</div>
							</Case>
							<Case value={'UPDATE'}>
								<div>
									<FormItem
  label="变更类型:"
  labelCol={{ span: 4 }}
  wrapperCol={{ span: 14 }}
									>
										<Input value={item.changeType} name="changeType" disabled />
									</FormItem>
									<FormItem
  label="渠道名称:"
  labelCol={{ span: 4 }}
  wrapperCol={{ span: 14 }}
									>
										<Input value={item.channelName} name="channelName" disabled />
									</FormItem>
									<FormItem
  label="新的配置:"
  labelCol={{ span: 4 }}
  wrapperCol={{ span: 14 }}
									>
										<Input type="textarea" value={item.newConfig} name="newConfig" disabled />
									</FormItem>
									<FormItem
  label="老的配置:"
  labelCol={{ span: 4 }}
  wrapperCol={{ span: 14 }}
									>
										<Input type="textarea" value={item.oldConfig} name="oldConfig" disabled />
									</FormItem>
									<FormItem
  label="变更描述:"
  labelCol={{ span: 4 }}
  wrapperCol={{ span: 14 }}
									>
										<Input type="textarea" value={item.comment || ''} name="comment"
  onChange={this._handleTextValue.bind(this, idx)}
          />
									</FormItem>
								</div>
							</Case>
							<Case value={'DELETE'}>
								<div>
									<FormItem
  label="变更类型:"
  labelCol={{ span: 4 }}
  wrapperCol={{ span: 14 }}
									>
										<Input value={item.changeType} name="changeType" disabled />
									</FormItem>
									<FormItem
  label="渠道名称:"
  labelCol={{ span: 4 }}
  wrapperCol={{ span: 14 }}
									>
										<Input value={item.channelName} name="channelName" disabled />
									</FormItem>
									<FormItem
  label="老的:"
  labelCol={{ span: 4 }}
  wrapperCol={{ span: 14 }}
									>
										<Input type="textarea" value={item.oldConfig} name="oldConfig" disabled />
									</FormItem>
									<FormItem
  label="变更描述:"
  labelCol={{ span: 4 }}
  wrapperCol={{ span: 14 }}
									>
										<Input type="textarea" value={item.comment || ''} name="comment"
  onChange={this._handleTextValue.bind(this, idx)}
          />
									</FormItem>
								</div>
							</Case>
							<Default>
								<div>
									<FormItem
  label="变更类型:"
  labelCol={{ span: 4 }}
  wrapperCol={{ span: 14 }}
									>
										<Input value={item.changeType} name="changeType" disabled />
									</FormItem>
									<FormItem
  label="渠道名称:"
  labelCol={{ span: 4 }}
  wrapperCol={{ span: 14 }}
									>
										<Input value={item.channelName} name="channelName" disabled />
									</FormItem>
									<FormItem
  label="新的配置:"
  labelCol={{ span: 4 }}
  wrapperCol={{ span: 14 }}
									>
										<Input type="textarea" value={item.newConfig} name="newConfig" disabled />
									</FormItem>
									<FormItem
  label="变更描述:"
  labelCol={{ span: 4 }}
  wrapperCol={{ span: 14 }}
									>
										<Input type="textarea" value={item.comment || ''} name="comment"
  onChange={this._handleTextValue.bind(this, idx)}
          />
									</FormItem>
								</div>
							</Default>
						</Switch>
					</Col>
				</Row>
			</Form>);
    });

    return (
			<Modal width="50%" title="变更详情" okText="确认发布" visible={this.props.visibleState}
  onOk={this._handleOk} onCancel={this._handleCancel}
			>
				{chrildHtml}
			</Modal>
		);
  },
});
export default createContainer({
  tableList: 'tableList',
  siteId: 'siteId',
  paramsList: 'paramsList',
  abtestParamIdList: 'abtestParamIdList',
  addData: 'addData',
  channeConfigId: 'changeConfigId',
  changeConfigData: 'changeConfigData',
  editorData: 'editorData',
  editorSate: 'editorSate',
  accessDeny: 'accessDeny',
  channelData: 'channelData',
  siteData: 'siteData',
  createType: 'createType',
})(ChangeInfo);
