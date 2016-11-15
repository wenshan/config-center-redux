import { createContainer } from 'Roof';
import { Tabs, Table, Form, Input, Row, Col, Button, Select, Icon } from 'antd';
import React from 'react';
import Merge from 'merge-deep';
import Utils from '../../../utils/index';
const ajax = Utils.ajax,
  commonUtils = Utils.common;
const FormItem = Form.Item;
const Option = Select.Option;
const TabPane = Tabs.TabPane;
const initData = {
  key: '',
  value: '',
};
let sourceMetaData = {};
let initializeType = 'QUERY_STRING';
const defaultData = {
  HTTP: {
    requestUrl: '',
    parameterMapping: [
      {
        key: '',
        value: '',
        dataType: 'STRING',
      }],
    returnDataMapping: [
      {
        key: '',
        value: '',
        dataType: 'STRING',
      }],
  },
  HSF: {
    dataId: '',
    version: '',
    method: '',
    group: '',
    parameterMapping: [
      {
        key: '',
        value: '',
        dataType: 'STRING',
      }],
    returnDataMapping: [
      {
        key: '',
        value: '',
        dataType: 'STRING',
      }],
  },
  QUERY_STRING: {
    paramName: '',
  },
};

const parameterMapping = [];
const returnDataMapping = [];

const tempParameterMapping = {
  key: '',
  value: '',
  dataType: 'STRING',
};
const tempReturnDataMapping = {
  key: '',
  value: '',
  dataType: 'STRING',
};

let editorSate = false;
let sourceDataHsf = defaultData.HSF;
let sourceDataHttp = defaultData.HTTP;
let sourceDataQs = defaultData.QUERY_STRING;

const DataInfo = React.createClass({
  getInitialState() {
    editorSate = this.props.getStoreState().editorSate;
    return {
      loading: false,
      visible: false,
      initializeType: 'QUERY_STRING',
      sourceMeta: defaultData.QUERY_STRING,
      dataType: [
				{ key: 'dataType', value: 'STRING' },
      ],

    };
  },

	// 数据源配置
  _dataSourceConfigure(key) {
    this.setState({
      initializeType: key,
      sourceMeta: defaultData[key],
    });
    this.props.setStoreState({
      initializeType: key,
      sourceMeta: defaultData[key],
    });
  },

  _onChangeField(key, sale, type, idx, event) {
    const value = event.target.value;
    const sourceMeta = this.state.sourceMeta;
    const parameterMapping = [];
    const returnDataMapping = [];
    const items = {};

    if (sale == 'parameterMapping') {
      if (key == 'key') {
        sourceMeta.parameterMapping[idx].key = value;
      } else if (key == 'value') {
        sourceMeta.parameterMapping[idx].value = value;
      }
    } else if (sale == 'returnDataMapping') {
      if (key == 'key') {
        sourceMeta.returnDataMapping[idx].key = value;
      } else if (key == 'value') {
        sourceMeta.returnDataMapping[idx].value = value;
      }
    }
    this.setState({
      sourceMeta,
    });

    this.props.setStoreState({
      sourceMeta,
    });
  },

  _onChange(key, sale, type, idx, event) {
    const value = event.target.value;
    let item = this.props.getStoreState().sourceMeta;
    const temp = {};
    temp[key] = value;

    item = Object.assign(item, temp);

    this.setState({
      sourceMeta: item,
    });

    this.props.setStoreState({
      sourceMeta: item,
    });
  },

  _configureAddItemHsfParam(key, idx) {
    const sourceMeta = sourceDataHsf;
    const temp = {
      key: '',
      value: '',
      dataType: 'STRING',
    };

    sourceMeta.parameterMapping.push(temp);

    this.setState({
      sourceMeta,
    });

    this.props.setStoreState({
      sourceMeta,
    });
  },

  _configureDelItemHsfParam(key, idx) {
    const sourceMeta = sourceDataHsf;
    if (sourceMeta.parameterMapping.length <= 1) {
      return false;
    }

    sourceMeta.parameterMapping = sourceMeta.parameterMapping.splice(idx, 1);

    this.setState({
      sourceMeta,
    });
    this.props.setStoreState({
      sourceMeta,
    });
  },

  _configureAddItemHsfReturn(key) {
    const sourceMeta = sourceDataHsf;
    const temp = {
      key: '',
      value: '',
      dataType: 'STRING',
    };

    sourceMeta.returnDataMapping.push(temp);

    this.setState({
      sourceMeta,
    });

    this.props.setStoreState({
      sourceMeta,
    });
  },

  _configureDelItemHsfReturn(key, idx) {
    const sourceMeta = sourceDataHsf;
    if (sourceDataHsf.returnDataMapping.length <= 1) {
      return false;
    }

    sourceMeta.returnDataMapping = sourceMeta.returnDataMapping.splice(idx, 1);

    this.setState({
      sourceMeta,
    });
    this.props.setStoreState({
      sourceMeta,
    });
  },

  _configureAddItemHttpParam(key, idx) {
    const sourceMeta = sourceDataHttp;
    const temp = {
      key: '',
      value: '',
      dataType: 'STRING',
    };

    sourceMeta.parameterMapping.push(temp);

    this.setState({
      sourceMeta,
    });

    this.props.setStoreState({
      sourceMeta,
    });
  },

  _configureDelItemHttpParam(key, idx) {
    const sourceMeta = sourceDataHttp;

    if (sourceMeta.parameterMapping.length <= 1) {
      return false;
    }

    sourceMeta.parameterMapping = sourceMeta.parameterMapping.splice(idx, 1);

    this.setState({
      sourceMeta,
    });
    this.props.setStoreState({
      sourceMeta,
    });
  },

  _configureAddItemHttpReturn(key) {
    const sourceMeta = sourceDataHttp;
    const temp = {
      key: '',
      value: '',
      dataType: 'STRING',
    };

    sourceMeta.returnDataMapping.push(temp);

    this.setState({
      sourceMeta,
    });

    this.props.setStoreState({
      sourceMeta,
    });
  },

  _configureDelItemHttpReturn(key, idx) {
    const sourceMeta = sourceDataHttp;
    if (sourceMeta.returnDataMapping.length <= 1) {
      return false;
    }

    sourceMeta.returnDataMapping = sourceMeta.returnDataMapping.splice(idx, 1);

    this.setState({
      sourceMeta,
    });
    this.props.setStoreState({
      sourceMeta,
    });
  },

  _handleSelectChange(key, sale, idx, value) {
    const item = this.state.sourceMeta;
    item[sale][idx][key] = value;
    this.setState({
      sourceMeta: item,
    });
  },

  componentWillReceiveProps(nextProps) {
    if (nextProps.editorSate) {
      this.setState({
        sourceMeta: nextProps.sourceMeta,
      });
    } else {
      this.setState({
        sourceMeta: defaultData.QUERY_STRING,
        initializeType: 'QUERY_STRING',
      });
    }
  },

  render() {
    let queryString = '';
    const parameterMappingHsf = [];
    const returnDataMappingHsf = [];
    const parameterMappingHttp = [];
    const returnDataMappingHttp = [];
    editorSate = this.props.getStoreState().editorSate;
    initializeType = this.state.initializeType;
    if (editorSate) {
      initializeType = this.props.getStoreState().editorData.sourceType;
      if (initializeType == 'QUERY_STRING') {
        sourceDataQs = this.props.getStoreState().sourceMeta;
      } else if (initializeType == 'HSF') {
        sourceDataHsf = this.props.getStoreState().sourceMeta;
      } else if (initializeType == 'HTTP') {
        sourceDataHttp = this.props.getStoreState().sourceMeta;
      }

      sourceMetaData = this.props.getStoreState().sourceMeta;
    } else {
      if (initializeType == 'QUERY_STRING') {
        sourceDataQs = this.state.sourceMeta;
      } else if (initializeType == 'HSF') {
        sourceDataHsf = this.state.sourceMeta;
      } else if (initializeType == 'HTTP') {
        sourceDataHttp = this.state.sourceMeta;
      }
      sourceMetaData = this.state.sourceMeta;
    }

    queryString = (<Row>
			<Col>
				<Form>
					<FormItem label="参数名称："
  labelCol={{ span: 2 }}
  wrapperCol={{ span: 14 }}
					>
						<Input
  placeholder={sourceDataQs.paramName}
  value={sourceDataQs.paramName}
  name="paramName"
  onChange={this._onChange.bind(this, 'paramName', '', 'QUERY_STRING', '')}
						/>
					</FormItem>
				</Form>
			</Col>
		</Row>);

    sourceDataHsf.parameterMapping.map((item, idx) => {
      parameterMappingHsf.push(
				<Row gutter={24} data-index={idx}>
					<Col span={7}>
						<FormItem
  label="字段映射："
  labelCol={{ span: 4 }}
  wrapperCol={{ span: 14 }}
						>
							<Input
  placeholder={item.key}
  value={item.key}
  name="parameterMapping.key"
  onChange={this._onChangeField.bind(this, 'key', 'parameterMapping', 'HSF', idx)}
							/>
						</FormItem>
					</Col>
					<Col span={7}>
						<FormItem
  label="选择字段："
  labelCol={{ span: 4 }}
  wrapperCol={{ span: 14 }}
						>
							<Input
  placeholder={item.value}
  value={item.value}
  name="parameterMapping.value"
  onChange={this._onChangeField.bind(this, 'value', 'parameterMapping', 'HSF', idx)}
							/>
						</FormItem>
					</Col>
					<Col span={7}>
						<FormItem
  label="类型："
  labelCol={{ span: 4 }}
  wrapperCol={{ span: 14 }}
						>
							<Select defaultValue="STRING"
  onChange={this._handleSelectChange.bind(this, 'dataType', 'returnDataMapping', idx)}
       >
								<Option value="STRING">java.lang.String(字符串)</Option>
								<Option value="BYTE">java.lang.Byte(字节)</Option>
								<Option value="SHORT">java.lang.Short(短整型)</Option>
								<Option value="INTEGER">java.lang.Integer(整型)</Option>
								<Option value="LONG">java.lang.Long(长整型)</Option>
								<Option value="FLOAT">java.lang.Float(浮点型)</Option>
								<Option value="DOUBLE">java.lang.Double(双精度)</Option>
								<Option value="CHARACTER">java.lang.Character(字符型)</Option>
								<Option value="BOOLEAN">java.lang.Boolean(布尔型)</Option>
								<Option value="JSON">com.alibaba.fastjson.JSON(JSON类型)</Option>
								<Option value="MAP">java.util.Map(Map 型）</Option>
							</Select>
						</FormItem>
					</Col>
					<Col span={3}>
						<Button onClick={this._configureDelItemHsfParam.bind(this, 'HSF', idx)}>删除</Button>
					</Col>
				</Row>
			);
    });

    sourceDataHsf.returnDataMapping.map((item, idx) => {
      returnDataMappingHsf.push(
				<Row gutter={24} data-index={idx}>
					<Col span={7}>
						<FormItem
  label="返回映射："
  labelCol={{ span: 4 }}
  wrapperCol={{ span: 14 }}
						>
							<Input
  placeholder={item.key}
  value={item.key}
  name="returnDataMapping.key"
  onChange={this._onChangeField.bind(this, 'key', 'returnDataMapping', 'HSF', idx)}
							/>
						</FormItem>
					</Col>
					<Col span={7}>
						<FormItem
  label="返回数据："
  labelCol={{ span: 4 }}
  wrapperCol={{ span: 14 }}
						>
							<Input
  placeholder={item.value}
  value={item.value}
  name="returnDataMapping.value"
  onChange={this._onChangeField.bind(this, 'value', 'returnDataMapping', 'HSF', idx)}
							/>
						</FormItem>
					</Col>
					<Col span={7}>
						<FormItem
  label="类型："
  labelCol={{ span: 4 }}
  wrapperCol={{ span: 14 }}
						>
							<Select defaultValue="STRING"
  onChange={this._handleSelectChange.bind(this, 'dataType', 'returnDataMapping', idx)}
       >
								<Option value="STRING">java.lang.String(字符串)</Option>
								<Option value="BYTE">java.lang.Byte(字节)</Option>
								<Option value="SHORT">java.lang.Short(短整型)</Option>
								<Option value="INTEGER">java.lang.Integer(整型)</Option>
								<Option value="LONG">java.lang.Long(长整型)</Option>
								<Option value="FLOAT">java.lang.Float(浮点型)</Option>
								<Option value="DOUBLE">java.lang.Double(双精度)</Option>
								<Option value="CHARACTER">java.lang.Character(字符型)</Option>
								<Option value="BOOLEAN">java.lang.Boolean(布尔型)</Option>
								<Option value="JSON">com.alibaba.fastjson.JSON(JSON类型)</Option>
								<Option value="MAP">java.util.Map(Map 型）</Option>

							</Select>
						</FormItem>
					</Col>
					<Col span={3}>
						<Button onClick={this._configureDelItemHsfReturn.bind(this, 'HSF', idx)}>删除</Button>
					</Col>
				</Row>
			);
    });

    sourceDataHttp.parameterMapping.map((item, idx) => {
      parameterMappingHttp.push(
				<Row gutter={24} data-index={idx}>
					<Col span={7}>
						<FormItem
  label="字段映射："
  labelCol={{ span: 4 }}
  wrapperCol={{ span: 14 }}
						>
							<Input
  placeholder={item.key}
  value={item.key}
  name="parameterMapping.key"
  onChange={this._onChangeField.bind(this, 'key', 'parameterMapping', 'HTTP', idx)}
							/>
						</FormItem>
					</Col>
					<Col span={7}>
						<FormItem
  label="选择字段："
  labelCol={{ span: 4 }}
  wrapperCol={{ span: 14 }}
						>
							<Input
  placeholder={item.value}
  value={item.value}
  name="parameterMapping.value"
  onChange={this._onChangeField.bind(this, 'value', 'parameterMapping', 'HTTP', idx)}
							/>
						</FormItem>
					</Col>
					<Col span={7}>
						<FormItem
  label="类型："
  labelCol={{ span: 4 }}
  wrapperCol={{ span: 14 }}
						>
							<Select defaultValue="STRING"
  onChange={this._handleSelectChange.bind(this, 'dataType', 'parameterMapping', idx)}
       >
								<Option value="STRING">java.lang.String(字符串)</Option>
								<Option value="BYTE">java.lang.Byte(字节)</Option>
								<Option value="SHORT">java.lang.Short(短整型)</Option>
								<Option value="INTEGER">java.lang.Integer(整型)</Option>
								<Option value="LONG">java.lang.Long(长整型)</Option>
								<Option value="FLOAT">java.lang.Float(浮点型)</Option>
								<Option value="DOUBLE">java.lang.Double(双精度)</Option>
								<Option value="CHARACTER">java.lang.Character(字符型)</Option>
								<Option value="BOOLEAN">java.lang.Boolean(布尔型)</Option>
								<Option value="JSON">com.alibaba.fastjson.JSON(JSON类型)</Option>
								<Option value="MAP">java.util.Map(Map 型）</Option>

							</Select>
						</FormItem>
					</Col>
					<Col span={3}>
						<Button onClick={this._configureDelItemHttpParam.bind(this, 'HTTP', idx)}>删除</Button>
					</Col>
				</Row>
			);
    });

    sourceDataHttp.returnDataMapping.map((item, idx) => {
      returnDataMappingHttp.push(
				<Row gutter={24} data-index={idx}>
					<Col span={7}>
						<FormItem
  label="返回字段："
  labelCol={{ span: 4 }}
  wrapperCol={{ span: 14 }}
						>
							<Input
  placeholder={item.key}
  value={item.key}
  name="returnDataMapping.key"
  onChange={this._onChangeField.bind(this, 'key', 'returnDataMapping', 'HTTP', idx)}
							/>
						</FormItem>
					</Col>
					<Col span={7}>
						<FormItem
  label="返回数据："
  labelCol={{ span: 4 }}
  wrapperCol={{ span: 14 }}
						>
							<Input
  placeholder={item.value}
  value={item.value}
  name="returnDataMapping.value"
  onChange={this._onChangeField.bind(this, 'value', 'returnDataMapping', 'HTTP', idx)}
							/>
						</FormItem>
					</Col>
					<Col span={7}>
						<FormItem
  label="类型："
  labelCol={{ span: 4 }}
  wrapperCol={{ span: 14 }}
						>
							<Select defaultValue="STRING"
  onChange={this._handleSelectChange.bind(this, 'dataType', 'returnDataMapping', idx)}
       >
								<Option value="STRING">java.lang.String(字符串)</Option>
								<Option value="BYTE">java.lang.Byte(字节)</Option>
								<Option value="SHORT">java.lang.Short(短整型)</Option>
								<Option value="INTEGER">java.lang.Integer(整型)</Option>
								<Option value="LONG">java.lang.Long(长整型)</Option>
								<Option value="FLOAT">java.lang.Float(浮点型)</Option>
								<Option value="DOUBLE">java.lang.Double(双精度)</Option>
								<Option value="CHARACTER">java.lang.Character(字符型)</Option>
								<Option value="BOOLEAN">java.lang.Boolean(布尔型)</Option>
								<Option value="JSON">com.alibaba.fastjson.JSON(JSON类型)</Option>
								<Option value="MAP">java.util.Map(Map 型）</Option>
							</Select>
						</FormItem>
					</Col>
					<Col span={3}>
						<Button onClick={this._configureDelItemHttpReturn.bind(this, 'HTTP', idx)}>删除</Button>
					</Col>
				</Row>
			);
    });

    return (<div>
			<Row>
				<Col span={24}>
					<div className="card-container">
						<Tabs type="card" onChange={this._dataSourceConfigure} defaultActiveKey={initializeType}
  activeKey={initializeType}
      >
							<TabPane tab="QUERY_STRING" key="QUERY_STRING" disabled={editorSate}>
								{queryString}
							</TabPane>
							<TabPane tab="HSF" key="HSF" disabled={editorSate}>
								<Row>
									<Col>
										<Form>
											<FormItem
  label="HSF ID："
  labelCol={{ span: 6 }}
  wrapperCol={{ span: 14 }}
											>
												<Input
  placeholder={sourceDataHsf.dataId}
  value={sourceDataHsf.dataId}
  name="dataId"
  onChange={this._onChange.bind(this, 'dataId', '', 'HSF', '')}
												/>
											</FormItem>
											<FormItem
  label="HSF版本："
  labelCol={{ span: 6 }}
  wrapperCol={{ span: 14 }}
											>
												<Input
  placeholder={sourceDataHsf.version}
  value={sourceDataHsf.version}
  name="version"
  onChange={this._onChange.bind(this, 'version', '', 'HSF', '')}
												/>
											</FormItem>
											<FormItem
  label="HSF 方法："
  labelCol={{ span: 6 }}
  wrapperCol={{ span: 14 }}
											>
												<Input
  placeholder={sourceDataHsf.method}
  value={sourceDataHsf.method}
  name="method"
  onChange={this._onChange.bind(this, 'method', '', 'HSF', '')}
												/>
											</FormItem>
											<FormItem
  label="HSF Group："
  labelCol={{ span: 6 }}
  wrapperCol={{ span: 14 }}
											>
												<Input
  placeholder={sourceDataHsf.group}
  value={sourceDataHsf.group}
  name="group"
  onChange={this._onChange.bind(this, 'group', '', 'HSF', '')}
												/>
											</FormItem>
										</Form>
									</Col>
								</Row>
								<Row>
									<Col>
										<Form horizontal className="ant-advanced-search-form">
											{parameterMappingHsf}
											<Row gutter={16}>
												<Col span={12} offset={12} style={{ textAlign: 'right' }}>
													<Button type="primary"
  onClick={this._configureAddItemHsfParam.bind(this, 'HSF')}
             >添加参数字段映射</Button>
												</Col>
											</Row>
										</Form>
									</Col>
								</Row>
								<Row>
									<Col>
										<Form horizontal className="ant-advanced-search-form">
											{returnDataMappingHsf}
											<Row gutter={16}>
												<Col span={12} offset={12} style={{ textAlign: 'right' }}>
													<Button type="primary"
  onClick={this._configureAddItemHsfReturn.bind(this, 'HSF')}
             >添加参数字段映射</Button>
												</Col>
											</Row>
										</Form>

									</Col>
								</Row>
							</TabPane>
							<TabPane tab="HTTP" key="HTTP" disabled={editorSate}>
								<Row>
									<Col>
										<Form>
											<FormItem
  label="URL："
  labelCol={{ span: 2 }}
  wrapperCol={{ span: 16 }}
											>
												<Input
  placeholder={sourceDataHttp.requestUrl}
  value={sourceDataHttp.requestUrl}
  name="requestUrl"
  onChange={this._onChange.bind(this, 'requestUrl', '', 'HTTP', '')}
												/>
											</FormItem>
										</Form>
									</Col>
								</Row>

								<Row>
									<Col>
										<Form horizontal className="ant-advanced-search-form">
											{parameterMappingHttp}
											<Row gutter={16}>
												<Col span={12} offset={12} style={{ textAlign: 'right' }}>
													<Button type="primary"
  onClick={this._configureAddItemHttpParam.bind(this, 'HTTP')}
             >添加参数字段映射</Button>
												</Col>
											</Row>
										</Form>
									</Col>
								</Row>
								<Row>
									<Col>
										<Form horizontal className="ant-advanced-search-form">
											{returnDataMappingHttp}
											<Row gutter={16}>
												<Col span={12} offset={12} style={{ textAlign: 'right' }}>
													<Button type="primary"
  onClick={this._configureAddItemHttpReturn.bind(this, 'HTTP')}
             >添加参数字段映射</Button>

												</Col>
											</Row>
										</Form>
									</Col>
								</Row>
							</TabPane>
						</Tabs>
					</div>
				</Col>
			</Row>
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
})(DataInfo);
