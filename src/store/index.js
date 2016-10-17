import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import {browserHistory} from "react-router";
import {routerReducer, routerMiddleware, syncHistoryWithStore} from "react-router-redux";
import {loadState, saveState} from "./localStorage";
import {apiMiddleware} from "../middleware/api";
import auth from "../ducks/auth";
import user from "../ducks/user";
import teams from "../ducks/teams";
import entities from "../ducks/entities";
import messages from "../ducks/messages";
import schemaBuilder from "../ducks/schemaBuilder";

const store = createStore(
    combineReducers({
        auth,
        user,
        teams,
        entities,
        messages,
        schemaBuilder,
        routing: routerReducer
    }),
    loadState(),
    composeWithDevTools(applyMiddleware(thunk, apiMiddleware, routerMiddleware(browserHistory)))
);

store.subscribe(() => {
    const state = store.getState();
    saveState({
        auth: state.auth
    });
});

const history = syncHistoryWithStore(browserHistory, store);

export {store, history};
