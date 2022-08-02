import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './movie-card.scss'

import { Link } from "react-router-dom";

export class MovieCard extends React.Component {
    render() {
        const { movie } = this.props;

        return (
            <Card className="bg-dark text-white m-2 p-2 fixed-height" border="dark">
                <Card.Img variant="top" src={movie.ImagePath} />
                <Card.Body className="d-flex flex-column">
                    <Card.Title>{movie.Title}</Card.Title>
                    <Link className="mt-auto mr-auto" to={`/movies/${movie._id}`}>
                        <Button variant="link">Open</Button>
                    </Link>
                </Card.Body>
            </Card>
        )
    }
}