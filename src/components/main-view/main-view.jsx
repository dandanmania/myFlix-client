import React from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { RegistrationView } from '../registration-view/registration-view';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export class MainView extends React.Component {

    constructor(){
        super();
        this.state = {
            movies: [],
            selectedMovie: null
        }
    }
    
    componentDidMount(){
        axios.get('https://dandan-myflix.herokuapp.com/movies')
            .then(response => {
                this.setState({
                    movies: response.data
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    setSelectedMovie(newSelectedMovie) {
        this.setState({
            selectedMovie: newSelectedMovie
        });
    }

    onRegister(registeredUser) {
        this.setState({
            registeredUser
        });
    }

    onLogIn(user) {
        this.setState({
            user
        });
    }

    render() {
        const { movies, selectedMovie, user, registeredUser } = this.state;

        //If there is no user logged in, LoginView is rendered.
        if (!user) return <LoginView onLogIn={user => this.onLogIn(user)} />;
        
        //If there is no registered user, RegistrationView is rendered...
        if (!registeredUser) return <RegistrationView onRegister={registeredUser => this.onRegister(registeredUser)} />;
        
        if (movies.length === 0) return <div className="main-view" />;

        return (
            <Row className="main-view justify-content-md-center">
                {selectedMovie
                    ? (
                        <Col md={8}>
                            <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => {this.setSelectedMovie(newSelectedMovie); }} />
                        </Col>
                    )
                    : (
                        movies.map(movie => (
                            <Col md={3}>
                                <MovieCard key={movie._id} movie={movie} onMovieClick={(newSelectedMovie) => { this.setSelectedMovie(movie); }} />
                            </Col>))
                    )
                }
            </Row>
        );
    }
}