import {CALL_API, Schemas} from "../middleware/api";

// TODO: determine better organization of these actions
// do they even need the reducer? should they even be using redux?

const ADD_NOTE = "ADD_NOTE";
const ADD_NOTE_SUCCESS = "ADD_NOTE_SUCCESS";
const ADD_NOTE_FAILURE = "ADD_NOTE_FAILURE";

const DELETE_NOTE = "DELETE_NOTE";
const DELETE_NOTE_SUCCESS = "DELETE_NOTE_SUCCESS";
const DELETE_NOTE_FAILURE = "DELETE_NOTE_FAILURE";

const EDIT_PROPS = "EDIT_PROPS";
const EDIT_PROPS_SUCCESS = "EDIT_PROPS_SUCCESS";
const EDIT_PROPS_FAILURE = "EDIT_PROPS_FAILURE";

const reducer = (state = {fetching: false, error: null}, action) => {
    switch (action.type){
    case ADD_NOTE:
    case DELETE_NOTE:
    case EDIT_PROPS:
        return {...state, fetching: true};
    case ADD_NOTE_SUCCESS:
    case DELETE_NOTE_SUCCESS:
    case EDIT_PROPS_SUCCESS:
        return {fetching: false, error: null};
    case ADD_NOTE_FAILURE:
    case DELETE_NOTE_FAILURE:
    case EDIT_PROPS_FAILURE:
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

const editProps = (team, props) => ({
    [CALL_API]: {
        types: [EDIT_PROPS, EDIT_PROPS_SUCCESS, EDIT_PROPS_FAILURE],
        url: `/teams/${team}/props/`,
        method: "post",
        data: {props: props}
    }
});

export default reducer;
export {addNote, deleteNote, editProps};
