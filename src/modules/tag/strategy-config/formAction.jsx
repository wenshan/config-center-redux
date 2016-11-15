import { createContainer, createRootContainer } from 'Roof';
import { Form, Input, Row, Col, Button, Select, Modal, DatePicker, notification, InputNumber, Tabs } from 'antd';

import React from 'react';
import fetchData from './fetchData.js';
import Utils from '../../../utils/index';
import SelectAction from '../util/selectActionData';
import ChannelConfig from './channelConfig';
import StrategyTemplate from './strategyTemplate';
import Moment from 'moment';
import CreateStrategy from './createStrategy';
const formatter = 'YYYY-MM-DD hh:mm:ss';
const RangePicker = DatePicker.RangePicker;
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;

const defaultData = {
  configStrategyName: '',
  siteId: '',
  siteName: '',
  channelName: '',
  channelId: '',
  configId: '',
  description: '',
  endTime: '',
  startTime: '',
  strategyType: 'and',
  syncMaxAmount: '',
  syncPercentage: '',
  strategyList: [],
};

let EditorSate = false;

const FormAction = React.createClass({
  mixins: [fetchData],
  getInitialState() {
    return {
      loading: false,
      visible: false,
      addData: defaultData,
      editorData: defaultData,
    };
  },

  onChange(key, event) {
    let item;
    if (this.props.getStoreState().editorSate) {
      item = this.props.getStoreState().editorData;
    } else {
      item = this.state.addData;
    }
    const temp = {};
    temp[key] = event.target.value;

    item = Object.assign(item, temp);

    this.setState({
      addData: item,
    });
    this.props.setStoreState({
      addData: item,
      editorData: item,
    });
  },

  onChangeInputNumber(key, value) {
    let item;
    if (this.props.getStoreState().editorSate) {
      item = this.props.getStoreState().editorData;
    } else {
      item = this.state.addData;
    }
    const temp = {};
    temp[key] = value;

    item = Object.assign(item, temp);

    this.setState({
      addData: item,
    });
    this.props.setStoreState({
      addData: item,
      editorData: item,
    });
  },

  _handleSelectType(key, value) {
    const temp = {};
    const item = this.state.addData;
    temp[key] = value;
    this.setState({
      addData: Object.assign(item, temp),
    });
  },


  _timeStringSub(str) {
    const temp = str.replace('T', ' ');
    return temp.substring(0, temp.indexOf('.'));
  },

  _handleOk() {
    let tempAddData = {};
    if (this.props.getStoreState().editorSate) {
      tempAddData = this.props.getStoreState().editorData;
    } else {
      tempAddData = this.state.addData;
    }

    const strategyList = this.props.getStoreState().strategyList;

    const temp = {};
    temp.strategyList = strategyList;

    tempAddData = Object.assign(tempAddData, temp);

    this.setState({
      addData: tempAddData,
      visible: false,
    });

    for (const key in tempAddData) {
      if (tempAddData[key] === '' || !Object.prototype.toString.call(tempAddData[key]) === '[object Array]') {
        this.openNotificationWithIcon('error', '错误', `${key}字段不能为空!`)();
        return false;
      }
    }

    this.props.setStoreState({
      visible: false,
      addData: tempAddData,
      editorData: tempAddData,
    });

    if (this.props.getStoreState().editorSate) {
      this.fetchEditorData();
    } else {
      this.fetchAddData();
    }

    this.props.actionHandleVisible();
  },

  _handleCancel() {
    this.setState({
      visible: false,
      editorSate: false,
    });
    this.props.setStoreState({
      visible: false,
      editorSate: false,
    });
    this.props.actionHandleVisible();
  },

  _getRadioConfigValue(value) {
    const temp = {};
    const channelConfig = this.props.getStoreState().channelConfig;
    let items = this.state.addData;

    temp.configId = channelConfig[value].key;

    items = Object.assign(items, temp);

    this.setState({
      addData: items,
    });

    this.props.setStoreState({
      addData: items,
      editorData: items,
    });
  },

  _getRadioTemplateValue(value) {
    const temp = {};
    const strategyLists = this.props.getStoreState().strategyTemplate;
    const item = this.props.getStoreState().editorData;

    this.setState({
      addData: Object.assign(item, temp),
    });

    this.props.setStoreState({
      addData: Object.assign(item, temp),
      editorData: Object.assign(item, temp),
      strategyList: strategyLists[value].strategyList,
    });
  },

  _onchangeSiteId(param) {
    const temp = {};
    let item = this.state.addData;

    temp.siteId = param.key;
    temp.siteName = param.name;

    item = Object.assign(item, temp);

    this.setState({
      addData: item,
    });

    this.props.setStoreState({
      addData: item,
      editorData: item,
    });

    if (item.channelId != '') {
      this.getChannelConfig();
    }
  },


  _onchangeChannelName(param) {
    const temp = {};
    let item = this.state.addData;

    temp.channelId = param.key;
    temp.channelName = param.name;

    item = Object.assign(item, temp);

    this.setState({
      addData: item,
    });
    this.props.setStoreState({
      addData: item,
      editorData: item,
    });
    if (item.siteId != '') {
      this.getChannelConfig();
    } else {
      this.openNotificationWithIcon('error', '错误', 'siteId字段不能为空!')();
      return false;
    }
  },


  _handelaRangePickerStart(value) {
    const temp = {};
    let item = this.state.addData;

    temp.startTime = Moment(value).format(formatter);

    item = Object.assign(item, temp);

    this.setState({
      addData: item,
    });

		/*		this.props.setStoreState({
		 addData: item,
		 editorData: item
		 });*/
  },

  _handelaRangePickerEnd(value) {
    const temp = {};
    let item = this.state.addData;

    temp.endTime = Moment(value).format(formatter);

    item = Object.assign(item, temp);

    this.setState({
      addData: item,
    });
		/*		this.props.setStoreState({
		 addData: item,
		 editorData: item
		 });*/
  },

  componentWillReceiveProps(nextProps) {
    if (nextProps.editorSate) {
      this.setState({
        addData: nextProps.addData,
        editorData: nextProps.editorData,
      });
      this.props.setStoreState({
        addData: nextProps.addData,
        editorData: nextProps.editorData,
      });
    } else {
      this.setState({
        addData: defaultData,
        editorData: defaultData,
      });
      this.props.setStoreState({
        addData: defaultData,
        editorData: defaultData,
      });
    }
  },

  render() {
    let addData = {};
    let title = '新建策略配置';
    EditorSate = this.props.getStoreState().editorSate;
    const siteData = this.props.getStoreState().siteData;
    const channelData = this.props.getStoreState().channelData;
    const strategyTemplate = this.props.getStoreState().strategyTemplate;

    let channelConfig = this.props.getStoreState().channelConfig || [];
    const defaultValueChannelConfig = '';

    const temp = [];

    if (EditorSate) {
      title = '编辑策略配置';
      channelConfig = [];
      addData = this.props.getStoreState().editorData;
      temp.key = addData.configDTO.id;
      temp.name = addData.configDTO.configName;
      channelConfig.push(temp);
    } else {
      addData = this.state.addData;
    }

    return (<div>
			<Modal width="80%" title={title} visible={this.props.visible} onOk={this._handleOk}
  onCancel={this._handleCancel}
   >

				<Form horizontal>
					<Row>
						<Col>
							<FormItem
  label="策略配置名称:"
  labelCol={{ span: 4 }}
  wrapperCol={{ span: 14 }}
							>
								<Input placeholder={addData.configStrategyName} value={addData.configStrategyName}
  name="configStrategyName"
  onChange={this.onChange.bind(this, 'configStrategyName')} disabled={EditorSate}
        />
							</FormItem>

							<FormItem
  label="站点:"
  labelCol={{ span: 4 }}
  wrapperCol={{ span: 14 }}
							>
								<SelectAction name="siteName" keys="id" type="site" data={siteData}
  onChange={this._onchangeSiteId} disabled={EditorSate}
  defaultValue={addData.siteName}
        />

							</FormItem>


							<FormItem
  label="渠道:"
  labelCol={{ span: 4 }}
  wrapperCol={{ span: 14 }}
							>
								<SelectAction name="channelName" keys="id" type="channel"
  data={channelData}
  onChange={this._onchangeChannelName}
  defaultValue={addData.channelName} disabled={EditorSate}
        />

							</FormItem>
							<FormItem
  label="选择TAG:"
  labelCol={{ span: 4 }}
  wrapperCol={{ span: 14 }}
							>
								<ChannelConfig getRadioConfigValue={this._getRadioConfigValue.bind(this)}
  defaultValue={defaultValueChannelConfig} data={channelConfig}
  visible={this.state.visible}
        />
							</FormItem>
							<FormItem
  label="设定开始时间:"
  labelCol={{ span: 4 }}
  wrapperCol={{ span: 14 }}
							>
								<div>
									<DatePicker showTime value={addData.startTime} format="yyyy-MM-dd HH:mm"
  placeholder="请选择开始时间" onChange={this._handelaRangePickerStart}
         />
									<DatePicker showTime value={addData.endTime} format="yyyy-MM-dd HH:mm"
  placeholder="请选择结束时间" onChange={this._handelaRangePickerEnd}
         />
								</div>

							</FormItem>

							<FormItem
  label="每天推送最大量:"
  labelCol={{ span: 4 }}
  wrapperCol={{ span: 14 }}
							>
								<InputNumber type="input" rows="2" placeholder={addData.syncMaxAmount}
  value={addData.syncMaxAmount} name="syncMaxAmount"
  onChange={this.onChangeInputNumber.bind(this, 'syncMaxAmount')}
        />
							</FormItem>
							<FormItem
  label="推送占比:"
  labelCol={{ span: 4 }}
  wrapperCol={{ span: 14 }}
							>
								<InputNumber type="input" rows="2" min={0} max={1} step={0.01}
  placeholder={addData.syncPercentage}
  value={addData.syncPercentage} name="syncPercentage"
  onChange={this.onChangeInputNumber.bind(this, 'syncPercentage')}
        />
							</FormItem>
							<FormItem
  label="描述:"
  labelCol={{ span: 4 }}
  wrapperCol={{ span: 14 }}
							>
								<Input type="input" rows="2" placeholder={addData.description}
  value={addData.description} name="description"
  onChange={this.onChange.bind(this, 'description')}
        />
							</FormItem>

						</Col>
					</Row>
					<Row>
						<Col>
							<Tabs onChange={this._handleTabs} type="card">
								<TabPane tab="自定义" key="1">
									<div>
										<FormItem
  label="策略配置类型:"
  labelCol={{ span: 4 }}
  wrapperCol={{ span: 14 }}
										>
											<Select id="select-tag-type" size="large"
  defaultValue={addData.strategyType}
  value={addData.strategyType} name="strategyType"
  style={{ width: 200 }}
  onChange={this._handleSelectType.bind(this, 'strategyType')}
           >
												<Option value="and">and</Option>
												<Option value="or">or</Option>
											</Select>
										</FormItem>
										<CreateStrategy index={this.state.index} data={addData.strategyList} />
									</div>
								</TabPane>
								<TabPane tab="选择模板" key="2">
									<div>
										<StrategyTemplate getRadioTemplateValue={this._getRadioTemplateValue.bind(this)}
  data={strategyTemplate} visible={this.state.visible}
          />
									</div>
								</TabPane>
							</Tabs>
						</Col>
					</Row>
				</Form>
			</Modal>
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
})(FormAction);
