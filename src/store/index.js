import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import {browserHistory} from "react-router";
import {routerReducer, routerMiddleware, syncHistoryWithStore} from "react-router-redux";
import {reducer as formReducer} from "redux-form";
import throttle from "lodash/throttle";
import {loadState, saveState} from "./localStorage";
import {apiMiddleware} from "../middleware/api";
import auth from "../ducks/auth";
import user from "../ducks/user";
import teams from "../ducks/teams";
import entities from "../ducks/entities";
import messages from "../ducks/messages";

const store = createStore(
    combineReducers({
        auth,
        user,
        teams,
        entities,
        messages,
        routing: routerReducer,
        form: formReducer
    }),
    loadState(),
    composeWithDevTools(applyMiddleware(thunk, apiMiddleware, routerMiddleware(browserHistory)))
);

store.subscribe(throttle(() => {
    const state = store.getState();
    saveState({
        auth: state.auth
    });
}, 1000));

const history = syncHistoryWithStore(browserHistory, store);

export {store, history};
