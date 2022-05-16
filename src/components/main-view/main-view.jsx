import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route} from "react-router-dom";
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
        const { movies, selectedMovie, user, registeredUser } = this.state;

        if (!user) return <Row>
            <Col>
                <LoginView onLogIn={user => this.onLogIn(user)} />
            </Col>
        </Row>

        //If there is no user logged in, LoginView is rendered.
        if (!user) return <LoginView onLogIn={user => this.onLogIn(user)} />;
        
        //If there is no registered user, RegistrationView is rendered...
        //if (!registeredUser) return <RegistrationView onRegister={registeredUser => this.onRegister(registeredUser)} />;
        
        if (movies.length === 0) return <div className="main-view" />;

        return (
            <Router>
                <Row className="main-view justify-content-md-center">
                    <Route exact path="/" render={() => {
                        return movies.map(m => (
                            <Col md={3} key={m._id}>
                                <MovieCard movie={m} />
                            </Col>
                        ))
                    }} />

                    <Route exact path="/movies/:movieTitle" render={({ match, history }) => {
                        return <Col md={8}>
                            <MovieView movie={movies.find(m => m.Title === match.params.movieTitle)} onBackClick={() => history.goBack()} />
                        </Col>
                    }} />

                    <Col>
                        <button onClick={() => { this.onLogOut() }}>Logout</button>
                    </Col>
                </Row>
            </Router>
        );
    }
}