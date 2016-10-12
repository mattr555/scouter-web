import React from "react";
import {Alert} from "react-bootstrap";
import {connect} from "react-redux";
import {displayMessage} from "../ducks/messages";

class Message extends React.Component {
    static propTypes = {
        message: React.PropTypes.object,
        pathname: React.PropTypes.string,
        displayed: React.PropTypes.func
    };

    state = {messageOpen: true}

    closeMessage = () => {
        this.setState({messageOpen: false});
    }

    componentDidMount(){
        this.loc = this.props.pathname;
        console.log("mounted", this.loc);
    }

    componentDidUpdate(){
        console.log("updated", this.props.pathname);
        if (this.loc !== this.props.pathname){
            this.props.displayed();
        }
    }

    render(){
        if (this.state.messageOpen){
            const {message} = this.props;
            return <Alert bsStyle={message.style} onDismiss={this.closeMessage}>
                {message.content}
            </Alert>;
        }
        return <span/>;
    }
}

const mapStateToProps = ({routing}) => ({pathname: routing.locationBeforeTransitions.pathname});
const mapDispatchToProps = (dispatch, ownProps) => ({
    displayed: () => dispatch(displayMessage(ownProps.message.id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Message);
