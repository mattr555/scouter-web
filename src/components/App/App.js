import React from "react";
import {connect} from "react-redux";
import {getUser} from "ducks/user";
import Header from "./Header";
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
        var messages;

        if (this.props.messages){
            messages = (
                <div>
                    {this.props.messages.map((m) => <Message message={m} key={m.id}/>)}
                </div>
            );
        }

        return (
            <div>
                <Header user={this.props.user}/>
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
