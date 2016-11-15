import { createContainer, createRootContainer } from 'Roof';
import { Form, Input, Row, Col, Button, Select, Modal } from 'antd';

import React from 'react';
import fetchData from './fetchData.js';
import Utils from '../../../utils/index';
import Permission from '../../../components/permission/index';
import User from './user';

const ajax = Utils.ajax,
  commonUtils = Utils.common;
const FormItem = Form.Item;
const tempaddData = {};
const defaultData = {
  channelName: '',
  description: '',
  interfacePerson: '',
};
const FormAction = React.createClass({
  mixins: [fetchData],
  getInitialState() {
    let title = '新建渠道管理';
    let addData = {};
    const editorSate = this.props.getStoreState().editorSate;

    if (editorSate) {
      title = '修改渠道管理';
      addData = this.props.getStoreState().editorData;
      this.props.setStoreState({
        interfacePersonList: addData.interfacePersonList,
      });
    } else {
      addData = defaultData;
      this.props.setStoreState({
        interfacePersonList: [],
      });
    }

    return {
      loading: false,
      visible: false,
      addData: defaultData,
    };
  },

  onChange(key, event) {
    tempaddData[key] = event.target.value;
    this.setState({
      addData: Object.assign(this.state.addData, this.props.getStoreState().editorData, tempaddData),
    });

    this.props.setStoreState({
      addData: Object.assign(this.state.addData, this.props.getStoreState().editorData, tempaddData),
      editorData: this.state.addData,
    });
  },

  handleOk() {
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
      addData: tempaddData,
      editorData: tempaddData,
      editorSate: false,
    });

    this.props.actionHandleVisible();
  },


  handleCancel() {
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
    return (<div>
			<Modal title={this.state.title} visible={this.props.visible} onOk={this.handleOk}
  onCancel={this.handleCancel}
   >
				<Form horizontal>
					<FormItem
  label="渠道名称:"
  labelCol={{ span: 4 }}
  wrapperCol={{ span: 14 }}
					>
						<Input placeholder={this.state.addData.channelName} value={this.state.addData.channelName}
  name="channelName"
  onChange={this.onChange.bind(this, 'channelName')} disabled={this.props.editorSate}
      />
					</FormItem>

					<FormItem
  label="渠道描述"
  labelCol={{ span: 4 }}
  wrapperCol={{ span: 14 }}
					>
						<Input type="textarea" placeholder={this.state.addData.description}
  value={this.state.addData.description} name="description"
  onChange={this.onChange.bind(this, 'description')}
      />
					</FormItem>
					<FormItem
  label="接口人: "
  labelCol={{ span: 4 }}
  wrapperCol={{ span: 14 }}
					>
						<User onChange={this._interfacePerson} defaultPerson={this.state.addData.interfacePerson} />
					</FormItem>
				</Form>
			</Modal>
		</div>);
  },
});
export default createContainer({
  tableList: 'tableList',
  channelId: 'channelId',
  editorData: 'editorData',
  editorSate: 'editorSate',
  accessDeny: 'accessDeny',
  interfacePersonList: 'interfacePersonList',
})(FormAction);
