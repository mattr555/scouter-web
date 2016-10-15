import React from "react";
import {Panel, Button} from "react-bootstrap";
import moment from "moment";

const Note = ({note, onDelete}) => {
    const deleteNote = () => {
        onDelete(note.id);
    };

    return <Panel header={moment(note.created).fromNow()}>
        <div>{note.body}</div>
        <Button bsSize="small" bsStyle="danger" onClick={deleteNote}>Delete</Button>
    </Panel>;
};

Note.propTypes = {
    note: React.PropTypes.object,
    onDelete: React.PropTypes.func
};

export default Note;
