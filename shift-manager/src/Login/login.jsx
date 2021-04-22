import React, { useState } from 'react'
import '../css/login.css'
import { Form, Button, Container } from 'react-bootstrap'

export default function Login(){
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    return (
        <>
        <Container>
            <div className='login-title'>Login</div>
            <Form>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Username</Form.Label>
                    <Form.Control className='login-inputs' placeholder="Enter Username" />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control className='login-inputs' type="password" placeholder="Enter Password" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Container>
        </>

    )

}