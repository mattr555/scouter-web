import React from "react";
import {connect} from "react-redux";
import {getTeam} from "ducks/teams";
import {addNote, deleteNote} from "ducks/notes";
import {replace} from "react-router-redux";

import NoteList from "./NoteList";
import AddNoteForm from "./AddNoteForm";

class TeamPage extends React.Component {
    static propTypes = {
        team: React.PropTypes.object,
        notes: React.PropTypes.array,
        getTeam: React.PropTypes.func,
        notFound: React.PropTypes.func,
        onNoteAdd: React.PropTypes.func,
        onNoteDelete: React.PropTypes.func
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
        const {team, notes, onNoteAdd, onNoteDelete} = this.props;

        if (typeof team === "undefined") return <span>Loading...</span>;
        return <div>
            <h3>{team.license}</h3>
            {team.name}
            <AddNoteForm onSubmit={onNoteAdd}/>
            <NoteList notes={notes} onDelete={onNoteDelete}/>
        </div>;
    }
}

const mapStateToProps = ({entities}, ownProps) => {
    var team = entities.team[ownProps.params.id], notes;
    if (team) {
        notes = team.notes.map((i) => entities.note[i]);
    }
    return {
        team: team,
        notes: notes
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    const _getTeam = () => {
        return dispatch(getTeam(ownProps.params.id));
    };

    return {
        getTeam: _getTeam,
        notFound: () => dispatch(replace("/404")),
        onNoteAdd: (note) => {
            return dispatch(addNote({...note, team: ownProps.params.id}))
                .then(_getTeam);

        },
        onNoteDelete: (id) => {
            return dispatch(deleteNote(id))
                .then(_getTeam);
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TeamPage);
