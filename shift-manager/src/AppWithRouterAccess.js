import React from 'react';
import { Route, useHistory } from 'react-router-dom';
import { Security, SecureRoute, LoginCallback } from '@okta/okta-react';
import { OktaAuth } from '@okta/okta-auth-js';
import {connect } from 'react-redux'
import Home from './okta/Home'
import Calendar from './views/calendar'
import Reports from './views/reports'
import CreateReport from './views/createReport'
import SignIn from './okta/SignIn';
import Protected from './okta/Protected';
import SignInForm from './okta/SignInForm';
import OktaSignInWidget from './okta/OktaSignInWidget';
import Login from './okta/Login';

const AppWithRouterAccess = (props) => {
  const history = useHistory();
  const onAuthRequired = () => {
    history.push('/login');
  };



  const oktaAuth = new OktaAuth({
    issuer: 'https://accessfintechinternal.okta.com',
    clientId: '0oa3d0luqaLV74zPj4x7',
    redirectUri: window.location.origin + '/login/callback',
    onAuthRequired: onAuthRequired,
    pkce: false
  });

  return (
    <Security oktaAuth={oktaAuth}>
      <Route path='/' exact={true} component={Home} />
      <Route path='/changes/:id' render={props => <Home {...props} />} />
      <SecureRoute path='/protected' component={Protected} />
      <Route path='/login' render={() => <Login />} />
      <Route path='/login/callback' component={LoginCallback} />
    </Security>
  );
};
const mapStatetoProps = (state) => {
  return {
   
  };
};
const mapDispatchToProps = {
  
};

export default connect(mapStatetoProps,mapDispatchToProps)(AppWithRouterAccess);