import React, { useState } from 'react'
import '../css/login.css'
import { Form, Button, Container } from 'react-bootstrap'

/**
 * Login function component
 * @returns Login page content
 */
export default function Login(){
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    /**
     * Function handles the sending of the entered data in form inputs, then fetch the respond from server
     */
    const handleSubmit = () => {
        alert(`send username ${username} and ${password} with axios`)
    }

    return (
        <>
        <Container>
            <div className='login-title'>Login</div>
            <Form onSubmit={() => {handleSubmit()}} className='login-form'>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Username:</Form.Label>
                    <Form.Control className='login-inputs' placeholder="Enter Username" onChange={e => setUsername(e.target.value)}/>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control className='login-inputs' type="password" placeholder="Enter Password" onChange={e => setPassword(e.target.value)}/>
                </Form.Group>
                <Button variant="primary" type="submit" className='login-form-submit-btn'>
                    Submit
                </Button>
            </Form>
        </Container>
        </>

    )

}