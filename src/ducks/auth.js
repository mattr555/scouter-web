import {CLIENT_ID} from "../config";
import {CALL_API} from "../middleware/api";
import {asyncReducer} from "./asyncRequest";
import qs from "qs";

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
        data: qs.stringify({
            client_id: CLIENT_ID,
            grant_type: "password",
            username,
            password
        }),
        headers: {"Content-Type": "application/x-www-form-urlencoded"}
    }
});

const logout = () => ({type: LOGOUT});
const authError = (error) => ({type: LOGIN_FAILURE, error});

export default reducer;
export {login, logout, authError, LOGOUT};
