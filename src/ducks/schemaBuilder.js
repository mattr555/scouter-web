import {GET_USER_SUCCESS} from "./user";
import {LOGOUT} from "./auth";

const CHANGE_FIELD = "CHANGE_FIELD";
const DELETE_FIELD = "DELETE_FIELD";
const ADD_FIELD = "ADD_FIELD";

const defaultField = {name: "name", type: "number"};

const reducer = (state = [], action) => {
    switch (action.type){
    case GET_USER_SUCCESS: {
        const user = action.response.entities.user[action.response.result];
        return user.robot_fields.map((f, i) => ({...f, id: i}));
    }
    case CHANGE_FIELD: {
        let newState = [];
        for (let f of state) {
            if (f.id == action.field.id) {
                newState.push(action.field);
            } else {
                newState.push(f);
            }
        }
        return newState;
    }
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

export default reducer;
export {changeField, deleteField, addField};
