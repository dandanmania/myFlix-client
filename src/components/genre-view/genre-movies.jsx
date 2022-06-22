import React from "react";
import { Button, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

export function GenreMovies(props) {
    const {movies, genre} = props;

    const filteredMovies = movies.filter((movie) => {
        return genre.Movies.includes(movie._id)
    })
        return (
            <>
            {console.log(genre)}
            {filteredMovies.length === 0 ? (
                <p>There are no movies here</p>
            ) : (
                filteredMovies.map((movie) => {
                    return (
                        <>
                            <Col className="m-1">
                                <Link className="ml-2 mr-auto" to={`/movies/${movie._id}`}>
                                    <Button variant="link">{movie.Title}</Button>
                                </Link>
                            </Col>
                        </>                
                        )
                    })
                )}
            </>
            )
    }