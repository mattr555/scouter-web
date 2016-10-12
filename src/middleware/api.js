import {api} from "../util";
import {Schema, arrayOf, normalize} from "normalizr";

const userSchema = new Schema("user", {idAttribute: "id"});
const teamSchema = new Schema("team", {idAttribute: "license"});
const noteSchema = new Schema("note", {idAttribute: "id"});

teamSchema.define({
    notes: arrayOf(noteSchema)
});

noteSchema.define({
    team: teamSchema,
    user: userSchema
});

export const Schemas = {
    USER: userSchema,
    USER_LIST: arrayOf(userSchema),
    NOTE: noteSchema,
    NOTE_LIST: arrayOf(noteSchema),
    TEAM: teamSchema,
    TEAM_LIST: arrayOf(teamSchema)
};

export const CALL_API = "CALL_API";

export const apiMiddleware = store => next => action => {
    const call = action[CALL_API];
    if (typeof call === "undefined"){
        return next(action);
    }

    const {types, schema, ...config} = call;
    const [requestType, successType, failureType] = types;

    const {auth} = store.getState();
    if (auth.token) {
        config.oauth_token = auth.token;
    }

    const actionWith = (data) => {
        const finalAction = {...action, ...data};
        delete finalAction[CALL_API];
        return finalAction;
    };

    next(actionWith({type: requestType}));
    return api(config)
        .then(response => {
            if (schema) return normalize(response.data, schema);
            return response.data;
        })
        .then(response => next(actionWith({type: successType, response})))
        .catch(error => {
            next(actionWith({type: failureType, error}));
            throw error;
        });
};
