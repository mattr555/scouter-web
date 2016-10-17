import {GET_USER_SUCCESS} from "./user";
import {LOGOUT} from "./auth";

const CHANGE_FIELD = "CHANGE_FIELD";
const DELETE_FIELD = "DELETE_FIELD";
const ADD_FIELD = "ADD_FIELD";
const MOVE_FIELD_UP = "MOVE_FIELD_UP";
const MOVE_FIELD_DOWN = "MOVE_FIELD_DOWN";

const defaultField = {name: "", type: "number"};

const reducer = (state = [], action) => {
    switch (action.type){
    case GET_USER_SUCCESS: {
        const user = action.response.entities.user[action.response.result];
        return user.robot_fields.map((f, i) => ({...f, id: i}));
    }
    case CHANGE_FIELD:
        return state.map((f) => f.id === action.field.id ? action.field : f);
    case DELETE_FIELD:
        return state.filter((f) => f.id !== action.id);
    case ADD_FIELD:
        return [
            ...state,
            {
                ...defaultField,
                id: state.reduce((maxId, f) => Math.max(maxId, f.id), -1) + 1
            }
        ];
    case MOVE_FIELD_UP:{
        const oldInd = state.findIndex((f) => f.id === action.id);
        if (oldInd === 0 || oldInd === -1) return state;
        const toMove = state.splice(oldInd, 1)[0];
        return state.slice(0, oldInd-1).concat(Array.of(toMove).concat(state.slice(oldInd-1)));
    }
    case MOVE_FIELD_DOWN:{
        const oldInd = state.findIndex((f) => f.id === action.id);
        if (oldInd === state.length - 1 || oldInd === -1) return state;
        const toMove = state.splice(oldInd, 1)[0];
        return state.slice(0, oldInd+1).concat(Array.of(toMove).concat(state.slice(oldInd+1)));
    }
    case LOGOUT:
        return [];
    default:
        return state;
    }
};

const changeField = (field) => ({
    type: CHANGE_FIELD,
    field
});

const deleteField = (id) => ({
    type: DELETE_FIELD,
    id
});

const addField = () => ({type: ADD_FIELD});

const moveFieldUp = (id) => ({
    type: MOVE_FIELD_UP,
    id
});

const moveFieldDown = (id) => ({
    type: MOVE_FIELD_DOWN,
    id
});

export default reducer;
export {changeField, deleteField, addField, moveFieldUp, moveFieldDown};
