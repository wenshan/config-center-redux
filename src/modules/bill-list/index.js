/*eslint-disable*/
import { createContainer, createRootContainer } from 'Roof';
import { Form, Input, Row, Col, Button, Select, InputNumber } from 'antd';
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Header from '../../components/index/header/Header.js'
import SelectTool from '../components/select-tool/index.js'
/*eslint-enable*/

class Bill extends Component {

  render () {

    return (
      <div class="content-page">
        <Row>
          <Col>
            <SelectTool/>
          </Col>
          <Col>

          </Col>
        </Row>
      </div>
    )
  }
}

function mapStateToProps (/* state */) {
  return {}
}

export default connect(mapStateToProps)(Bill)
