import React from "react";
import Note from "./Note";

const NoteList = ({notes, onDelete}) => {
    const note = (note) => (
        <Note note={note} key={note.id} onDelete={onDelete} />
    );

    var noteElems = notes.map(note);

    return <div>{noteElems}</div>;
};

NoteList.propTypes = {
    notes: React.PropTypes.array,
    onDelete: React.PropTypes.func
};

export default NoteList;
