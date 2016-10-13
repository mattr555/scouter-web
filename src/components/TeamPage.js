import React from "react";
import {connect} from "react-redux";
import {getTeam} from "../ducks/teams";
import {replace} from "react-router-redux";

class TeamPage extends React.Component {
    static propTypes = {
        team: React.PropTypes.object,
        getTeam: React.PropTypes.func,
        notFound: React.PropTypes.func
    };

    componentDidMount() {
        if (typeof this.props.team === "undefined") {
            this.props.getTeam()
                .catch((err) => {
                    if (err.response.status === 404){
                        this.props.notFound();
                    }
                });
        }
    }

    render() {
        const {team} = this.props;

        if (typeof team === "undefined") return <span>Loading...</span>;
        return <div>
            <h3>{team.license}</h3>
            {team.name}
        </div>;
    }
}

const mapStateToProps = ({entities}, ownProps) => ({
    team: entities.team[ownProps.params.id],
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    getTeam: () => dispatch(getTeam(ownProps.params.id)),
    notFound: () => dispatch(replace("/404"))
});

export default connect(mapStateToProps, mapDispatchToProps)(TeamPage);
