import {CALL_API, Schemas} from "../middleware/api";
import {LOGOUT} from "./auth";
import {asyncReducer} from "./asyncRequest";

const GET_TEAMS = "GET_TEAMS";
const GET_TEAMS_SUCCESS = "GET_TEAMS_SUCCESS";
const GET_TEAMS_FAILURE = "GET_TEAMS_FAILURE";

const TYPES = [GET_TEAMS, GET_TEAMS_SUCCESS, GET_TEAMS_FAILURE, LOGOUT];

const reducer = asyncReducer({
    types: TYPES,
    initKey: "teams",
    mapResponseToValue: (resp) => resp.result
});

const getTeams = () => ({
    [CALL_API]: {
        types: TYPES,
        schema: Schemas.TEAM_LIST,
        method: "get",
        url: "/teams/"
    }
});

const getTeam = (license) => ({
    [CALL_API]: {
        types: TYPES,
        schema: Schemas.TEAM,
        method: "get",
        url: `/teams/${license}/`
    }
});

export default reducer;
export {getTeams, getTeam};
