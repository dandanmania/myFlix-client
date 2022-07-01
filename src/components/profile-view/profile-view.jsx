import React, { useState } from  'react';
import { Alert, Container, Row } from 'react-bootstrap';
import axios from 'axios';
import { FavoriteMovies } from './favorite-movies';
import { useEffect } from 'react';
import { UserInfo } from './user-info';

import './profile-view.scss';

export function ProfileView(props){
    const [user, setUser] = useState(props.user);
    const [email, setEmail] = useState(props.user.Email);
    const [movies, setMovies] = useState(props.movies);
    const [favoriteMovies, setFavoriteMovies] = useState([]);

    const [isActive, setActive] = useState('false');
    const handleToggle = () => {
        setActive(!isActive);
    }
    
    const loggedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    const logUser = () => {
        axios.get(`https://dandan-myflix.herokuapp.com/users/${loggedUser}`, {
            headers: { Authorization: `Bearer ${token}`}
        }).then(response => {
            setUser(response.data);
            setFavoriteMovies(response.data.FavoriteMovies)
            setEmail(response.data.Email)
        }).catch(error => console.error(error))
    }

    const fetchMovies = () => {
        axios.get('https://dandan-myflix.herokuapp.com/movies', {
            headers: { Authorization: `Bearer ${token}`}
        }).then(response => {
            setMovies(response.data);
        }).catch(error => console.error(error))
    }

    useEffect(() => {
        logUser();
        fetchMovies();
    }, [])

    return(
        <Container>
            <Row className="position-absolute justify-content-center invisible" id="alertrow">
                <Alert className='mt-2' variant='info'>Movie has been removed from your favorites.</Alert>
            </Row>
            <Row className='ml-2 justify-content-center position-relative'>
                <UserInfo user={user.Username} email={email} favoriteMovies={favoriteMovies}/>
            </Row>
            <h2>Favorite Movies</h2>
            <Row className='justify-content-center'>
                <FavoriteMovies movies={movies} favoriteMovies={favoriteMovies} token={token} loggedUser={user}/>
            </Row>
        </Container>
    )
}