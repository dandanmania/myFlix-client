import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import {Button} from 'react-bootstrap';
import axios from 'axios';

import './login-view.scss'
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export function LoginView(props) {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ usernameErr, setUsernameErr] = useState('');
    const [ passwordErr, setPasswordErr ] = useState('');

    //Validate User Inputs
    const validate = () => {
        let isReq = true;
        if(!username){
            setUsernameErr('Username Required');
            isReq = false;
        } else if(username.length < 2){
            setUsernameErr('Username must be at least 2 characters long');
            isReq = false.valueOf;
        }
        if(!password){
            setPasswordErr('Password Required');
            isReq = false;
        } else if(password.length < 6){
            setPassword('Password must be at least 6 characters long');
            isReq = false;
        }

        return isReq;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const isReq = validate();
        if(isReq) {
        axios.post('https://dandanmania-movieapi.cyclic.app/login', {
            Username: username,
            Password: password
        })
        .then(response => {
            const data = response.data;
            props.onLogIn(data);
        })
        .catch(e => {
            console.log('No such user.')
            alert('No such user.')
        })
    }
    }

    return (
        <Card className="m-5">
            <Card.Title className="m-3 pl-1">Login</Card.Title>
            <Card.Body>
                <Form>
                    <Form.Group className="mt-2" controlId="formUsername">
                        <Form.Label>Username:</Form.Label>
                        <Form.Control type="text" placeholder="Enter Username" onChange={e => setUsername(e.target.value)} />
                        {usernameErr && <p>{usernameErr}</p>}
                    </Form.Group>

                    <Form.Group className="mt-2" controlId="formPassword">
                        <Form.Label>Password:</Form.Label>
                        <Form.Control type="password" placeholder="Enter Password" onChange={e => setPassword(e.target.value)} />
                        {passwordErr && <p>{passwordErr}</p>}
                    </Form.Group>

                    <Button className="mt-4" variant="secondary" type="submit" onClick={handleSubmit}>Log In</Button>
                    <Link to={`/register`}><Button className="mt-4" variant="link">Need to Register?</Button></Link>
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