import React from "react";
import ReactDOM from "react-dom";
import {Router, Route, IndexRoute} from "react-router";
import {Provider} from "react-redux";

import {store, history} from "./store";
import Login from "./components/Login";
import Logout from "./components/Logout";
import App from "./components/App";
import HomePage from "./components/HomePage";
import TeamPage from "./components/TeamPage";
import SettingsPage from "./components/SettingsPage";
import FourOhFour from "./components/FourOhFour";

import {requireAuth, capitalizeTeam} from "./util";


ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <Route path='/login' component={Login}/>
            <Route path='/logout' component={Logout}/>
            <Route path='/' component={App} onEnter={requireAuth}>
                <IndexRoute component={HomePage} />
                <Route path='team/:id' component={TeamPage} onEnter={capitalizeTeam} />
                <Route path='settings' component={SettingsPage} />
            </Route>
            <Route path='*' component={FourOhFour} />
        </Router>
    </Provider>,
    document.getElementById("root")
);
