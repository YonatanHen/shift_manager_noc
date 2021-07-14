import React from 'react';
import { Redirect } from 'react-router-dom';
import {setUser} from '../actions/index'
import { useOktaAuth } from '@okta/okta-react';
import Protected from './Protected';
import {connect } from 'react-redux'
const SignIn = (props) => {
  const { oktaAuth } = useOktaAuth();
  const { authState } = useOktaAuth();

  if (authState.isPending) {
    return <div>Loading...</div>;
  }
  if(authState.isAuthenticated) {
    oktaAuth.getUser().then(info => {
      console.log(info);
      props.setUser(info);
      sessionStorage.setItem('email',info.email)
      sessionStorage.setItem('name',info.name)
    });
  }
  return authState.isAuthenticated ?
     <Redirect to={Protected}/> :
     oktaAuth.signInWithRedirect()
};
const mapStatetoProps = (state) => {
  return {
  }
}
const mapDispatchToProps = {
      setUser
}
export default connect(mapStatetoProps,mapDispatchToProps)(SignIn)
 
 
 