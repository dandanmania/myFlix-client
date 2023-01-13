import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Row, Card, Alert } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './update-user.scss';

export function UpdateUser(props) {
    const {user} = props;
    const token = localStorage.getItem('token');
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ birthday, setBirthday ] = useState('');
    const [ values, setValues] = useState({
        usernameErr: '',
        passwordErr: '',
        emailErr: '',
        birthdayErr: ''
    })

    const validate = () => {
        let isReq = true;
        if(!username){
            setValues({...values, usernameErr: 'Username Required'});
            isReq = false;
        } else if(username.length < 2){
            setValues({...values, usernameErr:'Username must be at least 2 characters long'});
            isReq = false.valueOf;
        }
        if(!password){
            setValues({...values, passwordErr:'Password Required'});
            isReq = false;
        } else if(password.length < 6){
            setValues({...values, passwordErr:'Password must be at least 6 characters long'});
            isReq = false;
        }
        if(!email){
            setValues({...values, emailErr:'Email Required'});
            isReq = false;
        } else if(email.indexOf('@') === -1 ) {
            setValues({...values, emailErr: 'Email is invalid'});
            isReq = false;
        }
        if(!birthday){
            setValues({...values, birthdayErr:'Birthday Required'});
            isReq = false;
        }

        return isReq;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const isReq = validate();
        if(isReq) {
        axios.put(`https://dandanmania-movieapi.cyclic.app/users/${user}`, {
            Username: username,
            Password: password,
            Email: email,
            Birthday: birthday,
        }, { headers: { Authorization: `Bearer ${token}`}})
        .then(response => {
            localStorage.setItem("user", username);
            const data = response.data;
            console.log(data);
            var invisibility = document.getElementById('updatealert');
            invisibility.classList.remove('invisible'); 
            setTimeout(function() {
                window.open(`/users/${user}`, '_self')
            }, 3000);
        })
        .catch(e => {
            console.log('Error updating the user');
            console.error(error);
            var invisibility = document.getElementById('updatefail');
            invisibility.classList.remove('invisible'); 
            setTimeout(function() {
                invisibility.classList.add('invisible')
            }, 9000);
        })
    }
    }

    return (
        <>
            <Row className="position-absolute justify-content-center invisible" id="updatealert">
                <Alert className='mt-2' variant='primary'>User has been updated.</Alert>
            </Row>
            <Row className="position-absolute justify-content-center invisible" id="updatefail">
                <Alert className='mt-2' variant='danger'>Update has failed.</Alert>
            </Row>
            <Card className="m-5">
            <Card.Title className="m-3 pl-1">Edit Profile</Card.Title>
            <Card.Body>
                <Form>
                    <Form.Group controlId="formUsername">
                        <Form.Label>Username:</Form.Label>
                        <Form.Control type="text" placeholder="Enter Username" onChange={e => setUsername(e.target.value)} />
                        {values.usernameErr && <p>{values.usernameErr}</p>}
                     </Form.Group>

                    <Form.Group className="mt-2" controlId="formPassword">
                        <Form.Label>Password:</Form.Label>
                        <Form.Control type="password" placeholder="Enter Password" onChange={e => setPassword(e.target.value)} />
                        {values.passwordErr && <p>{values.passwordErr}</p>}
                    </Form.Group>
            
                    <Form.Group className="mt-2" controlId="formEmail">
                        <Form.Label>Email:</Form.Label>
                        <Form.Control type="email" placeholder="Enter Email" onChange={e => setEmail(e.target.value)} />
                        {values.emailErr && <p>{values.emailErr}</p>}    
                    </Form.Group>

                    <Form.Group className="mt-2" controlId="formBirthday">
                        <Form.Label>Birthday:</Form.Label>
                        <Form.Control type="date" onChange={e => setBirthday(e.target.value)} />
                        {values.birthdayErr && <p>{values.birthdayErr}</p>}    
                    </Form.Group>
                    <Button className="mt-4" variant="secondary" type="submit" onClick={handleSubmit}>Submit</Button>
                    <Link to={`/users/${user}`}><Button className="ml-2 mt-4" variant="secondary">Back</Button></Link>
                </Form>
            </Card.Body>
        </Card>
        </>
    );
}

UpdateUser.propTypes = {
    user: PropTypes.shape({
        username: PropTypes.string.isRequired,
        password: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        birthday: PropTypes.any.isRequired
    }),
    onRegister: PropTypes.func.isRequired
}