import React, { useState } from 'react'
import '../css/login.css'
import { Form, Button, Container } from 'react-bootstrap'
import axios from 'axios'
import { useHistory } from "react-router-dom";
import {setUser} from '../actions/index'
import {connect } from 'react-redux'
/**
 * Login function component
 * @returns Login page content
 */
function Login(props){
    const BACKEND_IP = process.env.REACT_APP_BACKEND_IP
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    let history = useHistory()
    /**
     * Function handles the sending of the entered data in form inputs, then fetch the respond from server
     */
    const handleSubmit = (event) => {
        event.preventDefault()
        axios.post('/login', {
            username,
            password
        })
        .then((response) => {
            props.setUser(response.data)
            
        })
        .catch(error => console.log(error))
    }

    return (
        <>
        <div className="h-full w-full bg-grey-200 absolute">
            <div className="rounded mr-auto ml-auto mt-40 w-1/6 h-2/5 " >
            <div className="w-40 login-title">Login</div>
            
            <Form onSubmit={handleSubmit} className='login-form '>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Username</Form.Label>
                    <Form.Control className='w-auto relative' placeholder="Enter Username" onChange={e => setUsername(e.target.value)}/>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control className='login-inputs' type="password" placeholder="Enter Password" onChange={e => setPassword(e.target.value)}/>
                </Form.Group>
                <Button variant="primary" type="submit" className='login-form-submit-btn'>
                    Submit
                </Button>
            </Form>
            </div>
        </div>
        </>

    )

}
const mapStatetoProps = (state) => {
    return {
  
    }
  }
  const mapDispatchToProps = {
      setUser
  }
  
  export default  connect(mapStatetoProps,mapDispatchToProps)(Login);