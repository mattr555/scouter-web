import {CLIENT_ID} from "../config";
import {CALL_API} from "../middleware/api";
import {asyncReducer} from "./asyncRequest";

const LOGIN = "LOGIN";
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGIN_FAILURE = "LOGIN_FAILURE";
const LOGOUT = "LOGOUT";

const TYPES = [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT];

const reducer = asyncReducer({
    types: TYPES,
    initKey: "token",
    initValue: "",
    mapResponseToValue: (resp) => (resp.access_token)
});

const login = (username, password) => ({
    [CALL_API]: {
        types: TYPES,
        method: "post",
        url: "/o/token/",
        data: {
            client_id: CLIENT_ID,
            grant_type: "password",
            username,
            password
        }
    }
});

const logout = () => ({type: LOGOUT});

export default reducer;
export {login, logout, LOGOUT};
