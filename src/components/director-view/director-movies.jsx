import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { Button, Card, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

export function DirectorMovies({director}) {

    const directorCollection = {director}.Movies;

    const filteredMovies = movies.filter((movie) => {
        return directorCollection.includes(movie._id)
    })
        return (
            <>
            {console.log(directorCollection)}
            {directorCollection.length === 0 ? (
                <p>There are no movies here</p>
            ) : (
                filteredMovies.map((movie) => {
                    return (
                        <>
                            <Col className="m-1" md={4}>

                                <Link className="ml-2 mr-auto" to={`/movies/${movie.Title}`}>
                                    <Button variant="link">Open</Button>
                                </Link>
                                <Button className="mr-4 btn-danger" onClick={ () => deleteMovie(movie._id)}>Delete Favorite</Button>
                            </Col>
                        </>                
                        )
                    })
                )}
            </>
            )
    }