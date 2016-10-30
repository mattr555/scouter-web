import React from "react";
import {connect} from "react-redux";
import {Button} from "react-bootstrap";
import {FieldArray, reduxForm} from "redux-form";
import SchemaBuilder from "./SchemaBuilder";
import {updateUser} from "ducks/user";

class SettingsPage extends React.Component {
    static propTypes = {
        handleSubmit: React.PropTypes.func,
        dirty: React.PropTypes.bool
    }

    submit = (event) => {
        event.preventDefault();
        // this.props.handleSubmit(data=>console.log(data))(event);
        this.props.handleSubmit(event);
    }

    render() {
        const changed = this.props.dirty;
        return <div>
            <h3>Settings</h3>
            <form onSubmit={this.submit}>
                <FieldArray component={SchemaBuilder} name="robot_fields"/>
                <Button disabled={!changed} bsStyle="primary" type="submit">Save</Button>
            </form>
        </div>;
    }
}

// TODO: client side validation
const mapStateToProps = ({entities, user, schemaBuilder}) => {
    const denormUser = entities.user[user.user];
    return {
        user: denormUser,
        schema: schemaBuilder,
        initialValues: denormUser
    };
};

const mapDispatchToProps = (dispatch) => ({
    onSubmit: (data) => dispatch(updateUser(data))
});

export default connect(
    mapStateToProps, mapDispatchToProps
)(reduxForm({
    form: "userSettings"
})(SettingsPage));
