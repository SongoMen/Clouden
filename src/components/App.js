import React, { Component } from 'react'
import { Route, BrowserRouter, Redirect, Switch } from 'react-router-dom'
import Login from '../LoginPage/Login'
import Register from '../RegisterPage/Register'
import Main from '../containers/Main'
import Panel from './Panel'
import forgotPassword from './forgotPassword'
import {firebaseAuth } from '../helpers/auth'

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
        : <Redirect to='/Panel' />}
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
        <div>

          <div className="container">
              <Switch>
                <Route path='/' exact component={Main} />
                <Route path='/forgotPassword' exact component={forgotPassword} />
                <PublicRoute authed={this.state.authed} path='/login' component={Login} />
                <PublicRoute authed={this.state.authed} path='/register' component={Register} />
                <PrivateRoute authed={this.state.authed} path='/Panel' component={Panel} />
                <Route render={() => <h3>No Match</h3>} />
              </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}
