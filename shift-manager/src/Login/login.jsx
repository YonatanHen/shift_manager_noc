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
     * Function handles the submittion of the data which typed in form inputs.
     */
    const handleSubmit = () => {
        alert(`send username ${username} and ${password} with axios`)
    }

    return (
        <>
        <Container>
            <div className='login-title'>Login</div>
            <Form onSubmit={() => {handleSubmit()}}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Username</Form.Label>
                    <Form.Control className='login-inputs' placeholder="Enter Username" onChange={e => setUsername(e.target.value)}/>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control className='login-inputs' type="password" placeholder="Enter Password" onChange={e => setPassword(e.target.value)}/>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Container>
        </>

    )

}