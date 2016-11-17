import './index.css'
import '../common/lib.js'
import React from 'react'
import ReactDOM from 'react-dom'
import Root from '../components/Root/index'
import createBrowserHistory from 'history/lib/createBrowserHistory'


const history = createBrowserHistory()

ReactDOM.render(
  <Root history={history} />,
  document.getElementById('react-content')
)
