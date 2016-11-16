/*eslint-disable*/
import React from 'react'
import { Route } from 'react-router'
import Index from '../components/index/Index'
import * as modulesApp from '../modules/index'
/*eslint-enable*/

const {
  Counter, Bill
} = modulesApp

export default (
  <Route component={Index}>
    <Route path="/" component={Counter} />
    <Route path="billlist" component={Bill} />
  </Route>
)
