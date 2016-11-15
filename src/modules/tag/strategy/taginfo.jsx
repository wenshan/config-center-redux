import { createContainer } from 'Roof';
import { Table, Form, Input, Row, Col, Button, Select, InputNumber } from 'antd';
import React from 'react';
import fetchData from './fetchData.js';
import Utils from '../../../utils/index';
const ajax = Utils.ajax,
  commonUtils = Utils.common;
const columns = [{
  title: '站点名称',
  dataIndex: 'site_name',
}, {
  title: '站点域名',
  dataIndex: 'domain',
}, {
  title: '站点描述',
  dataIndex: 'description',
}, {
  title: '接口人',
  dataIndex: 'interface_person',
}];

const data = [{
  id: '1111',
  key: '1111',
  sourceName: 'www.alibaba.com',
  description: 'xxxxxxx',
  sourceType: 'www.alibaba.com',
}, {
  id: '222',
  key: '2222',
  sourceName: 'www.alibaba.com',
  description: 'xxxxxxx',
  sourceType: 'www.alibaba.com',
}, {
  id: '333',
  key: '333',
  sourceName: 'www.alibaba.com',
  description: 'xxxxxxx',
  sourceType: 'www.alibaba.com',
}];

const TagInfo = React.createClass({
  mixins: [fetchData],
  getInitialState() {
    return {
      loading: false,
      visible: false,
      selectedRowKeys: [],
      tableSelsct: [], // 这里配置默认勾选列

    };
  },

  _selectData() {
    this.setState({
      loading: true,
    });
  },

  _onSelectChange(selectedRowKeys, key) {
    this.setState({
      selectedRowKeys,
    });
    this.props.setStoreState({
      selectedRowKeys,
    });
  },

  _getRowSelection() {
    const self = this;
    const selectedRowKeys = this.state.selectedRowKeys;

    return {
      type: 'checkbox',
      selectedRowKeys: this.state.selectedRowKeys,
      onChange: self._onSelectChange.bind(self),
    };
  },

  _columns() {
    return [{
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    }, {
      title: '数据源名称',
      dataIndex: 'sourceName',
    }, {
      title: '数据源类型',
      dataIndex: 'sourceType',
    }, {
      title: '数据源描述',
      dataIndex: 'description',
    }];
  },

  componentDidMount() {
    this.fetchUpDataSource();
    const tableSelsct = this.props.getStoreState().tableSelsct;
    this.setState({
      tableSelsct,
    });
  },

  render() {
    let { loading, selectedRowKeys } = this.state;
    const rowSelection = this._getRowSelection();
    const hasSelected = selectedRowKeys.length > 0;

    return (

			<div>
				<div style={{ marginBottom: 16 }}>
					<Button type="primary" onClick={this._selectData}
  disabled={!hasSelected} loading={loading}
					>选择</Button>
					<span style={{ marginLeft: 8 }}>{hasSelected ? `选择了 ${selectedRowKeys.length} 个对象` : ''}</span>
				</div>
				<Table rowSelection={rowSelection} columns={columns} dataSource={data} />
			</div>
		);
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
})(TagInfo);
