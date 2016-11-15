import { createContainer, createRootContainer } from 'Roof';
import { Form, Input, Row, Col, Button, Select, Modal, Checkbox } from 'antd';
const CheckboxGroup = Checkbox.Group;
const ButtonGroup = Button.Group;
const FormItem = Form.Item;
import React from 'react';
import Utils from '../../../utils/index';
import { If, Then, Else } from 'react-if';
import TagInfo from './taginfo';
import User from '../util/user';
import fetchData from './fetchData.js';
import CreateStrategy from './createStrategy';

const ajax = Utils.ajax,
  commonUtils = Utils.common;

const opeartHtml = '';
const DATACONVERSION = {};
const DATACONVERSIONARR = [];
const DATAMETA = [];
const DATAMETAARR = [];
const INDEX = 0;
const renderListMeta = '';
const ADDDATA = {};

const METALISTITEMS = '';
const STRATEGYLIST = [];
const METANAMELIST = [];


const arrMateListItems = [];
let editorSate = false;
const defaultData = {
  strategyName: '',
  description: '',
  strategyType: 'and',
  strategyList: [],
};
const FormAction = React.createClass({
  mixins: [fetchData],
  getInitialState() {
    return {
      loading: false,
      visible: false,
      addData: defaultData,
    };
  },

  onChange(key, event) {
    const temp = {};
    let item = this.state.addData;

    if (editorSate) {
      item = this.props.getStoreState().editorData;
    }

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

  _handleSelectType(key, value) {
    const temp = {};
    let item = this.state.addData;
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
    console.log('tempAddData', tempAddData);
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


  componentWillReceiveProps(nextProps) {
    if (nextProps.editorSate) {
      this.setState({
        addData: defaultData,
        editorData: nextProps.editorData,
      });
    }
  },

  render() {
    let title = '新建配置模板';
    let addData = this.state.addData;
    editorSate = this.props.getStoreState().editorSate;
    if (editorSate) {
      title = '修改配置模板';
      addData = this.props.getStoreState().editorData;
    } else {
      addData = this.state.addData;
    }

    return (<div>
			<Modal width="85%" title={title} visible={this.props.visible} onOk={this._handleOk}
  onCancel={this._handleCancel}
   >
				<Row gutter={24}>
					<Col span={24}>
						<Form>
							<FormItem
  label="策略名称:"
  labelCol={{ span: 4 }}
  wrapperCol={{ span: 14 }}
							>
								<Input placeholder={addData.strategyName}
  value={addData.strategyName}
  name="site_name" onChange={this.onChange.bind(this, 'strategyName')}
  disabled={editorSate}
        />
							</FormItem>
						</Form>
					</Col>
				</Row>
				<Row gutter={24}>
					<Col span={24}>
						<Form>
							<FormItem
  label="描述:"
  labelCol={{ span: 4 }}
  wrapperCol={{ span: 14 }}
							>
								<Input placeholder={addData.description}
  value={addData.description} name="description"
  onChange={this.onChange.bind(this, 'description')}
        />
							</FormItem>
						</Form>
					</Col>
				</Row>
				<Row gutter={24}>
					<Col span={24}>
						<Form>
							<FormItem
  label="策略关系:"
  labelCol={{ span: 4 }}
  wrapperCol={{ span: 14 }}
							>
								<Select defaultValue="and"
  onChange={this._handleSelectType.bind(this, 'strategyType')}
        >
									<Option value="and">AND</Option>
									<Option value="or">OR</Option>
								</Select>
							</FormItem>
						</Form>
					</Col>
				</Row>
				<CreateStrategy index={this.state.index} data={addData.strategyList} />
			</Modal>
		</div>);
  },
});

export default createContainer({
  tableList: 'tableList',
  tableSelsct: 'tableSelsct',
  paramsList: 'paramsList',
  addData: 'addData',
  configStrategyId: 'configStrategyId',
  configStrategyData: 'configStrategyData',
  strategyTemplateId: 'strategyTemplateId',
  editorData: 'editorData',
  editorSate: 'editorSate',
  accessDeny: 'accessDeny',
  channelData: 'channelData',
  siteData: 'siteData',
  selectedRowKeys: 'selectedRowKeys',
  allOperatorInfo: 'allOperatorInfo',
  allMetainfo: 'allMetainfo',
  strategyList: 'strategyList',
  strategyTemplate: 'strategyTemplate',
  channelConfig: 'channelConfig',
})(FormAction);
