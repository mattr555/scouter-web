// import assign from "lodash/assign";

const reducer = (state = {user: {}, team: {}, note: {}}, action) => {
    if (action.response && action.response.entities) {
        return {...state, ...action.response.entities};
    }
    return state;
};

export default reducer;
