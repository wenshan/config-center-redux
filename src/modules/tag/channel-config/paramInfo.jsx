import { createContainer } from 'Roof';
import { Table, Form, Input, Row, Col, Button, Select, InputNumber, Checkbox } from 'antd';
import fetchData from './fetchData.js';
import Utils from '../../../utils/index';
import React from 'react';
const CheckboxGroup = Checkbox.Group;
const ajax = Utils.ajax,
  commonUtils = Utils.common;

const ParamInfo = React.createClass({
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

  _headleSelect(checkedValues) {
    this.props.getCheckboxValue(checkedValues);
  },

  componentWillReceiveProps(nextProps) {
    console.log(nextProps.siteId, this.props.getStoreState().siteId);
    this.setState({
      siteId: nextProps.siteId,
    });
  },

  componentDidMount() {
    this._fetchUpDataParams();
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
			<CheckboxGroup options={paramsData} onChange={this._headleSelect.bind(this)}
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
})(ParamInfo);
