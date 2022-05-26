import React from 'react';
import { Row, Col, Button, ListGroup, Link } from 'react-bootstrap';

export class GenreView extends React.Component{

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
        const { genre, onBackClick } = this.props;
        return (
            <Row className='justify-content-md-center'>
                <Col>
                    <ListGroup variant="flush">
                        <ListGroup.Item><img src={genre.ImagePath} /></ListGroup.Item>
                        <ListGroup.Item>Name: {genre.Name}</ListGroup.Item>
                        <ListGroup.Item>Description: {genre.Description}</ListGroup.Item>
                        <ListGroup.Item><Button variant="secondary" onClick={() => onBackClick() }>Back</Button></ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>
        );
    }
}