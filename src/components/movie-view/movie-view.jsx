import React from 'react';
import { Row, Col, Button, ListGroup } from 'react-bootstrap';
import './movie-view.scss';

export class MovieView extends React.Component{

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
        const { movie, onBackClick } = this.props;
        return (
            <Row className='justify-content-md-center'>
                <Col>
                    <ListGroup variant="flush">
                        <ListGroup.Item><img src={movie.ImagePath} /></ListGroup.Item>
                        <ListGroup.Item>Title: {movie.Title}</ListGroup.Item>
                        <ListGroup.Item>Description: {movie.Description}</ListGroup.Item>
                        <ListGroup.Item><Button variant="secondary" onClick={() => onBackClick(null) }>Back</Button></ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>
        );
    }
}