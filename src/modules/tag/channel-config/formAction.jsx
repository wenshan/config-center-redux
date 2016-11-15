import { createContainer, createRootContainer } from 'Roof';
import { Form, Input, Row, Col, Button, InputNumber, Select, Modal, Checkbox } from 'antd';

import React from 'react';
import fetchData from './fetchData.js';
import User from '../util/user';
import SelectAction from '../util/selectActionData';
import ParamInfo from './paramInfo';
import ParamInfoAbtest from './paramInfoAbtest';
const FormItem = Form.Item;
const CheckboxGroup = Checkbox.Group;

const defaultData = {
  configName: '',
  siteId: '',
  siteName: '',
  channelName: '',
  description: '',
  config: '',
  abtestConfig: '',
  type: 'PAGE',
  channelId: '',
  abtestPercentage: '',
  abtestParamIdList: '',
  paramIdList: '',
  paramsList: '',
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
    const item = this.state.addData;
    temp[key] = event.target.value;
    console.log(temp);
    this.setState({
      addData: Object.assign(item, temp),
      editorData: Object.assign(item, temp),
    });
  },

  _handleSelectType(key, value) {
    const temp = {};
    const item = this.state.addData;
    temp[key] = value;
    this.setState({
      addData: Object.assign(item, temp),
      editorData: Object.assign(item, temp),
    });
  },

  _handleOk() {
    let tempAddData = '';
    if (this.props.getStoreState().editorSate) {
      tempAddData = this.props.getStoreState().editorData;
    } else {
      tempAddData = defaultData;
    }

    for (const key in tempAddData) {
      if (!key == 'indexForSort') {
        if (tempAddData[key] == '') {
          this.openNotificationWithIcon('error', '错误', `${key}字段不能为空!`)();
          return false;
        }
      }
    }

    this.setState({
      loading: false,
      visible: false,
    });

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
    this.props.setStoreState({
      visible: false,
      editorSate: false,
    });
    this.props.actionHandleVisible();
  },

  _getCheckboxValue(checkeds) {
    console.log(checkeds);
    const temp = {};
    const item = this.state.addData;
    temp.paramIdList = checkeds;
    this.setState({
      addData: Object.assign(item, temp),
    });

    this.props.setStoreState({
      addData: temp,
    });
  },

  _getCheckboxValueAbtest(checkeds) {
    console.log(checkeds);
    const temp = {};
    const item = this.state.addData;
    temp.abtestParamIdList = checkeds;
    this.setState({
      addData: Object.assign(item, temp),
    });

    this.props.setStoreState({
      addData: temp,
    });
  },

  _onchangeSiteId(param) {
    const temp = {};
    const item = this.state.addData;
    temp.siteId = param.key;
    temp.siteName = param.name;
    console.log(temp);
    this.setState({
      siteId: param.key,
      addData: Object.assign(item, temp),
    });
    this.props.setStoreState({
      siteId: param.key,
      addData: Object.assign(item, temp),
    });

    this._fetchUpDataParams();
  },


  _onchangeChannelName(param) {
    const temp = {};
    const item = this.state.addData;
    temp.channelId = param.key;
    temp.channelName = param.name;
    this.setState({
      addData: Object.assign(item, temp),
    });
    this.props.setStoreState({
      addData: Object.assign(item, temp),
    });
  },

  _onChangeInputNumber(key, value) {
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

	// 获取初始数据列表
  _fetchUpDataParams() {
    const siteId = this.state.siteId;

    if (!siteId || siteId == '') {
      this.openNotificationWithIcon('error', '错误', 'siteId字段不能为空!')();
      return false;
    }

    ajax({
      url: '/tag/param/QueryParam.do',
      data: { paramQuery: JSON.stringify({ pageSize: 50, siteId }) },
      method: 'get',
    }).then(resp => {
      if (resp.data && resp.data != '') {
        this.setState({
          loading: true,
          siteId,
          paramsList: resp.data,
        });
      } else {
        this.openNotificationWithIcon('error', '错误', '请选择正确的站点!')();
      }
    });
  },

  componentWillReceiveProps(nextProps) {
    if (nextProps.editorSate) {
      this.setState({
        addData: nextProps.editorData,
        editorData: nextProps.editorData,
        siteId: nextProps.siteId,
      });
    } else {
      this.setState({
        addData: defaultData,
        siteId: defaultData.siteId,
      });
    }
  },

  render() {
    let title = '新建Tag配置';
    const paramsSource = [];
    const editorSate = this.props.getStoreState().editorSate;
    const siteData = this.props.getStoreState().siteData;
    const channelData = this.props.getStoreState().channelData;
    const paramsList = this.props.getStoreState().paramsList;

    let addData = this.state.addData;

    if (editorSate) {
      title = '修改Tag配置';
      addData = this.props.getStoreState().editorData;
    } else {
      addData = this.state.addData;
    }

    const siteId = addData.siteId;

    paramsList.map(item => {
      if (item.siteId == siteId) {
        const temp = {};
        temp.label = item.label;
        temp.value = item.value;
        paramsSource.push(item.value);
      }
    });

    console.log(paramsSource);
    return (<div>
			<Modal width="80%" title={title} visible={this.props.visible} onOk={this._handleOk}
  onCancel={this._handleCancel}
   >
				<Form horizontal>
					<Row>
						<Col>
							<FormItem
  label="Tag 名称:"
  labelCol={{ span: 4 }}
  wrapperCol={{ span: 14 }}
							>
								<Input placeholder={addData.configName} value={addData.configName}
  name="configName"
  onChange={this.onChange.bind(this, 'configName')} disabled={editorSate}
        />
							</FormItem>
							<FormItem
  label="站点: "
  labelCol={{ span: 4 }}
  wrapperCol={{ span: 14 }}
							>
								<SelectAction name="siteName" keys="id" type="site" data={siteData}
  onChange={this._onchangeSiteId} disabled={editorSate}
  defaultValue={addData.siteName}
        />

							</FormItem>
							<FormItem
  label="Tag 类型: "
  labelCol={{ span: 4 }}
  wrapperCol={{ span: 14 }}
							>
								<Select id="select-tag-type" size="large" defaultValue={addData.type}
  value={addData.type} name="domain" style={{ width: 200 }}
  onChange={this._handleSelectType.bind(this, 'type')} disabled={editorSate}
        >
									<Option value="page">PAGE</Option>
									<Option value="s2s">S2S</Option>
								</Select>
							</FormItem>

							<FormItem
  label="渠道: "
  labelCol={{ span: 4 }}
  wrapperCol={{ span: 14 }}
							>
								<SelectAction name="channelName" keys="id" type="channel"
  data={channelData}
  onChange={this._onchangeChannelName}
  defaultValue={addData.channelName} disabled={editorSate}
        />

							</FormItem>
						</Col>
					</Row>
					<Row>
						<Col>
							<FormItem
  label="Tag Script: "
  labelCol={{ span: 4 }}
  wrapperCol={{ span: 14 }}
							>
								<Input type="textarea" rows="5" placeholder={addData.config}
  value={addData.config} name="config"
  onChange={this.onChange.bind(this, 'config')}
        />
							</FormItem>
						</Col>
					</Row>
					<Row>
						<Col offset={4}>
							<div className="params-list-box">
								<CheckboxGroup options={paramsSource} onChange={this._getCheckboxValue.bind(this)}
  value={addData.paramIdList}
        />
							</div>
						</Col>
					</Row>
					<Row>
						<Col>
							<FormItem
  label="实验 Tag Script: "
  labelCol={{ span: 4 }}
  wrapperCol={{ span: 14 }}
							>
								<Input type="textarea" rows="5" placeholder={addData.abtestConfig}
  value={addData.abtestConfig} name="abtestConfig"
  onChange={this.onChange.bind(this, 'abtestConfig')}
        />
							</FormItem>
						</Col>
					</Row>
					<Row>
						<Col offset={4}>
							<div className="params-list-box">
								<CheckboxGroup options={paramsSource} onChange={this._getCheckboxValueAbtest.bind(this)}
  value={addData.abtestParamIdList}
        />
							</div>
						</Col>
					</Row>
					<Row>
						<Col>
							<FormItem
  label="实验占比:"
  labelCol={{ span: 4 }}
  wrapperCol={{ span: 14 }}
							>
								<InputNumber type="input" rows="2" min={0} max={1} step={0.01}
  placeholder={addData.abtestPercentage}
  value={addData.syncPercentage} name="abtestPercentage"
  onChange={this._onChangeInputNumber.bind(this, 'abtestPercentage')}
        />
							</FormItem>
						</Col>
					</Row>
					<Row>
						<Col>
							<FormItem
  label="描述: "
  labelCol={{ span: 4 }}
  wrapperCol={{ span: 14 }}
							>
								<Input type="textarea" rows="2" placeholder={addData.description}
  value={addData.description} name="description"
  onChange={this.onChange.bind(this, 'description')}
        />
							</FormItem>
						</Col>
					</Row>
				</Form>
			</Modal>
		</div>);
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
})(FormAction);
