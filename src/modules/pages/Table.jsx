import { createContainer } from 'Roof';
import { Table, Modal } from 'antd';
import React from 'react';

import Utils from '../../utils/index';
import Auth from '../../components/authorize/Auth';
const ajax = Utils.ajax,
  commonUtils = Utils.common;

import fetchData from './fetchData.js';

const GroupTable = React.createClass({
  mixins: [fetchData],
  getInitialState() {
    return {
      sorterField: undefined,
      sorterOrder: undefined,
    };
  },
  componentDidMount() {
    this.fetchTableData();
  },
  componentWillReceiveProps(props) {
    const oldRenderCount = this.props.renderCount;
    const newRenderCount = props.renderCount;
    if (oldRenderCount !== newRenderCount) {
      this.fetchTableData();
    }
  },
  getColumns() {
    const columns = [
      {
        title: '序号',
        dataIndex: 'id',
      }, {
        title: '页面名称',
        dataIndex: 'name',
      }, {
        title: '创建时间',
        dataIndex: 'gmtCreate',
      }, {
        title: 'URL',
        dataIndex: 'url',
      }, {
        title: '关联推荐算法',
        dataIndex: 'recommendDesc',
      }, {
        title: '页面内模块',
        dataIndex: 'moduleDesc',
      }, {
        title: '页面PID',
        dataIndex: 'spm',
      },
    ];
    return columns;
  },
  handleTableChange(pagination, filters, sorter) {
    let pagingParam = {},
      sortParam = {};
    if (sorter.field !== this.state.sorterField || sorter.order !== this.state.sorterOrder) {
      this.state.sorterField = sorter.field;
      this.state.sorterOrder = sorter.order;
      sortParam.orderBy = sorter.field || '';
      sortParam.order = sorter.order || '';

      switch (sortParam.order) {
        case 'descend':
          sortParam.order = 'DESC';
          break;
        case 'ascend':
          sortParam.order = 'ASC';
          break;
      }
            // reset pagination
      pagingParam.start = 0;
      pagingParam.limit = pagination.pageSize;
    } else {
      pagingParam.start = pagination.pageSize * (pagination.current - 1),
                pagingParam.limit = pagination.pageSize;
    }
    this.props.setStoreState({
      queryParam: commonUtils.merge(this.props.queryParam, pagingParam, sortParam),
    });
    this.fetchTableData();
  },
  render() {
    return (
            <Auth denyUrl={this.props.accessDeny.tableData}>
                <Table onChange={this.handleTableChange}
                  columns={this.getColumns()}
                  dataSource={this.props.tableData}
                  pagination={this.props.tablePagination}
                  loading={this.props.tableLoading}
                />
            </Auth>);
  },
});

export default createContainer({
  queryParam: 'queryParam',
  tableData: 'tableData',
  tableLoading: 'tableLoading',
  tablePagination: 'tablePagination',
  accessDeny: 'accessDeny',
})(GroupTable);
