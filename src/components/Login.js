import React from "react";
import {FormGroup, FormControl, Button, Alert} from "react-bootstrap";
import {connect} from "react-redux";
import {push} from "react-router-redux";
import {login} from "ducks/auth";

require("style/login.scss");

class Login extends React.Component {
    static propTypes = {
        onSubmit: React.PropTypes.func,
        onSuccess: React.PropTypes.func,
        auth: React.PropTypes.object,
        location: React.PropTypes.object
    };

    state = {
        username: "",
        password: ""
    }

    // onError = (err) => {
    //     let {status} = err.response;
    //     console.log(status);
    //     if (status === 401) {
    //         this.setState({error: "Invalid username/password"});
    //     }
    // }

    onSubmit = (e) => {
        e.preventDefault();
        this.props.onSubmit(this.state.username, this.state.password)
            .then(() => this.props.onSuccess(this.props.location.query.next || "/"));
        this.setState({password: ""});
    }

    handleUsernameChange = (e) => this.setState({username: e.target.value})
    handlePasswordChange = (e) => this.setState({password: e.target.value})

    render() {
        const error = this.props.auth.error;
        if (error && error.response && error.response.status === 401) {
            var err_msg = <Alert bsStyle="warning">Invalid username/password</Alert>;
        }

        return (
            <div className="container">
                <form className="form-login" onSubmit={this.onSubmit}>
                    <h3>Please log in</h3>
                    <FormGroup>
                        <FormControl type="text" placeholder="Username" value={this.state.username} onChange={this.handleUsernameChange}/>
                    </FormGroup>
                    <FormGroup>
                        <FormControl type="password" placeholder="Password" value={this.state.password} onChange={this.handlePasswordChange}/>
                    </FormGroup>
                    <Button type="submit" bsStyle="primary">Login</Button>
                    {err_msg}
                </form>
            </div>
        );
    }
}

const mapStateToProps = ({auth}) => ({auth});

const mapDispatchToProps = (dispatch) => ({
    onSubmit: (username, password) => dispatch(login(username, password)),
    onSuccess: (nextPath) => dispatch(push(nextPath))
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
