import React from "react";
import Note from "./Note";

const NoteList = ({notes}) => {
    const note = (note) => (
        <Note note={note} key={note.id} onDelete={(id) => console.log(id)}></Note>
    );

    var noteElems = notes.map(note);

    return <div>{noteElems}</div>;
};

NoteList.propTypes = {
    notes: React.PropTypes.array
};

export default NoteList;
