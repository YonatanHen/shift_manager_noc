import React from 'react';
import './App.css';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'
import Login from './Login/login'
import Redux from './redux'
import 'bootstrap/dist/css/bootstrap.css'

function App() {
  return (
    <>
    {/* Implementation of the Recat router dom package*/}
      <Router>
        <div>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/redux">
            <Redux />
          </Route>
          </Switch>
        </div>
        {/* Links is here temporarily */}
        <Link to='/login'>Login!</Link>
        <Link to='/redux'>Redux!</Link>
      </Router>
    </>
  );
}

export default App;
