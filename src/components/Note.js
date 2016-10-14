import React from "react";
import {Panel, Button} from "react-bootstrap";
import moment from "moment";

class Note extends React.Component {
    static propTypes = {
        note: React.PropTypes.object,
        onDelete: React.PropTypes.func
    }

    deleteNote = () => {
        this.props.onDelete(this.props.note.id);
    }

    render() {
        const {note} = this.props;
        return <Panel header={moment(note.created).fromNow()}>
            <div>{note.body}</div>
            <Button bsSize="small" bsStyle="danger" onClick={this.deleteNote}>Delete</Button>
        </Panel>;
    }
}

export default Note;
