import axios from 'axios';
import React from 'react';
import './movie-view.scss';
import { Row, Col, Button, ListGroup, Alert } from 'react-bootstrap';
import { MovieDirectorLink } from './movie-director-link';
import { MovieGenreLink } from './movie-genre-link';

export class MovieView extends React.Component{
    keypressCallback(event) {
        console.log(event.key);
    }

    componentDidMount() {
        document.addEventListener('keypress', this.keypressCallback);
    }

    componentWillUnmount() {
        document.removeEventListener('keypress', this.keypressCallback);
    }

    addFavorite({movie}) {
        const user = localStorage.getItem('user');
        const token = localStorage.getItem('token');
        
        axios.post(`https://dandan-myflix.herokuapp.com/users/${user}/movies/${movie._id}`, {}, {
            headers: { Authorization: `Bearer ${token}` }
        }).then(response => {
            var invisibility = document.getElementById('addrow');
            invisibility.classList.remove('invisible'); 
            setTimeout(function() {
                invisibility.classList.add('invisible');
            }, 5000);
        }).catch(e => {
            var invisibility = document.getElementById('addfail');
            invisibility.classList.remove('invisible'); 
            setTimeout(function() {
                invisibility.classList.add('invisible');
            }, 5000);
            console.log('Error adding favorites.')
        })
    }

    render() {
        const { movie, director, genre, onBackClick } = this.props;
        return (
            <Row className='justify-content-md-center'>
                <Row className='position-absolute justify-content-center invisible' id='addrow'>
                    <Alert className='mt-2' variant='info'>Movie has been added to your favorites.</Alert>
                </Row>
                <Row className='position-absolute justify-content-center invisible' id='addfail'>
                    <Alert className='mt-2' variant='danger'>Failed to add to your favorites.</Alert>
                </Row>
                <Col>
                    <ListGroup variant="flush">
                        <ListGroup.Item className='movie-img'><img src={movie.ImagePath} /></ListGroup.Item>
                        <ListGroup.Item>Title: {movie.Title}</ListGroup.Item>
                        <ListGroup.Item>Description: {movie.Description}</ListGroup.Item>
                        <ListGroup.Item>
                            Director: <MovieDirectorLink movie={movie} director={director} />
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Genre: <MovieGenreLink movie={movie} genre={genre} />
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button onClick={() => this.addFavorite({movie})}>Add to Favorites</Button>
                        </ListGroup.Item>
                        <ListGroup.Item><Button variant="secondary" onClick={() => onBackClick() }>Back</Button></ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>
        );
    }
}