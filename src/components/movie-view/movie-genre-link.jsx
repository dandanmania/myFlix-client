import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export function MovieGenreLink(props) {
    const {movie, genre} = props;

    const filteredGenres = genre.filter((genre) => {
        return movie.Genre.includes(genre._id)
    })
        return (
            <>
            {filteredGenres.length === 0 ? (
                <p>No Genre Here</p>
            ) : (
                filteredGenres.map((genre) => {
                    return (
                        <>
                            <Link to={`/genre/${movie.Genre}`}>
                                <Button variant="link">{genre.Name}</Button>
                            </Link>
                        </>                
                        )
                    })
                )}
            </>
            )
    }