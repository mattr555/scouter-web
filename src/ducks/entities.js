import merge from "lodash/merge";

const reducer = (state = {user: {}, team: {}, note: {}}, action) => {
    if (action.response && action.response.entities) {
        return merge({}, state, action.response.entities);
    }
    return state;
};

export default reducer;
