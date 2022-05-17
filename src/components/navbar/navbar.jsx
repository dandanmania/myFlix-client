import React from 'react';
import { Nav, Navbar, Container, Button } from 'react-bootstrap';

export function NavBar({user}) {
    const isAuth = () => {
        if(typeof window == 'undefined') {
            return false;
        }
        if(localStorage.getItem("token")) {
            return localStorage.getItem("token");
        }
        else{
            return false;
        }
    }
    const onLogOut = () => {
        localStorage.clear();
        window.open("/", "_self");
    }
    return (
        <Navbar className="main-nav sticky-top" expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand className="navbar-logo" href="/">myFlix</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responseive-navbar-nav">
                    <Nav className="ml-auto">
                        {isAuth() && (
                            <Nav.Link href={`users/${user}`}>{user}</Nav.Link>
                        )}
                        {isAuth() && (
                            <Button variant="link" onClick={() => { this.onLogOut() }}>Logout</Button>
                        )}
                        {!isAuth() && (
                            <Nav.Link href="/">Sign-in</Nav.Link>
                        )}
                        {!isAuth() && (
                            <Nav.Link href="/register">Sign-up</Nav.Link>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}