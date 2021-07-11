import React from 'react';
import { Redirect } from 'react-router-dom';
import { useOktaAuth } from '@okta/okta-react';
import Protected from './Protected'
import home from '../views/home'
import SignInForm from './SignInForm';
import OktaSignInWidget from './OktaSignInWidget';

 


const SignIn = ({ config }) => {
  const onSuccess = (tokens) => {
    oktaAuth.handleLoginRedirect(tokens);
  };

  const onError = (err) => {
    console.log('error logging in', err);
  }
  const { authState } = useOktaAuth();
  const { oktaAuth } = useOktaAuth();

  
  return authState.isAuthenticated ?
  <Redirect to={Protected}/> :
  <OktaSignInWidget
      config={config}
      onSuccess={onSuccess}
      onError={onError}/>;
  
};

export default SignIn;
