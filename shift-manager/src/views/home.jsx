import React, { useState } from 'react'
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'
import axios from 'axios'
import {connect } from 'react-redux'
import { useHistory } from "react-router-dom";
import {setUser} from '../actions/index'
import  {Calendar} from './calendar'
import Users  from './users'
import {CreateReport} from './createReport'
import {Reports} from './reports'
import { Form, Button, Container } from 'react-bootstrap'
 function Home(props){

    const history = useHistory()
    var calendarClick = () => {
        history.push('/calendar')
    }
    var reportsClick = () => {
        history.push('/reports')
    }
    var createReportClick = () => {
        history.push('/createreport')
    }
    var usersClick = () => {
        history.push('/users')
    }

   
return (
    <div className="">
        <div className="fixed w-1/12 bg-gray-400 left-0 h-full text-center">
            <div className="font-light text-5xl mt-8">NOC</div>
            <ul className="space-y-2 p-2 mt-12">
                <li><Button className="btn btn-light" onClick={calendarClick}>Shifts</Button></li>
                <li><Button className="btn btn-light" onClick={reportsClick}>Reports</Button></li>
                <li><Button className="btn btn-light" onClick={createReportClick}>Create Report</Button></li>
                <li><Button className="btn btn-light" onClick={usersClick}>Users</Button></li>
            </ul>

        </div>
        <div className="ml-40 h-full w-11/12">
               
                    <div className="p-4">
                    <Switch>
                                        <Route path="/calendar">
                                                    <Calendar />
                                        </Route>
                                        <Route path="/reports">
                                                    <Reports />
                                        </Route>
                                        <Route path="/createreport">
                                                    <CreateReport />
                                        </Route>
                                        <Route path="/users">
                                                    <Users />
                                        </Route>
                      </Switch>
                    </div>
                  
        </div>

    </div>
)
 

}
const mapStatetoProps = (state) => {
    return {
        User: state.User
    }
  }
  const mapDispatchToProps = {
      setUser
  }
  
  export default  connect(mapStatetoProps,mapDispatchToProps)(Home);