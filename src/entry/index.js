/*eslint-disable*/
import React from 'react'
import ReactDOM from 'react-dom'
import Root from '../components/index/Root'
import createBrowserHistory from 'history/lib/createBrowserHistory'
import '../common/lib.js'
import './index.less'
/*eslint-enable*/

const history = createBrowserHistory()

ReactDOM.render(
  <Root history={history} />,
  document.getElementById('react-content')
)
