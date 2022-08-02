import React from "react";
import { Button, Card, Row, Col } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";

export function FavoriteMovies(props) {
    const {movies, favoriteMovies, loggedUser, token} = props;

    const filteredFavorites = movies.filter((movie) => {
        return favoriteMovies.includes(movie._id)
    })

    const deleteMovie = (movieId) => {
        axios.delete(`https://dandan-myflix.herokuapp.com/users/${loggedUser.Username}/movies/${movieId}`, {
            headers: { Authorization: `Bearer ${token}`}
        }).then(() => {
            var invisibility = document.getElementById('alertrow');
            invisibility.classList.remove('invisible'); 
            setTimeout(function() {
                window.open(`/users/${loggedUser.Username}`, '_self')
            }, 3000);
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
                                <img src={movie.ImagePath} id={movie._id} className='card-image-topper'></img>
                                <Card className="bg-dark text-white p-2 fixed-height card-details-bordering" border="dark">
                                    <Card.Body className="d-flex flex-column">
                                        <Card.Title>{movie.Title}</Card.Title>
                                        <Link className="mt-auto mr-auto" to={`/movies/${movie._id}`}>
                                            <Button variant="link">Open</Button>
                                        </Link>
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