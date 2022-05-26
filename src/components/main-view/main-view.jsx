import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Redirect} from "react-router-dom";
import {Row, Col, Container }from 'react-bootstrap';
import { NavBar } from '../navbar/navbar';
import { RegistrationView } from '../registration-view/registration-view';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { ProfileView } from '../profile-view/profile-view';
import { GenreView } from '../genre-view/genre-view';
import { DirectorView } from '../director-view/director-view';

export class MainView extends React.Component {

    constructor(){
        super();
        this.state = {
            movies: [],
            selectedMovie: null
        }
    }
    
    componentDidMount(){
        let accessToken = localStorage.getItem('token');
        if (accessToken !== null) {
            this.setState({
                user: localStorage.getItem('user'),
                email: localStorage.getItem('email')
            });
            this.getMovies(accessToken);
        }
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

    onLogIn(authData) {
        console.log(authData);
        this.setState({
            user: authData.user.Username,
            email: authData.user.Email
        });

        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', authData.user.Username);
        localStorage.setItem('email', authData.user.Email);
        this.getMovies(authData.token);
        }

    onLogOut() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('email');
        this.setState({
            user: null,
            email: null
        });
    }

    getMovies(token) {
        let movieLink = "https://dandan-myflix.herokuapp.com/movies"
        let directorsLink = "https://dandan-myflix.herokuapp.com/directors"
        let genreLink = "https://dandan-myflix.herokuapp.com/genre"

        const requestMovies = axios.get(movieLink, {
            headers: { Authorization: `Bearer ${token}`}
        });
        const requestDirectors = axios.get(directorsLink, {
            headers: { Authorization: `Bearer ${token}`}
        });
        const requestGenres = axios.get(genreLink, {
            headers: { Authorization: `Bearer ${token}`}
        });

        Promise.all([requestMovies, requestDirectors, requestGenres])
        .then(axios.spread((moviesResponse, directorsResponse, genresResponse) => {
            this.setState({
              movies: moviesResponse.data,
              directors: directorsResponse.data,
              genres: genresResponse.data
            });
        })).catch(function(error) {
            console.log(error)
        })
    }


    render() {
        const { movies, directors, genres, user, email } = this.state;

        return (
            <Router>
                <NavBar user={user} />
                <Row className="main-view justify-content-md-center">
                    <Route exact path="/" render={() => {
                        //If there is no user logged in, LoginView is rendered.
                        if (!user) return <Col>
                            <LoginView onLogIn={user => this.onLogIn(user)} />
                        </Col>

                        if (movies.length === 0) return <div className="main-view" />
                        return movies.map(m => (
                            <Col className="m-1" md={3} key={m._id}>
                                <MovieCard movie={m} />
                            </Col>
                        ))
                    }} />

                    <Route path="/register" render={() => {
                        if (user) return <Redirect to="/" />
                        return <Col>
                            <RegistrationView />
                        </Col>
                    }} />

                    <Route path={`/users/${user}`} render={({history}) => {
                        if (!user) return <Redirect to ="/" />
                        return <Col>
                            <ProfileView user={user} email={email} />
                        </Col>
                    }} />

                    <Route exact path="/movies/:movieTitle" render={({ match, history }) => {
                        return <Col md={8}>
                            <MovieView movie={movies.find(m => m.Title === match.params.movieTitle)} onBackClick={() => history.goBack()} />
                        </Col>
                    }} />

                    <Route exact path="/directors/:director" render={({ match, history }) => {
                        return <Col md={8}>
                            <DirectorView director={directors.find(m => m._id === match.params.director)} onBackClick={() => history.goBack()} />
                        </Col>
                    }} />

                    <Route exact path="/genre/:genre" render={({ match, history }) => {
                        return <Col md={8}>
                            <GenreView genre={genres.find(m => m._id === match.params.genre)} onBackClick={() => history.goBack()} />
                        </Col>
                    }} />
                </Row>
            </Router>
        );
    }
}