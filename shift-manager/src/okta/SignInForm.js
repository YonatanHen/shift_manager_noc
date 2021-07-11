import React, { useState,useEffect, useLayoutEffect } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import {Card} from 'primereact/card'
import { InputText } from 'primereact/inputtext';
import { ProgressSpinner } from 'primereact/progressspinner';
const SignInForm = () => {
  const { oktaAuth } = useOktaAuth();
  const [sessionToken, setSessionToken] = useState();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [Loader,setLoader] = useState(false)
  const [failed,setFailed] = useState('')
  var LoaderElement = () => {
    useEffect(() => {
      
    },[])
    if(Loader) {
     return (<React.Fragment><ProgressSpinner style={{width: '50px', height: '50px'}} strokeWidth="8" fill="#EEEEEE" animationDuration=".5s"/></React.Fragment>)
    } else return(<React.Fragment></React.Fragment>)
  }
  var FailMsg = () => {
    if(failed.length > 0) {
      return (<React.Fragment><div className="bg-red-300 text-left p-4 rounded">{failed}</div></React.Fragment>)
    } else {
      return <React.Fragment></React.Fragment>
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoader(true)
    oktaAuth.signInWithRedirect({ username, password })
    .then(res => {
      setLoader(false)
      const sessionToken = res.sessionToken;
      
      setSessionToken(res.sessionToken);
      // sessionToken is a one-use token, so make sure this is only called once
      oktaAuth.signIn({ sessionToken });
    })
    .catch(err => {console.log('Found an error', err); setLoader(false); setFailed(err.toString())});
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  if (sessionToken) {
    // Hide form while sessionToken is converted into id/access tokens
    return null;
  }

  return (
    <div className="w-full h-screen flex"> 
      {/* <Card className="w-2/5 m-auto h-2/5">
              <form onSubmit={handleSubmit} className="space-y-4 text-center">
                <label className="block space-y-4">
                 <div className="block"> Username</div>
                 <div className="block">
                  <InputText
                    id="username" type="text"
                    value={username}
                    onChange={handleUsernameChange} />
                    </div>
                </label>
                <label className="block space-y-4">
                <div className="block"> Password</div>
                <div className="block">
                  <InputText
                    id="password" type="password"
                    value={password}
                    onChange={handlePasswordChange} />
                    </div>
                </label>
                <div className="block">
                      <input className="focus:outline-none outline-none h-12 w-48 hover:bg-blue-100" id="submit" type="submit" value="Submit" />
                </div>
                <LoaderElement />
                <FailMsg />
              </form>
      </Card> */}
    </div>
  );
};
export default SignInForm;