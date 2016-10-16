import axios from "axios";
import qs from "qs";
import {API_URL} from "./config";
import {store} from "./store";
import {logout, authError} from "./ducks/auth";
import {replace} from "react-router-redux";

const api = axios.create({
    baseURL: API_URL,
    headers: {
        post: { "Content-Type": "application/x-www-form-urlencoded"}
    },
    transformRequest: [function(data){
        return qs.stringify(data);
    }]
});

api.interceptors.request.use((config) => {
    if (config.oauth_token) {
        config.headers["Authorization"] = "Bearer " + config.oauth_token;
    }
    return config;
});

api.interceptors.response.use(
    (resp) => resp,
    (err) => {
        const {status} = err.response;
        if (status === 401 || status === 403) {
            const last = store.getState().routing.locationBeforeTransitions.pathname;

            store.dispatch(logout());
            store.dispatch(authError({message: "Your session has expired."}));
            store.dispatch(replace("/login?next=" + last));
        }
        throw err;
    }
);

const requireAuth = (nextState, replace) => {
    console.log(nextState);
    if (!store.getState().auth.token) {
        replace("/login?next=" + nextState.location.pathname);
    }
};

const capitalizeTeam = (nextState, replace) => {
    const {pathname} = nextState.location;
    let pathList = nextState.location.pathname.split("/");
    pathList[2] = pathList[2].toUpperCase();
    const newName = pathList.join("/");
    if (newName !== pathname){
        replace(pathList.join("/"));
    }
};

export {api, requireAuth, capitalizeTeam};
