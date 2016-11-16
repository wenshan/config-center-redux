import { connect } from 'react-redux'
import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import Header from './header/Header.js'
import HeaderHorizontal from './header/HeaderHorizontal.js'

class Index extends Component {

  static propTypes = {
    children: PropTypes.any.isRequired
  }

  render () {
    return (
      <div>
      <h2>Bill-List</h2>
      <Link to='/billlist'>Bill-List</Link>
          {/* this will render the child routes */}
          {React.cloneElement(this.props.children, this.props)}
      </div>
    )
  }
}


function mapStateToProps (/* state */) {
  return {}
}

export default connect(mapStateToProps)(Index)
