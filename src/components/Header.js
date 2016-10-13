import React from "react";
import {Navbar, Nav, NavDropdown, MenuItem} from "react-bootstrap";
import {Link} from "react-router";
import {LinkContainer} from "react-router-bootstrap";

const Header = ({user}) => {
    var userDrop;
    if (user) {
        userDrop = (
            <NavDropdown eventKey={1} title={user.username || "Loading..."} id="user-dropdown">
                <LinkContainer to="/logout">
                    <MenuItem>Logout</MenuItem>
                </LinkContainer>
            </NavDropdown>
        );
    } else {
        userDrop = <Navbar.Text>Loading...</Navbar.Text>;
    }

    return (
        <Navbar>
            <Navbar.Header>
                <Navbar.Brand>
                    <Link to="/">Scouter Web Client</Link>
                </Navbar.Brand>
                <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
                <Nav pullRight>
                    {userDrop}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

Header.propTypes = {
    user: React.PropTypes.object
};

export default Header;
