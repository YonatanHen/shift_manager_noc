import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";

import AppWithRouterAccess from './AppWithRouterAccess';
import { connect } from "react-redux";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "bootstrap/dist/css/bootstrap.css";
import { getUsers } from "./actions/index";
function App(props) {
  
  const onUnload = (e) => {
    e.returnValue = 'Are you sure you want to leave?';
  };
  useEffect(() => {
    window.addEventListener('beforeunload', onUnload);
  })

  return(
  <Router>
    <AppWithRouterAccess/>
  </Router>
  )
}
const mapStatetoProps = (state) => {
  return {
    User: state.User,
  };
};

const mapDispatchToProps = {
  getUsers,
};

export default connect(mapStatetoProps, mapDispatchToProps)(App);
