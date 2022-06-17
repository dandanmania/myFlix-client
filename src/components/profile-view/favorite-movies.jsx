import React from "react";
import { Button, Card, Row, Col } from "react-bootstrap";
import axios from "axios";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import { MovieCard } from "../movie-card/movie-card";

export function FavoriteMovies(props) {

    const {movies, favoriteMovies, loggedUser, token} = props;

    const filteredFavorites = movies.filter((movie) => {
        return favoriteMovies.includes(movie._id)
    })

    const deleteMovie = (movieId) => {
        axios.delete(`https://dandan-myflix.herokuapp.com/users/${loggedUser.Username}/movies/${movieId}`, {
            headers: { Authorization: `Bearer ${token}`}
        }).then(() => {
            alert('The movie has been removed from your favorites')
            window.open(`/users/${loggedUser.Username}`, '_self')
        }).catch(e => {
            console.error(error)
        })
    }
        return (
            <>
            {favoriteMovies.length === 0 ? (
                <p>There are no favorites here</p>
            ) : (
                filteredFavorites.map((movie) => {
                    return (
                        <>
                            <Col className="m-1" md={4}>
                            <Card key={movie._id} className="bg-dark text-white m-2 p-2 fixed-height" border="dark">
                                <Card.Img variant="top" src={movie.ImagePath} />
                                <Card.Body className="d-flex flex-column">
                                <Card.Title>{movie.Title}</Card.Title>
                                <Row className="mt-auto">
                                <Link className="ml-2 mr-auto" to={`/movies/${movie.Title}`}>
                                    <Button variant="link">Open</Button>
                                </Link>
                                <Button className="mr-4 btn-danger" onClick={ () => deleteMovie(movie._id)}>Delete Favorite</Button>
                                </Row>
                                </Card.Body>
                            </Card>
                            </Col>
                        </>                
                        )
                    })
                )}
            </>
            )
    }