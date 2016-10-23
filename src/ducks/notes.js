import {CALL_API, Schemas} from "../middleware/api";

const ADD_NOTE = "ADD_NOTE";
const ADD_NOTE_SUCCESS = "ADD_NOTE_SUCCESS";
const ADD_NOTE_FAILURE = "ADD_NOTE_FAILURE";

const DELETE_NOTE = "DELETE_NOTE";
const DELETE_NOTE_SUCCESS = "DELETE_NOTE_SUCCESS";
const DELETE_NOTE_FAILURE = "DELETE_NOTE_FAILURE";

const reducer = (state = {fetching: false, error: null}, action) => {
    switch (action.type){
    case ADD_NOTE:
    case DELETE_NOTE:
        return {...state, fetching: true};
    case ADD_NOTE_SUCCESS:
    case DELETE_NOTE_SUCCESS:
        return {fetching: false, error: null};
    case ADD_NOTE_FAILURE:
    case DELETE_NOTE_FAILURE:
        return {fetching: false, error: action.error};
    default:
        return state;
    }
};

const addNote = (note) => ({
    [CALL_API]: {
        types: [ADD_NOTE, ADD_NOTE_SUCCESS, ADD_NOTE_FAILURE],
        schema: Schemas.NOTE,
        url: `/teams/${note.team}/notes/`,
        method: "post",
        data: note
    }
});

const deleteNote = (note) => ({
    [CALL_API]: {
        types: [DELETE_NOTE, DELETE_NOTE_SUCCESS, DELETE_NOTE_FAILURE],
        url: `/teams/${note.team}/notes/${note.id}/`,
        method: "delete"
    }
});

export default reducer;
export {addNote, deleteNote};
