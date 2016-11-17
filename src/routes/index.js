import React from 'react'
import { Route } from 'react-router'
import Index from '../components/Index/index'
import * as modulesApp from '../modules/index'

const {
  Counter, Bill
} = modulesApp

export default (
  <Route component={Index}>
    <Route path="/" component={Counter} />
    <Route path="billlist" component={Bill} />
  </Route>
)
