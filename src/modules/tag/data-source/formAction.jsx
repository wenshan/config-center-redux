import { createContainer, createRootContainer } from 'Roof';
import { Form, Input, Row, Col, Button, Select, Modal } from 'antd';
const FormItem = Form.Item;
import React from 'react';
import DataInfo from './dataInfo';
import fetchData from './fetchData.js';
import Utils from '../../../utils/index';
const ajax = Utils.ajax,
  commonUtils = Utils.common;
import User from '../util/user';
import SelectAction from '../util/selectAction';
const tempaddData = {};
const defaultData = {
  sourceName: '',
  sourceType: '',
  description: '',
};

const FormAction = React.createClass({
  mixins: [fetchData],
  getInitialState() {
    return {
      loading: false,
      visible: false,
      editorSate: false,
      addData: defaultData,
    };
  },

  onChange(key, event) {
    tempaddData[key] = event.target.value;
    this.setState({
      addData: Object.assign(this.state.addData, tempaddData),
      editorData: Object.assign(this.state.addData, tempaddData),
    });
    this.props.setStoreState({
      addData: Object.assign(this.state.addData, tempaddData),
      editorData: Object.assign(this.state.addData, tempaddData),
    });
  },

  _handleOk() {
    const initializeType = this.props.getStoreState().initializeType;
    const editorSate = this.props.getStoreState().editorSate;
    const sourceMeta = this.props.getStoreState().sourceMeta;
    let tempAddData = this.props.getStoreState().addData;
    const parmas = {};

    if (editorSate) {
      tempAddData = this.props.getStoreState().editorData;
    } else {
      tempAddData = this.props.getStoreState().addData;
    }

    parmas.sourceMeta = this.props.getStoreState().sourceMeta;
    parmas.sourceType = this.props.getStoreState().initializeType;

    tempAddData = Object.assign(tempAddData, parmas);

    for (const key in tempAddData) {
      if (tempAddData[key] === '' || !Object.prototype.toString.call(tempAddData[key]) === '[object Array]') {
        this.openNotificationWithIcon('error', '错误', `${key}字段不能为空!`)();
        return false;
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
      editorSate: false,
    });


    if (editorSate) {
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


  componentWillReceiveProps(nextProps) {
    if (nextProps.editorSate) {
      this.setState({
        addData: nextProps.editorData,
        sourceData: nextProps.nextProps,
        initializeType: nextProps.initializeType,
      });
    }
  },

  render() {
    let title = '新建数据源配置';
    const editorSate = this.props.getStoreState().editorSate;
    let addData = this.state.addData;
    if (editorSate) {
      title = '修改数据源配置';
      addData = this.props.getStoreState().editorData;
    } else {
      addData = this.state.addData;
    }

    return (<div>
			<Modal title={title} width="90%" visible={this.props.visible} onOk={this._handleOk}
  onCancel={this._handleCancel}
   >
				<Form horizontal>
					<Row>
						<Col>
							<FormItem
  label="数据源名称： "
  labelCol={{ span: 4 }}
  wrapperCol={{ span: 12 }}
							>
								<Input placeholder={addData.source_name} value={addData.sourceName} name="sourceName"
  onChange={this.onChange.bind(this, 'sourceName')}
  disabled={this.props.editorSate}
        />
							</FormItem>
							<FormItem
  label="数据源描述： "
  labelCol={{ span: 4 }}
  wrapperCol={{ span: 12 }}
							>
								<Input placeholder={addData.description} value={addData.description} name="description"
  onChange={this.onChange.bind(this, 'description')}
        />
							</FormItem>
						</Col>
					</Row>
				</Form>
				<Row>
					<Col span={4} style={{ textAlign: 'right' }}>
						选择数据源：
					</Col>
				</Row>
				<Row>
					<Col offset={2}><DataInfo editorSate={this.props.editorSate} /></Col>
				</Row>

			</Modal>
		</div>);
  },
});
export default createContainer({
  tableList: 'tableList',
  dataSourceId: 'dataSourceId',
  editorData: 'editorData',
  editorSate: 'editorSate',
  accessDeny: 'accessDeny',
  addData: 'addData',
  sourceMeta: 'sourceMeta',
  initializeType: 'initializeType',
})(FormAction);
