/*eslint-disable*/
import React from 'react'
import { Route } from 'react-router'
import Index from '../components/index/Index'
import * as modulesApp from '../modules/index'
/*eslint-enable*/

const {
  Counter, Test
} = modulesApp

export default (
  <Route component={Index}>
    <Route path="/" component={Counter} />
    <Route path="test" component={Test} />
  </Route>
)
