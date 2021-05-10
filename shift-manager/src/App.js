import React,{useEffect} from 'react';
import './App.css';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'
import Login from './views/login'
import Home from './views/home'
import {connect } from 'react-redux'
import 'primereact/resources/themes/saga-blue/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'

import {getUsers} from './actions/index'
function App(props) {

            useEffect(() => {
                props.getUsers()
            
            }, [])
if(!props.User) {
  return <Router><Login /></Router>
} 
else {
  return <Router>
           <Home />
    </Router>
     }
}
const mapStatetoProps = (state) => {
  return {
    User: state.User
  }
}
const mapDispatchToProps = {
  getUsers
}

export default  connect(mapStatetoProps,mapDispatchToProps)(App);
