import React, { useState } from  'react';
import { Form, Button, Card, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { UserInfo } from './user-info';

export function ProfileView({user, email, favoriteMovies}){

    return(
        <div>
            <p>User: {user}</p>
            <p>Email: {email}</p>
            <h2>Favorite Movies</h2>
        </div>
    )
}