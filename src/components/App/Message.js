import React from "react";
import {Alert} from "react-bootstrap";
import {connect} from "react-redux";
import {closeMessage} from "ducks/messages";

class Message extends React.Component {
    static propTypes = {
        message: React.PropTypes.object,
        pathname: React.PropTypes.string,
        closed: React.PropTypes.func
    };

    closeMessage = () => {
        this.props.closed();
    }

    componentDidMount(){
        this.loc = this.props.pathname;
        console.log("mounted", this.loc);
    }

    componentDidUpdate(){
        console.log("updated", this.props.pathname);
        if (this.loc !== this.props.pathname){
            this.props.closed();
        }
    }

    render(){
        const {message} = this.props;
        return <Alert bsStyle={message.style} onDismiss={this.closeMessage}>
            {message.content}
        </Alert>;
    }
}

const mapStateToProps = ({routing}) => ({pathname: routing.locationBeforeTransitions.pathname});
const mapDispatchToProps = (dispatch, ownProps) => ({
    closed: () => dispatch(closeMessage(ownProps.message.id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Message);
