import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Redirect} from "react-router-dom";
import { Row, Col }from 'react-bootstrap';
import { NavBar } from '../navbar/navbar';
import { RegistrationView } from '../registration-view/registration-view';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { ProfileView } from '../profile-view/profile-view';
import { GenreView } from '../genre-view/genre-view';
import { DirectorView } from '../director-view/director-view';
import { UpdateUser } from '../profile-view/update-user';
import { connect } from 'react-redux';
import { setMovies, setDirectors, setGenres } from '../../actions/actions';

import MoviesList from '../movies-list/movies-list';

class MainView extends React.Component {

    constructor(){
        super();
        this.state = {
            user: null
        }
    }
    
    componentDidMount(){
        let accessToken = localStorage.getItem('token');
        if (accessToken !== null) {
            this.setState({
                user: localStorage.getItem('user'),
                email: localStorage.getItem('email'),
                favoriteMovies: localStorage.getItem('favoriteMovies')
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
            email: authData.user.Email,
            favoriteMovies: authData.user.FavoriteMovies
        });

        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', authData.user.Username);
        localStorage.setItem('email', authData.user.Email);
        localStorage.setItem('favoriteMovies', authData.user.FavoriteMovies)
        this.getMovies(authData.token);
        }

    onLogOut() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('email');
        localStorage.removeItem('favoriteMovies');
        this.setState({
            user: null,
            email: null,
            favoriteMovies: null
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
            this.props.setMovies(moviesResponse.data)
            this.props.setDirectors(directorsResponse.data)
            this.props.setGenres(genresResponse.data)
        })).catch(function(error) {
            console.log(error)
        })
    }


    render() {
        const { movies, directors, genres } = this.props;
        const { user } = this.state;

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
                        return <MoviesList movies={movies} />;
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
                            <ProfileView user={user} movies={movies} onBackClick={() => history.goBack()} />
                        </Col>
                    }} />

<                   Route path={`/users/${user}/update`} render={({history}) => {
                        if (!user) return <Redirect to ="/" />
                        return <Col>
                            <UpdateUser user={user} onBackClick={() => history.goBack()} />
                        </Col>
                    }} />

                    <Route exact path="/movies/:movieID" render={({ match, history }) => {
                        return <Col md={8}>
                            <MovieView movie={movies.find(m => m._id === match.params.movieID)} director={directors} genre={genres} onBackClick={() => history.goBack()} />
                        </Col>
                    }} />

                    <Route exact path="/directors/:director" render={({ match, history }) => {
                        let findDirector = directors.find(m => m._id === match.params.director);
                        return <Col md={8}>
                            <DirectorView movie={movies} director={findDirector} onBackClick={() => history.goBack()} />
                        </Col>
                    }} />

                    <Route exact path="/genre/:genre" render={({ match, history }) => {
                        return <Col md={8}>
                            <GenreView movie={movies} genre={genres.find(m => m._id === match.params.genre)} onBackClick={() => history.goBack()} />
                        </Col>
                    }} />
                </Row>
            </Router>
        );
    }
}

let mapStateToProps = state => {
    return { movies: state.movies, directors: state.directors, genres: state.genres }
}

export default connect(mapStateToProps, { setMovies, setDirectors, setGenres } )(MainView);