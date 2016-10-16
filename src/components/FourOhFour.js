import React from "react";
import {connect} from "react-redux";
import {addMessage} from "ducks/messages";
import {replace} from "react-router-redux";


class FourOhFour extends React.Component {
    static propTypes = {
        onEnter: React.PropTypes.func
    }

    componentWillMount(){
        this.props.onEnter();
    }

    render(){
        return <span>Not found, redirecting...</span>;
    }
}

export default connect(null, (dispatch) => ({
    onEnter: () => {
        dispatch(replace("/"));
        dispatch(addMessage({content: "Not found!", style: "warning"}));
    }
}))(FourOhFour);
