import React from "react";
import { Button, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

export function DirectorMovies(props) {
    const {movies, director} = props;

    const filteredMovies = movies.filter((movie) => {
        return director.Movies.includes(movie._id)
    })
        return (
            <>
            {console.log(director)}
            {filteredMovies.length === 0 ? (
                <p>There are no movies here</p>
            ) : (
                filteredMovies.map((movie) => {
                    return (
                        <>
                            <Col className="m-1" md={4}>
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