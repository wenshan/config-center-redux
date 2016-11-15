import { createContainer, createRootContainer } from 'Roof';
import React from 'react';
import { Row, Col, Button, Modal } from 'antd';
import Table from './Table';
import NewPage from './newPage';

const PAGE_SIZE = 20;
require('./index.css');

const App = React.createClass({
  getInitialState() {
    return {
      isAddNewPage: false,
      renderCount: 1,
    };
  },
  triggerPageState(flage) {
    this.setState({
      isAddNewPage: flage,
    });
  },
  _forceRender() {
    let { renderCount } = this.state;
    this.setState({
      renderCount: ++renderCount,
    });
  },
  render() {
    let { isAddNewPage, renderCount } = this.state;
    const newPage = null;

    return (
            <div>
                <Modal title="新增页面" visible={isAddNewPage} onCancel={this.triggerPageState.bind(this, false)} footer={null}>
                    <NewPage close={this.triggerPageState.bind(this, false)} fetch={this._forceRender.bind(this)} />
                </Modal>
                <div className="row">
                </div>
                <Row type="flex" justify="end">
                    <Col span={2} className="margin-button-10"><Button type="primary" size="large" onClick={this.triggerPageState.bind(this, true)}>新增页面</Button></Col>
                </Row>
                <div className="row">
                </div>
                <div className="row">
                    <Table renderCount={renderCount} />
                </div>
            </div>
        );
  },
});

export default createRootContainer({
  queryParam: { limit: PAGE_SIZE, start: 0 }, // 查询条件
  tableData: [], // 列表数据
  tablePagination: { pageSize: PAGE_SIZE }, //
  tableLoading: false, // 是否正在加载数据
  accessDeny: {// 权限拦截数据
    tableData: false,
  },
})(App);
