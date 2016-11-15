import { createContainer } from 'Roof';
import { Table, Form, Input, Row, Col, Button, Select, Modal, Checkbox } from 'antd';
import fetchData from './fetchData.js';
import React from 'react';
import Utils from '../../../utils/index';

const FormItem = Form.Item;
const CheckboxGroup = Checkbox.Group;
const ajax = Utils.ajax,
  commonUtils = Utils.common;

const ChangeInfo = React.createClass({
  mixins: [fetchData],
  getInitialState() {
    return {
      visibleState: false,
      configStrategyData: [],
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

  _handleTextValue(key, event) {
    const text = event.target.value;
    const temp = {};

    if (text == '') {
      this.openNotificationWithIcon('failure', '失败', '请填写变更详情!')();
      return false;
    }
    const items = this.props.getStoreState().configStrategyData;
    temp.comment = text;
    items[0] = Object.assign({}, items[0], temp);
    this.setState({
      visibleState: false,
      configStrategyData: items,
    });
    this.props.setStoreState({
      configStrategyData: items,
    });
  },

  _defaultTyoe() {
    return 'ADD';
  },
  render() {
    const chrildHtml = [];
    const changeData = this.props.getStoreState().configStrategyData;

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
  label="站点名称:"
  labelCol={{ span: 4 }}
  wrapperCol={{ span: 14 }}
									>
										<Input value={item.siteName} name="siteName" disabled />
									</FormItem>
									<FormItem
  label="开始时间:"
  labelCol={{ span: 4 }}
  wrapperCol={{ span: 14 }}
									>
										<Input type="input" value={item.newStartTime} name="newEndTime"
  disabled
          />
									</FormItem>
									<FormItem
  label="结束时间:"
  labelCol={{ span: 4 }}
  wrapperCol={{ span: 14 }}
									>
										<Input type="input" value={item.newEndTime} name="newEndTime" disabled />
									</FormItem>

									<FormItem
  label="策略表达式:"
  labelCol={{ span: 4 }}
  wrapperCol={{ span: 14 }}
									>
										<Input type="input" value={item.newStrategyExpression}
  name="newStrategyExpression" disabled
          />
									</FormItem>
									<FormItem
  label="每天推送最大量:"
  labelCol={{ span: 4 }}
  wrapperCol={{ span: 14 }}
									>
										<Input type="input" value={item.newSyncMaxAmount} name="newSyncMaxAmount"
  disabled
          />
									</FormItem>
									<FormItem
  label="推送占比:"
  labelCol={{ span: 4 }}
  wrapperCol={{ span: 14 }}
									>
										<Input type="input" value={item.newSyncPercentage} name="newSyncPercentage"
  disabled
          />
									</FormItem>
									<FormItem
  label="变更描述:"
  labelCol={{ span: 4 }}
  wrapperCol={{ span: 14 }}
									>
										<Input type="input" value={item.comment || ''} name="comment"
  onChange={this._handleTextValue.bind(this, 'comment')}
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
  label="站点名称:"
  labelCol={{ span: 4 }}
  wrapperCol={{ span: 14 }}
									>
										<Input value={item.siteName} name="siteName" disabled />
									</FormItem>
									<Row>
										<Col>
											<FormItem
  label="新的开始时间:"
  labelCol={{ span: 4 }}
  wrapperCol={{ span: 14 }}
											>
												<Input type="input" value={item.newStartTime} name="newEndTime"
  disabled
            />
											</FormItem>
										</Col>
										<Col>
											<FormItem
  label="老的开始时间:"
  labelCol={{ span: 4 }}
  wrapperCol={{ span: 14 }}
											>
												<Input type="input" value={item.oldStartTime} name="newEndTime"
  disabled
            />
											</FormItem>
										</Col>
									</Row>
									<Row>
										<Col>
											<FormItem
  label="新的策略表达式:"
  labelCol={{ span: 4 }}
  wrapperCol={{ span: 14 }}
											>
												<Input type="input" value={item.newStrategyExpression}
  name="newStrategyExpression" disabled
            />
											</FormItem>
										</Col>
										<Col>
											<FormItem
  label="老的策略表达式:"
  labelCol={{ span: 4 }}
  wrapperCol={{ span: 14 }}
											>
												<Input type="input" value={item.oldStrategyExpression}
  name="oldStrategyExpression" disabled
            />
											</FormItem>
										</Col>
									</Row>
									<Row>
										<Col>
											<FormItem
  label="新的每天推送最大量:"
  labelCol={{ span: 4 }}
  wrapperCol={{ span: 14 }}
											>
												<Input type="input" value={item.newSyncMaxAmount}
  name="oldSyncMaxAmount" disabled
            />
											</FormItem>
										</Col>
										<Col>
											<FormItem
  label="老的每天推送最大量:"
  labelCol={{ span: 4 }}
  wrapperCol={{ span: 14 }}
											>
												<Input type="input" value={item.oldSyncMaxAmount}
  name="oldSyncMaxAmount" disabled
            />
											</FormItem>
										</Col>
									</Row>
									<Row>
										<Col>
											<FormItem
  label="新的推送占比:"
  labelCol={{ span: 4 }}
  wrapperCol={{ span: 14 }}
											>
												<Input type="input" value={item.newSyncPercentage}
  name="oldSyncPercentage" disabled
            />
											</FormItem>
										</Col>
										<Col>
											<FormItem
  label="老的推送占比:"
  labelCol={{ span: 4 }}
  wrapperCol={{ span: 14 }}
											>
												<Input type="input" value={item.oldSyncPercentage}
  name="oldSyncPercentage" disabled
            />
											</FormItem>
										</Col>
									</Row>
									<FormItem
  label="变更描述:"
  labelCol={{ span: 4 }}
  wrapperCol={{ span: 14 }}
									>
										<Input type="input" value={item.comment || ''} name="comment"
  onChange={this._handleTextValue.bind(this, 'comment')}
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
  label="站点名称:"
  labelCol={{ span: 4 }}
  wrapperCol={{ span: 14 }}
									>
										<Input value={item.siteName} name="siteName" disabled />
									</FormItem>
									<FormItem
  label="开始时间:"
  labelCol={{ span: 4 }}
  wrapperCol={{ span: 14 }}
									>
										<Input type="input" value={item.oldEndTime} name="oldEndTime" disabled />
									</FormItem>
									<FormItem
  label="结束时间:"
  labelCol={{ span: 4 }}
  wrapperCol={{ span: 14 }}
									>
										<Input type="input" value={item.oldStartTime} name="oldStartTime"
  disabled
          />
									</FormItem>


									<FormItem
  label="策略表达式:"
  labelCol={{ span: 4 }}
  wrapperCol={{ span: 14 }}
									>
										<Input type="input" value={item.oldEndTime} name="oldEndTime" disabled />
									</FormItem>
									<FormItem
  label="每天推送最大量:"
  labelCol={{ span: 4 }}
  wrapperCol={{ span: 14 }}
									>
										<Input type="input" value={item.oldSyncMaxAmount} name="oldSyncMaxAmount"
  disabled
          />
									</FormItem>
									<FormItem
  label="推送占比:"
  labelCol={{ span: 4 }}
  wrapperCol={{ span: 14 }}
									>
										<Input type="input" value={item.oldSyncPercentage} name="oldSyncPercentage"
  disabled
          />
									</FormItem>
									<FormItem
  label="变更描述:"
  labelCol={{ span: 4 }}
  wrapperCol={{ span: 14 }}
									>
										<Input type="input" value={item.comment || ''} name="comment"
  onChange={this._handleTextValue.bind(this, 'comment')}
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
  label="站点名称:"
  labelCol={{ span: 4 }}
  wrapperCol={{ span: 14 }}
									>
										<Input value={item.siteName} name="siteName" disabled />
									</FormItem>
									<FormItem
  label="开始时间:"
  labelCol={{ span: 4 }}
  wrapperCol={{ span: 14 }}
									>
										<Input type="input" value={item.newStartTime} name="newEndTime"
  disabled
          />
									</FormItem>
									<FormItem
  label="结束时间:"
  labelCol={{ span: 4 }}
  wrapperCol={{ span: 14 }}
									>
										<Input type="input" value={item.newEndTime} name="newEndTime" disabled />
									</FormItem>

									<FormItem
  label="变更内容:"
  labelCol={{ span: 4 }}
  wrapperCol={{ span: 14 }}
									>
										<Input type="input" value={item.newStrategyExpression}
  name="newStrategyExpression" disabled
          />
									</FormItem>
									<FormItem
  label="新的每天推送最大量:"
  labelCol={{ span: 4 }}
  wrapperCol={{ span: 14 }}
									>
										<Input type="input" value={item.newSyncMaxAmount} name="newSyncMaxAmount"
  disabled
          />
									</FormItem>
									<FormItem
  label="新的推送占比:"
  labelCol={{ span: 4 }}
  wrapperCol={{ span: 14 }}
									>
										<Input type="input" value={item.newSyncPercentage} name="newSyncPercentage"
  disabled
          />
									</FormItem>
									<FormItem
  label="变更描述:"
  labelCol={{ span: 4 }}
  wrapperCol={{ span: 14 }}
									>
										<Input type="input" value={item.comment || ''} name="comment"
  onChange={this._handleTextValue.bind(this, 'comment')}
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
			<Modal width="80%" title="变更详情" visible={this.props.visibleState}
  onOk={this._handleOk} onCancel={this._handleCancel}
			>
				{chrildHtml}
			</Modal>
		);
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
})(ChangeInfo);
