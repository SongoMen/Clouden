import React, { Component } from 'react'
import { Route, BrowserRouter, Redirect, Switch } from 'react-router-dom'
import {firebaseAuth} from '../helpers/auth'

import Login from '../LoginPage/Login'
import Register from '../RegisterPage/Register'
import Main from '../containers/Main'
import Dashboard from '../PanelPage/Dashboard/Dashboard'
import forgotPassword from './forgotPassword'
import ErrorPage from './ErrorPage'
import '../helpers/scripts'

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
    return this.state.loading === true ? 
    <div className="loader loader--style3" title="2">
      <svg version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
        width="60px" height="60px" viewBox="0 0 50 50" xmlSpace="preserve">
      <path fill="#dc323c" d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z">
        <animateTransform attributeType="xml"
          attributeName="transform"
          type="rotate"
          from="0 25 25"
          to="360 25 25"
          dur="0.6s"
          repeatCount="indefinite"/>
        </path>
      </svg>
    </div> : (
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
