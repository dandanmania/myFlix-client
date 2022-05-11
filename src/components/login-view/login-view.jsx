import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

import './login-view.scss'
import { Card } from 'react-bootstrap';

export function LoginView(props) {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('https://dandan-myflix.herokuapp.com/login', {
            Username: username,
            Password: password
        })
        .then(response => {
            const data = response.data;
            props.onLogIn(data);
        })
        .catch(e => {
            console.log('No such user.')
        })
    }

    return (
        <Card className="mt-5">
            <Card.Title className="m-3 pl-1">Login</Card.Title>
            <Card.Body>
                <Form>
                    <Form.Group className="mt-2" controlId="formUsername">
                        <Form.Label>Username:</Form.Label>
                        <Form.Control type="text" placeholder="Enter Username" onChange={e => setUsername(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mt-2" controlId="formPassword">
                        <Form.Label>Password:</Form.Label>
                        <Form.Control type="password" placeholder="Enter Password" onChange={e => setPassword(e.target.value)} />
                    </Form.Group>
            
                    <Button className="mt-4" variant="secondary" type="submit" onClick={handleSubmit}>Log In</Button>
                    <Button className="mt-4" variant="link">Need to Register?</Button>
                </Form>
            </Card.Body>
        </Card>
    );
}

LoginView.propTypes = {
    user: PropTypes.shape({
        username: PropTypes.string.isRequired,
        password: PropTypes.string.isRequired
    }),
    onLogIn: PropTypes.func.isRequired
}