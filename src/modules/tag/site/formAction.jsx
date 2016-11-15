import { createContainer, createRootContainer } from 'Roof';
import { Form, Input, Row, Col, Button, Select, Modal } from 'antd';
const FormItem = Form.Item;
import React from 'react';
import fetchData from './fetchData.js';
import Utils from '../../../utils/index';
const ajax = Utils.ajax,
  commonUtils = Utils.common;
import User from './user';
const defaultData = {
  siteName: '',
  domain: '',
  description: '',
  interfacePerson: '',
};
const tempaddData = {};
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
    tempaddData[key] = event.target.value;

    commonUtils.merge(this.state.addData, tempaddData);

    this.setState({
      addData: Object.assign(this.state.addData, tempaddData),
    });

    this.props.setStoreState({
      addData: Object.assign(this.state.addData, this.props.getStoreState().editorData, tempaddData),
      editorData: this.state.addData,
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
      addData: Object.assign(this.state.addData, this.props.getStoreState().editorData, tempaddData),
      editorData: Object.assign(this.state.addData, this.props.getStoreState().editorData, tempaddData),
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

  _interfacePerson(data) {
    this.props.setStoreState({
      addData: Object.assign(this.state.addData, { interfacePersonList: data }),
    });
    this.setState({
      addData: Object.assign(this.state.addData, { interfacePersonList: data }),
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
    let title = '新建站点配置';
    let addData = {};
    const editorSate = this.props.getStoreState().editorSate;
    addData = this.state.addData;
    if (editorSate) {
      title = '修改站点配置';
    }

    return (<div>
			<Modal title={title} visible={this.props.visible} onOk={this._handleOk}
  onCancel={this._handleCancel}
   >
				<Form horizontal>
					<FormItem
  label="站点名称: "
  labelCol={{ span: 4 }}
  wrapperCol={{ span: 14 }}
					>
						<Input placeholder={addData.siteName} value={addData.siteName}
  name="siteName"
  onChange={this.onChange.bind(this, 'siteName')} disabled={this.props.editorSate}
      />
					</FormItem>
					<FormItem
  label="站点域名: "
  labelCol={{ span: 4 }}
  wrapperCol={{ span: 14 }}
					>
						<Input placeholder={addData.domain} value={addData.domain} name="domain"
  onChange={this.onChange.bind(this, 'domain')} disabled={this.props.editorSate}
      />
					</FormItem>

					<FormItem
  label="站点描述: "
  labelCol={{ span: 4 }}
  wrapperCol={{ span: 14 }}
					>
						<Input type="textarea" placeholder={addData.description} value={addData.description}
  name="description"
  onChange={this.onChange.bind(this, 'description')}
      />
					</FormItem>

					<FormItem
  label="接口人: "
  labelCol={{ span: 4 }}
  wrapperCol={{ span: 14 }}
					>
						<User onChange={this._interfacePerson} defaultPerson={addData.interfacePersonList} />
					</FormItem>
				</Form>
			</Modal>
		</div>);
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
})(FormAction);
