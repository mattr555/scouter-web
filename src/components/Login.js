import React from "react";
import {Button, Alert} from "react-bootstrap";
import {connect} from "react-redux";
import {Field, reduxForm, SubmissionError} from "redux-form";
import {push} from "react-router-redux";
import {FieldGroup} from "components/common";
import {login} from "ducks/auth";

require("style/login.scss");

class Login extends React.Component {
    static propTypes = {
        onSubmit: React.PropTypes.func,
        onSuccess: React.PropTypes.func,
        auth: React.PropTypes.object,
        location: React.PropTypes.object,
        handleSubmit: React.PropTypes.func,
        change: React.PropTypes.func,
        error: React.PropTypes.string
    };

    nextLoc = () => (this.props.location.query.next || "/")

    componentWillMount() {
        if (this.props.auth.token){
            this.props.onSuccess(this.nextLoc());
        }
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.props.handleSubmit(event)
            .then(() => this.props.onSuccess(this.nextLoc()));
        this.props.change("password", "");
    }

    render() {
        const {error} = this.props;

        return (
            <div className="container">
                <form className="form-login" onSubmit={this.onSubmit}>
                    <h3>Please log in</h3>
                    <Field component={FieldGroup} name="username" placeholder="Username" type="text" />
                    <Field component={FieldGroup} name="password" placeholder="Password" type="password" />
                    <Button type="submit" bsStyle="primary">Login</Button>
                    {error && <Alert bsStyle="danger">{error}</Alert>}
                </form>
            </div>
        );
    }
}

const mapStateToProps = ({auth}) => ({auth});

const mapDispatchToProps = (dispatch) => ({
    onSubmit: ({username, password}) => {
        return dispatch(login(username, password))
            .catch(err => {
                if (err.response && err.response.status === 401){
                    throw new SubmissionError({password: "Invalid username/password"});
                } else if(err.message) {
                    throw new SubmissionError({_error: err.message});
                }
            });
    },
    onSuccess: (nextPath) => dispatch(push(nextPath))
});

export default connect(
    mapStateToProps, mapDispatchToProps
)(reduxForm({
    form: "login"
})(Login));
