import { createContainer } from 'Roof';
import { Table, Form, Input, Row, Col, Button, Select, InputNumber, Checkbox } from 'antd';
import fetchData from './fetchData.js';
import Utils from '../../../utils/index';
import React from 'react';
const CheckboxGroup = Checkbox.Group;
const ajax = Utils.ajax,
  commonUtils = Utils.common;

const ParamInfoAbtest = React.createClass({
  mixins: [fetchData],
  getInitialState() {
    const siteId = this.props.getStoreState().addData.siteId;
    return {
      loading: false,
      visible: false,
      siteId,
      paramsList: [],
    };
  },

  _resetParams() {
    this.setState({
      loading: true,
      paramsList: [],
    });
  },

	// 获取初始数据列表
  _fetchUpDataParams(siteId) {
    ajax({
      url: '/tag/param/QueryParam.do',
      data: { paramQuery: JSON.stringify({ pageSize: 50, siteId }) },
      method: 'get',
    }).then(resp => {
      console.log(resp);
      this.setState({
        loading: true,
        siteId,
        paramsList: resp.data,
      });
    });
  },

  _headleSelectAbtest(checkedValues) {
    this.props.getCheckboxValueAbtest(checkedValues);
  },

  componentWillReceiveProps(nextProps) {
    console.log(nextProps.siteId, this.props.getStoreState().siteId);
		// if (nextProps.editorSate) {
    this._fetchUpDataParams(nextProps.siteId);
		// }
  },

  render() {
    const paramsData = [];
    const paramsList = this.state.paramsList;
    if (paramsList.length == 0) {
      return false;
    }
    paramsList.map(item => {
      const temp = {};
      temp.label = item.paramName;
      temp.value = item.id;
      paramsData.push(item.id);
    });
    return (<div className="params-list-box">
			<CheckboxGroup options={paramsData} onChange={this._headleSelectAbtest.bind(this)}
  value={this.props.defaultValue}
   />
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
})(ParamInfoAbtest);
