import { thistle } from 'color-name';
import React from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export class MainView extends React.Component {

    constructor(){
        super();
        this.state = {
            movies: [
                { _id: 1, Title: 'Inception', Description: 'A very interesting movie...', ImagePath:'...'},
                { _id: 2, Title: 'The Shawshank Redemption', Description: 'This is a placeholder description...', ImagePath:'...'},
                { _id: 3, Title: 'Gladiator', Description: 'A very different kind of movie...', ImagePath:'...'},
            ],
            selectedMovie: null
        }
    }

    setSelectedMovie(newSelectedMovie) {
        this.setState({
            selectedMovie: newSelectedMovie
        });
    }

    render() {
        const { movies, selectedMovie } = this.state;

        if (movies.length === 0) return <div className="main-view">The list is empty!</div>;

        return (
            <div className="main-view">
                {selectedMovie
                    ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => {this.setSelectedMovie(newSelectedMovie); }} />
                    : movies.map(movie => (<MovieCard key={movie._id} movie={movie} onMovieClick={(newSelectedMovie) => { this.setSelectedMovie(movie); }} />))
                }
            </div>
        );
    }
}