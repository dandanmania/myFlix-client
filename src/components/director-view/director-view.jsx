import React from 'react';
import { Row, Col, Button, ListGroup } from 'react-bootstrap';
import { DirectorMovies } from './director-movies';

export class DirectorView extends React.Component{

    keypressCallback(event) {
        console.log(event.key);
    }

    componentDidMount() {
        document.addEventListener('keypress', this.keypressCallback);
    }

    componentWillUnmount() {
        document.removeEventListener('keypress', this.keypressCallback);
    }

    render() {
        const { movie, director, onBackClick } = this.props;
        return (
            <Row className='justify-content-md-center'>
                <Col>
                    <ListGroup variant="flush">
                        <ListGroup.Item><img src={director.ImagePath} /></ListGroup.Item>
                        <ListGroup.Item>Name: {director.Name}</ListGroup.Item>
                        <ListGroup.Item>Description: {director.Description}</ListGroup.Item>
                        <ListGroup.Item>Movies: <DirectorMovies movies={movie} director={director} /></ListGroup.Item>
                        <ListGroup.Item><Button variant="secondary" onClick={() => onBackClick() }>Back</Button></ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>
        );
    }
}