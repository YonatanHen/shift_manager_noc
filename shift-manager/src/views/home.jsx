import React, { useState } from 'react'
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'
import axios from 'axios'
import {connect } from 'react-redux'
import { useHistory } from "react-router-dom";
import {setUser} from '../actions/index'
import  {Calendar} from './calendar'
import { Skeleton } from 'primereact/skeleton';
import Users  from './users'
import {CreateReport} from './createReport'
import {Reports} from './reports'
import { Form, Button, Container } from 'react-bootstrap'
 function Home(props) {
    const [comp,setComp] = useState('')
    const history = useHistory()
    var calendarClick = () => {
        setComp('Shifts')
    }
    var reportsClick = () => {
        setComp('Reports')
    }
    var createReportClick = () => {
        setComp('CreateReport')
    }
    var usersClick = () => {
        setComp('Users')
    }

   const CompRender = () => {
       switch(comp) {
           case 'Shifts': return <Calendar />
           case 'Reports': return <Reports />
           case 'CreateReport': return <CreateReport />
           case 'Users': return <Users />
           default: return <div><Calendar></Calendar></div>
       }
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
                    
                        <CompRender />
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