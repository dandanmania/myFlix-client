import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import './registration-view.scss'
import { Card } from 'react-bootstrap';
import axios from 'axios';

export function RegistrationView(props) {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ birthday, setBirthday ] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('https://dandan-myflix.herokuapp.com/users/', {
            Username: username,
            Password: password,
            Email: email,
            Birthday: birthday
        })
        .then(response => {
            const data = response.data;
            console.log(data);
            window.open('/', '_self');
        })
        .catch(e => {
            console.log('Error registering the user')
        })
    }

    return (
        <Card className="m-5">
            <Card.Title className="m-3 pl-1">Register</Card.Title>
            <Card.Body>
                <Form>
                    <Form.Group controlId="formUsername">
                        <Form.Label>Username:</Form.Label>
                        <Form.Control type="text" placeholder="Enter Username" onChange={e => setUsername(e.target.value)} />
                     </Form.Group>

                    <Form.Group className="mt-2" controlId="formPassword">
                        <Form.Label>Password:</Form.Label>
                        <Form.Control type="password" placeholder="Enter Password" onChange={e => setPassword(e.target.value)} />
                    </Form.Group>
            
                    <Form.Group className="mt-2" controlId="formEmail">
                        <Form.Label>Email:</Form.Label>
                        <Form.Control type="email" placeholder="Enter Email" onChange={e => setEmail(e.target.value)} />    
                    </Form.Group>

                    <Form.Group className="mt-2" controlId="formBirthday">
                        <Form.Label>Birthday:</Form.Label>
                        <Form.Control type="date" onChange={e => setBirthday(e.target.value)} />    
                    </Form.Group>
                    <Button className="mt-4" variant="secondary" type="submit" onClick={handleSubmit}>Submit</Button>
                    <Button className="mt-4" variant="link">Already Registered?</Button>
                </Form>
            </Card.Body>
        </Card>
    );
}

RegistrationView.propTypes = {
    user: PropTypes.shape({
        username: PropTypes.string.isRequired,
        password: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        birthday: PropTypes.any.isRequired
    }),
    onRegister: PropTypes.func.isRequired
}