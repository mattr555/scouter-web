import React from "react";
import {Panel, Button} from "react-bootstrap";
import moment from "moment";

const Note = ({note, onDelete}) => {
    const deleteNote = () => {
        onDelete(note);
    };

    const header = (<div className="clearfix">
        <div className="pull-left">{moment(note.created).fromNow()}</div>
        <div className="pull-right">
            <Button bsSize="xsmall" bsStyle="danger" onClick={deleteNote}>Delete</Button>
        </div>
    </div>);

    return <Panel header={header}>
        <div>{note.body}</div>
    </Panel>;
};

Note.propTypes = {
    note: React.PropTypes.object,
    onDelete: React.PropTypes.func
};

export default Note;
