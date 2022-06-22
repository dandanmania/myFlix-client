import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export function MovieDirectorLink(props) {
    const {movie, director} = props;

    const filteredDirectors = director.filter((director) => {
        return movie.Director.includes(director._id)
    })
        return (
            <>
            {filteredDirectors.length === 0 ? (
                <p>No Director Here</p>
            ) : (
                filteredDirectors.map((director) => {
                    return (
                        <>
                            <Link key={movie.director} to={`/directors/${director._id}`}>
                                <Button variant="link">{director.Name}</Button>
                            </Link>
                        </>                
                        )
                    })
                )}
            </>
            )
    }