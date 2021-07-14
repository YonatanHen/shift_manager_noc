import React from 'react';
import {connect } from 'react-redux'
import { Route, useHistory } from 'react-router-dom';
import {} from './actions/index'
import { Security, SecureRoute, LoginCallback } from '@okta/okta-react';
import { OktaAuth } from '@okta/okta-auth-js';
 import Home from './okta/Home';
 import SignIn from './okta/SignIn';
 import Protected from './okta/Protected';


const AppWithRouterAccess = (props) => {
  const history = useHistory();
  const onAuthRequired = () => {
    history.push('/login');
  };


  
   
    


  const oktaAuth = new OktaAuth({
    issuer: 'https://accessfintechinternal.okta.com',
    clientId: '0oa3rf7k1vkGwQ8or4x7',
    redirectUri: window.location.origin + '/login/callback',
    onAuthRequired: onAuthRequired,
    pkce: true
  });

  return (
    <Security oktaAuth={oktaAuth}>
      <Route path='/' exact={true} component={Home} />
      <Route path='/changes/:id' render={props => <Home {...props} />} />
      <SecureRoute path='/protected' component={Protected} />
      <Route path='/login' render={() => <SignIn />} />
      <Route path='/login/callback' component={LoginCallback} />
    </Security>
  );
};



const mapStatetoProps = (state) => {
  return {

  }
}
const mapDispatchToProps = {
  
}

export default connect(mapStatetoProps,mapDispatchToProps)(AppWithRouterAccess)