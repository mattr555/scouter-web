// import assign from "lodash/assign";
import defaultsDeep from "lodash/defaultsDeep";

const reducer = (state = {user: {}, team: {}, note: {}}, action) => {
    if (action.response && action.response.entities) {
        return defaultsDeep({}, action.response.entities, state);
    }
    return state;
};

export default reducer;
