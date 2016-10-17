import React from "react";
import {connect} from "react-redux";
import SchemaBuilder from "./SchemaBuilder";

const SettingsPage = ({user}) => (
    <div>
        <h3>Settings</h3>
        <SchemaBuilder />
    </div>
);

SettingsPage.propTypes = {
    user: React.PropTypes.object
};

const mapStateToProps = ({entities, user}) => {
    return {
        user: entities.user[user.user],
    };
};

export default connect(mapStateToProps)(SettingsPage);
