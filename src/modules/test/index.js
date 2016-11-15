/*eslint-disable*/
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
/*eslint-enable*/

class test extends Component {

  render () {

    return (
      <h1>1234567890qweqwe33333334545</h1>
    )
  }
}

function mapStateToProps (/* state */) {
  return {}
}

export default connect(mapStateToProps)(test)
