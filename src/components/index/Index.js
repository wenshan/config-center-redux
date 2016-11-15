import { connect } from 'react-redux'
import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
//import Header from './header/Header.jsx'
//import HeaderHorizontal from './header/HeaderHorizontal.jsx'

class Index extends Component {

  static propTypes = {
    children: PropTypes.any.isRequired
  }

  render () {
    return (
      <div><h2>1111</h2>
<Link to='/test'>test</Link>
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
