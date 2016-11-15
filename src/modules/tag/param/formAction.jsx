import { createContainer, createRootContainer } from 'Roof';
import { Form, Input, Row, Col, Button, Select, Modal } from 'antd';
const FormItem = Form.Item;
import React from 'react';
import fetchData from './fetchData.js';
import Utils from '../../../utils/index';
const ajax = Utils.ajax,
  commonUtils = Utils.common;
import User from '../util/user';
import SelectAction from '../util/selectActionData';
const tempaddData = {};
const defaultData = {
  paramName: '',
  description: '',
  dataSourceDTO: {
    id: '',
    sourceName: '',
  },
  siteDTO: {
    siteName: '',
    siteId: '',
  },
  dataSourceId: '',
  siteId: '',

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
    let item = this.state.addData;
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

  _handleOk() {
    this.setState({
      loading: false,
      visible: false,
    });
    if (this.props.getStoreState().editorSate) {
      this.fetchEditorData();
    } else {
      this.fetchAddData();
    }

    this.props.setStoreState({
      visible: false,
      addData: this.state.addData,
      editorData: this.state.addData,
      editorSate: false,
    });

    this.props.actionHandleVisible();
  },


  _handleCancel() {
    this.props.setStoreState({
      visible: false,
      editorSate: false,
    });

    this.props.actionHandleVisible();
  },

  _onchangeSiteId(param) {
    let item = this.state.addData;
    const temp = {};
    temp.siteId = param.key;

    item = Object.assign(item, temp);
    this.setState({
      addData: item,
    });
  },

  _onchangeDataSourceId(param) {
    let item = this.state.addData;
    const temp = {};
    temp.dataSourceId = param.key;

    item = Object.assign(item, temp);
    this.setState({
      addData: item,
    });
  },

  componentWillReceiveProps(nextProps) {
    if (nextProps.editorSate) {
      this.setState({
        addData: nextProps.editorData,
      });
    }
  },

  render() {
    let title = '添加参数';
    const siteData = this.props.getStoreState().siteData;
    const dataSource = this.props.getStoreState().dataSource;
    const editorSate = this.props.getStoreState().editorSate;
    let addData = this.state.addData;

    if (editorSate) {
      title = '修改参数';
      addData = this.props.editorData;
    } else {
      addData = this.state.addData;
    }

    return (<div>
			<Modal title={title} visible={this.props.visible} onOk={this._handleOk} onCancel={this._handleCancel}>
				<Form horizontal>
					<FormItem
  label="参数名称: "
  labelCol={{ span: 4 }}
  wrapperCol={{ span: 14 }}
					>
						<Input placeholder={addData.paramName} value={addData.paramName}
  name="paramName"
  onChange={this.onChange.bind(this, 'paramName')} disabled={this.props.editorSate}
      />
					</FormItem>

					<FormItem
  label="参数描述: "
  labelCol={{ span: 4 }}
  wrapperCol={{ span: 14 }}
					>
						<Input type="textarea" placeholder={addData.description}
  value={addData.description} name="description"
  onChange={this.onChange.bind(this, 'description')}
      />
					</FormItem>
					<FormItem
  label="选择站点: "
  labelCol={{ span: 4 }}
  wrapperCol={{ span: 14 }}
					>

						<SelectAction name="siteName" keys="id" type="site" data={siteData}
  onChange={this._onchangeSiteId} disabled={editorSate}
  defaultValue={addData.siteDTO.siteName}
      />
					</FormItem>
					<FormItem
  label="选择数据源: "
  labelCol={{ span: 4 }}
  wrapperCol={{ span: 14 }}
					>
						<SelectAction name="sourceName" keys="id" type="site" data={dataSource}
  onChange={this._onchangeDataSourceId} disabled={editorSate}
  defaultValue={addData.dataSourceDTO.sourceName}
      />
					</FormItem>
				</Form>
			</Modal>
		</div>);
  },
});
export default createContainer({
  tableList: 'tableList',
  paramId: 'paramId',
  addData: 'addData',
  editorData: 'editorData',
  editorSate: 'editorSate',
  accessDeny: 'accessDeny',
  dataSource: 'dataSource',
  siteData: 'siteData',
  defaultValue: 'defaultValue',
})(FormAction);
