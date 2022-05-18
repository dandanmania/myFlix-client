import React from  'react';
import { Form, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { UserInfo } from './user-info';

export function ProfileView() {
    return(
        <div>
            <UserInfo user={user.Username} email={user.Email}/>
        </div>
    )
}