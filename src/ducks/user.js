import {CALL_API, Schemas} from "../middleware/api";
import {LOGOUT} from "./auth";
import {asyncReducer} from "./asyncRequest";

const GET_USER = "GET_USER";
const GET_USER_SUCCESS = "GET_USER_SUCCESS";
const GET_USER_FAILURE = "GET_USER_FAILURE";

const TYPES = [GET_USER, GET_USER_SUCCESS, GET_USER_FAILURE, LOGOUT];

const reducer = asyncReducer({
    types: TYPES,
    initKey: "user",
    initValue: {},
    mapResponseToValue: (resp) => resp.result
});

const getUser = () => ({
    [CALL_API]: {
        types: TYPES,
        schema: Schemas.USER,
        method: "get",
        url: "/users/me/",
    }
});

export default reducer;
export {getUser, GET_USER_SUCCESS};
