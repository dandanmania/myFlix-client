import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './movie-card.scss'

export class MovieCard extends React.Component {
    render() {
        const { movie, onMovieClick } = this.props;

        return (
            <Card className="bg-dark text-white m-2 p-2 fixed-height" border="dark">
                <Card.Img variant="top" src={movie.ImagePath} />
                <Card.Body className="d-flex flex-column">
                    <Card.Title>{movie.Title}</Card.Title>
                    <Button className="mt-auto mr-auto" onClick={() => onMovieClick(movie)} variant="link">Open</Button>
                </Card.Body>
            </Card>
        )
    }
}