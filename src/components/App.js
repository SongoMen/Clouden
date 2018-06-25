import React, { Component } from 'react'
import { Route, BrowserRouter, Redirect, Switch } from 'react-router-dom'
import {firebaseAuth} from '../helpers/auth'

import Login from '../LoginPage/Login'
import Register from '../RegisterPage/Register'
import Main from '../containers/Main'
import Dashboard from '../PanelPage/Dashboard/Dashboard'
import forgotPassword from './forgotPassword'
import ErrorPage from './ErrorPage'

function PrivateRoute ({component: Component, authed, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authed === true
        ? <Component {...props} />
        : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
    />
  )
}

function PublicRoute ({component: Component, authed, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authed === false
        ? <Component {...props} />
        : <Redirect to='/Dashboard' />}
    />
  )
}

export default class App extends Component {
  state = {
    authed: false,
    loading: true,
  }
  componentDidMount () {
    this.removeListener = firebaseAuth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authed: true,
          loading: false,
        })
      } else {
        this.setState({
          authed: false,
          loading: false
        })
      }
    })
  }
  componentWillUnmount () {
    this.removeListener()
  }
  render() {
    return this.state.loading === true ? <h1>Loading</h1> : (
      <BrowserRouter>
          <div className="container">
              <Switch>
                <Route path='/' exact component={Main} />
                <Route path='/forgotPassword' exact component={forgotPassword} />
                <PublicRoute authed={this.state.authed} path='/login' component={Login} />
                <PublicRoute authed={this.state.authed} path='/register' component={Register} />
                <PrivateRoute authed={this.state.authed} path='/Dashboard' component={Dashboard} />
                <PrivateRoute authed={this.state.authed} path='/Cloud' component={Dashboard} />
                <Route component={ErrorPage} />
              </Switch>
          </div>
      </BrowserRouter>
    );
  }
}
