import React from "react";
import {connect} from "react-redux";
import {getTeams} from "ducks/teams";
import TeamList from "./TeamList";

class HomePage extends React.Component {
    static propTypes = {
        teams: React.PropTypes.array,
        getTeams: React.PropTypes.func
    }

    componentWillMount(){
        // if (this.props.teams === null){
        this.props.getTeams();
        // }
    }

    render() {
        return (
            <div>
                <h3>Home</h3>
                <TeamList teams={this.props.teams}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    let teams = state.teams.teams;
    let ents = state.entities.team;

    if (typeof teams === "string") teams = [teams];
    if (teams) teams = teams.map(id => ents[id]);

    return {
        teams
    };
};
const mapDispatchToProps = (dispatch) => ({
    getTeams: () => dispatch(getTeams())
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
