const reducer = (state = {user: {}, team: {}, note: {}}, action) => {
    if (action.response && action.response.entities) {
        var newState = {...state};
        for (const type of Object.keys(action.response.entities)) {
            for (const ent of Object.keys(action.response.entities[type])){
                newState[type][ent] = action.response.entities[type][ent];
            }
        }
        return newState;
    }
    return state;
};

export default reducer;
