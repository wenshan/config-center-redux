import React from 'react';
import { Modal, Row, Col, Input, Button } from 'antd';
import NewPageService from './newPage.service.js';

class NewPage extends React.Component {
  constructor(opt) {
    super(opt);
    this.state = {
      pageName: undefined,
      url: undefined,
      mods: undefined,
      algor: undefined,
      spm: undefined,
      isPageNameOk: true,
      isUrlOk: true,
    };
  }
  handleInputChangeEvent(type, event) {
    let { isPageNameOk, isUrlOk } = this.state;
    const value = event.target.value;
    isPageNameOk = (type == 'pageName' && value.length > 0) || (type !== 'pageName' && isPageNameOk) ? true : false;
    isUrlOk = (type == 'url' && value.length > 0) || (type !== 'url' && isUrlOk) ? true : false;
    this.setState({
      [type]: value,
      isPageNameOk,
      isUrlOk,
    });
  }

  _renderPageNameStatus() {
    const { isPageNameOk } = this.state;
    if (!isPageNameOk) {
      return (<Row type="flex" justify="center" align="middle" className="margin-top-15px">
                <Col span={4}><label></label></Col>
                <Col span={12} className="error-message">页面名称不合法</Col>
              </Row>);
    }
    return null;
  }
  _renderUrlStatus() {
    const { isUrlOk } = this.state;
    if (!isUrlOk) {
      return (<Row type="flex" justify="center" align="middle" className="margin-top-15px  margin-bottom-15px">
                <Col span={4}><label></label></Col>
                <Col span={12} className="error-message">url不合法</Col>
              </Row>);
    }
    return null;
  }
  render() {
    const { close } = this.props;
    const query = '${query}';
    const cid = '${cid}';
    return (
      <div>
          <Row type="flex" justify="center" align="middle" className="margin-bottom-20">
            <Col span={4}><label htmlFor="page-name" className="ant-form-item-required-fix">页面名称: </label></Col>
            <Col span={12}><Input onChange={this.handleInputChangeEvent.bind(this, 'pageName')} placeholder="请填写页面名称" name="page-name" id="page-name" /></Col>
          </Row>
          {this._renderPageNameStatus()}
          <Row type="flex" justify="center" align="middle" className="margin-bottom-20">
            <Col span={4}><label htmlFor="url-name" className="ant-form-item-required-fix">URL: </label></Col>
            <Col span={12}><Input onChange={this.handleInputChangeEvent.bind(this, 'url')} placeholder="请填写URL" name="page-url" id="page-url" /></Col>
          </Row>
          {this._renderUrlStatus()}
          <Row type="flex" justify="center" align="middle" className="margin-top-15px">
                <Col span={4}><label></label></Col>
                <Col span={12} className="help-message">URL支持以下宏变量：{query} 、{cid}</Col>
          </Row>
          <Row type="flex" justify="center" align="middle" className="margin-bottom-20">
            <Col span={4}><label htmlFor="page-modules">页面内模块: </label></Col>
            <Col span={12}><Input onChange={this.handleInputChangeEvent.bind(this, 'mods')} type="textarea" placeholder="请填写页面内模块" name="page-modules" id="page-modules" /></Col>
          </Row>
          <Row type="flex" justify="center" align="middle" className="margin-bottom-20">
            <Col span={4}><label htmlFor="page-alg">推荐算法: </label></Col>
            <Col span={12}><Input onChange={this.handleInputChangeEvent.bind(this, 'algor')} placeholder="请填写推荐算法" name="page-alg" id="page-alg" /></Col>
          </Row>
          <Row type="flex" justify="center" align="middle" className="margin-bottom-20">
            <Col span={4}><label htmlFor="page-spm">SPM打点: </label></Col>
            <Col span={12}><Input onChange={this.handleInputChangeEvent.bind(this, 'spm')} placeholder="请填写spm打点" name="page-spm" id="page-spm" /></Col>
          </Row>
          <Row type="flex" justify="end" align="middle" className="margin-bottom-20">
            <Col span={4} className="margin-right-60"><Button type="primary" onClick={this.submit.bind(this)}>提交</Button></Col>
          </Row>
      </div>);
  }
  submit() {
    let { pageName, url, mods, algor, spm } = this.state;
    const self = this;
    if (!pageName || pageName.length === 0) {
      this.setState({
        isPageNameOk: false,
      });
      return;
    }
    if (!url || url.length === 0) {
      this.setState({
        isUrlOk: false,
      });
      return;
    }
    Promise.all([NewPageService.validatePageName(pageName), NewPageService.validatePageUrl(url)]).then(results => {
      const pageNameResult = results[0];
      const pageUrlResult = results[1];
      const pageNameResultData = pageNameResult.data;
      const pageUrlResultData = pageUrlResult.data;
      if (!pageNameResultData) {
        this.setState({
          isPageNameOk: false,
        });
        return;
      } else if (!pageUrlResultData) {
        this.setState({
          isUrlOk: false,
        });
        return;
      } else {
        NewPageService.addPage({ name: pageName, url, modules: mods, algorithm: algor, spm }).then(result => {
          self.props.fetch();
          self.props.close();
        });
      }
    });
  }
}
export default NewPage;
