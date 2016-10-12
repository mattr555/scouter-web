import React from "react";
import {connect} from "react-redux";
import {Navbar, Nav, NavDropdown, MenuItem} from "react-bootstrap";
import {Link} from "react-router";
import {LinkContainer} from "react-router-bootstrap";
import {getUser} from "../ducks/user";
import Message from "./Message";

class App extends React.Component {
    static propTypes = {
        user: React.PropTypes.object,
        messages: React.PropTypes.array,
        getUser: React.PropTypes.func,
        children: React.PropTypes.element
    }

    componentDidMount() {
        if (!this.props.user) {
            this.props.getUser();
        }
    }

    render() {
        var userDrop, messages;
        if (this.props.user) {
            userDrop = (
                <NavDropdown eventKey={1} title={this.props.user.username || "Loading..."} id="user-dropdown">
                    <LinkContainer to="/logout">
                        <MenuItem>Logout</MenuItem>
                    </LinkContainer>
                </NavDropdown>
            );
        } else {
            userDrop = "Loading...";
        }

        if (this.props.messages){
            messages = (
                <div>
                    {this.props.messages.map((m) => <Message message={m} key={m.id}/>)}
                </div>
            );
        }

        return (
            <div>
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
                <div className="container">
                    {messages}
                    {this.props.children}
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({user, entities, messages}) => ({
    user: entities.user[user.user],
    messages
});
const mapDispatchToProps = (dispatch) => ({
    getUser: () => dispatch(getUser())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
