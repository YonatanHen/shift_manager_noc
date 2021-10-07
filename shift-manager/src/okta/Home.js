import React from 'react';
import {connect } from 'react-redux'
import { Link, useHistory } from 'react-router-dom';
import { useOktaAuth } from '@okta/okta-react';
import {setUser} from '../actions/index'
const Home = (props) => {
  const { authState, oktaAuth, authService } = useOktaAuth();
  const history = useHistory();


  if(!authState.isAuthenticated) {
    history.push('/login')
  }
  if (authState.isPending) {
    return <div>Loading, Please reload...</div>;
  }
  if(authState.isAuthenticated) {
    history.push('/protected');
    oktaAuth.getUser().then(info => {
      console.log(info);
      props.setUser(info);
      sessionStorage.setItem('email',info.email)
      localStorage.setItem('name',info.name)
    });
  }
  const button = authState.isAuthenticated ?
    <button onClick={() => {oktaAuth.signOut()}}>Logout</button> :
    <button onClick={() => {history.push('/login')}}>Login</button>;

  return (
    <div>
      <Link to='/'>Home</Link><br/>
      <Link to='/protected'>Protected</Link><br/>
      {button}
    </div>
  );
};
const mapStatetoProps = (state) => {
  return {
  }
}
const mapDispatchToProps = {
      setUser
}

export default connect(mapStatetoProps,mapDispatchToProps)(Home)