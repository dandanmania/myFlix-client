import axios from "axios";
import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";

export function DeleteUser() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const deleteUser = () => {
        setShow(false);
        let token = localStorage.getItem('token');
        let user = localStorage.getItem('user');
        axios.delete(`https://dandanmania-movieapi.cyclic.app/users/${user}`, {
            headers: { Authorization: `Bearer ${token}`}
        }).then(response => {
            const data = response.data;
            console.log(data);
            alert('Your account has been deleted.');
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            window.open('/', '_self');
        }).catch(e => {
            console.log('Error deleting user.')
        })
    }

    return(
        <>
            <Button className='float-right' variant="danger" onClick={handleShow}>
                Delete User
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>Delete User?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Do you wish to delete your account? This action cannot be undone.</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Cancel</Button>
                    <Button variant="danger" onClick={deleteUser}>Delete</Button>
                </Modal.Footer>
            </Modal>        
        </>
    )
}