import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { DeleteUser } from './delete-user';

export function UserInfo({ user, email }) {
    return (
        <>
            <Card className='w-75 my-4 mx-auto'>
                <Card.Title className='mt-3 ml-3'>User Info</Card.Title>
                <Card.Body>
                    <Card.Text>
                        User: {user} <br />
                        Email: {email}
                    </Card.Text>
                    <Link to={`/users/${user}/update`}><Button>Update User Info</Button></Link>
                    <DeleteUser />
                </Card.Body>
            </Card>
        </>
    )
}