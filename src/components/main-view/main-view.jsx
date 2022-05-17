import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Redirect} from "react-router-dom";
import {Row, Col, Container }from 'react-bootstrap';
import { NavBar } from '../navbar/navbar';
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
        let accessToken = localStorage.getItem('token');
        if (accessToken !== null) {
            this.setState({
                user: localStorage.getItem('user')
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
            user: authData.user.Username
        });

        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', authData.user.Username);
        this.getMovies(authData.token);
    }

    onLogOut() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.setState({
            user: null
        });
    }

    getMovies(token) {
        axios.get('https://dandan-myflix.herokuapp.com/movies', {
            headers: { Authorization: `Bearer ${token}`}
        })
        .then(response => {
            //Assign the result to the state
            this.setState({
                movies: response.data
            });
        })
        .catch(function (error) {
            console.log(error);
        })
    }

    render() {
        const { movies, selectedMovie, user } = this.state;

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

                    <Route exact path="/movies/:movieTitle" render={({ match, history }) => {
                        return <Col md={8}>
                            <MovieView movie={movies.find(m => m.Title === match.params.movieTitle)} onBackClick={() => history.goBack()} />
                        </Col>
                    }} />


                </Row>
            </Router>
        );
    }
}