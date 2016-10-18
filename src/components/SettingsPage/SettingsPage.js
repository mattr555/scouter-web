import React from "react";
import {connect} from "react-redux";
import {Button} from "react-bootstrap";
import SchemaBuilder from "./SchemaBuilder";
import {updateUser} from "ducks/user";
import isEqual from "lodash/isEqual";

class SettingsPage extends React.Component {
    static propTypes = {
        user: React.PropTypes.object,
        schema: React.PropTypes.array,
        onSave: React.PropTypes.func
    }

    state = {form: {}}

    isChanged() {
        const d = this.getData();
        return Object.keys(d).reduce((prev, k) => prev || (this.props.user && !isEqual(d[k], this.props.user[k])), false);
    }

    saved = () => {
        this.props.onSave(this.getData());
    }

    getData() {
        const stripIds = (f) => {
            const newField = {...f};
            delete newField.id;
            return newField;
        };
        return {
            ...this.state.form,
            robot_fields: this.props.schema.map(stripIds)
        };
    }

    render() {
        const {schema} = this.props;
        const changed = this.isChanged();
        return <div>
            <h3>Settings</h3>
            <div>
                <SchemaBuilder schema={schema} />
            </div>
            <Button disabled={!changed} bsStyle="primary" onClick={this.saved}>Save</Button>
        </div>;
    }
}

const mapStateToProps = ({entities, user, schemaBuilder}) => {
    return {
        user: entities.user[user.user],
        schema: schemaBuilder
    };
};

const mapDispatchToProps = (dispatch) => ({
    onSave: (data) => dispatch(updateUser(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPage);
