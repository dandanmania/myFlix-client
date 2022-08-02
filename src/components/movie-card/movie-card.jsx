import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './movie-card.scss'

import { Link } from "react-router-dom";

export class MovieCard extends React.Component {
    render() {
        const { movie } = this.props;

        return (
            <>
                <img src={movie.ImagePath} id={movie._id} className='card-image-topper'></img>
                <Card className="bg-dark text-white p-2 fixed-height card-details-bordering" border="dark">
                    <Card.Body className="d-flex flex-column">
                        <Card.Title>{movie.Title}</Card.Title>
                        <Link className="mt-auto mr-auto" to={`/movies/${movie._id}`}>
                            <Button variant="link">Open</Button>
                        </Link>
                    </Card.Body>
                </Card>
            </>
        )
    }
}