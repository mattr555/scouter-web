import React from "react";
import {connect} from "react-redux";
import {logout} from "ducks/auth";
import {replace} from "react-router-redux";

class Logout extends React.Component {
    static propTypes = {
        logout: React.PropTypes.func
    }

    componentWillMount(){
        this.props.logout();
    }

    render() {
        return <span>Logging out...</span>;
    }
}

const mapDispatchToProps = (dispatch) => ({
    logout: () => {
        dispatch(logout());
        dispatch(replace("/login"));
    }
});

export default connect(null, mapDispatchToProps)(Logout);
