import axios from 'axios';
import React from 'react';
import { Row, Col, Button, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './movie-view.scss';

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
        
        axios.post(`https://dandan-myflix.herokuapp.com/users/${user}/movies/${movie._id}`, {
            headers: { Authorization: `Bearer ${token}` }
        }).then(response => {
            alert('Movie added to your favorites!')
        }).catch(e => {
            console.log('Error adding favorites.')
        })
    }

    render() {
        const { movie, onBackClick } = this.props;
        return (
            <Row className='justify-content-md-center'>
                <Col>
                    <ListGroup variant="flush">
                        <ListGroup.Item><img src={movie.ImagePath} /></ListGroup.Item>
                        <ListGroup.Item>Title: {movie.Title}</ListGroup.Item>
                        <ListGroup.Item>Description: {movie.Description}</ListGroup.Item>
                        <ListGroup.Item>
                            <Link to={`/directors/${movie.Director[0]}`}>
                                <Button variant="link">Director</Button>
                            </Link>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Link to={`/genre/${movie.Genre}`}>
                                <Button variant="link">Genre</Button>
                            </Link>
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