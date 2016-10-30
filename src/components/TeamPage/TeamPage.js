import React from "react";
import {connect} from "react-redux";
import {getTeam} from "ducks/teams";
import {addNote, deleteNote, editProps} from "ducks/notes";
import {replace} from "react-router-redux";

import NoteList from "./NoteList";
import AddNoteForm from "./AddNoteForm";
import PropertiesList from "./PropertiesList";
import EditPropertiesForm from "./EditPropertiesForm";

class TeamPage extends React.Component {
    static propTypes = {
        team: React.PropTypes.object,
        notes: React.PropTypes.array,
        schema: React.PropTypes.array,
        getTeam: React.PropTypes.func,
        notFound: React.PropTypes.func,
        onNoteAdd: React.PropTypes.func,
        onNoteDelete: React.PropTypes.func,
        onPropsEdit: React.PropTypes.func
    };

    componentDidMount() {
        if (typeof this.props.team === "undefined") {
            this.props.getTeam()
                .catch((err) => {
                    if (err.response && err.response.status === 404){
                        this.props.notFound();
                    }
                    throw err;
                });
        }
    }

    render() {
        const {team, notes, schema, onNoteAdd, onNoteDelete, onPropsEdit} = this.props;

        if (typeof team === "undefined" || typeof schema === "undefined") return <span>Loading...</span>;

        let initialTeamProps = {};
        if (team.robot_props) team.robot_props.forEach((p) => initialTeamProps[p.name] = p.value);

        return <div>
            <h3>{team.license}</h3>
            {team.name}
            <br/>
            <PropertiesList teamProps={team.robot_props}/>
            <EditPropertiesForm schema={schema} initialValues={initialTeamProps} onSubmit={onPropsEdit}/>
            <AddNoteForm onSubmit={onNoteAdd}/>
            <NoteList notes={notes} onDelete={onNoteDelete}/>
        </div>;
    }
}

const mapStateToProps = ({entities, schemaBuilder}, ownProps) => {
    var team = entities.team[ownProps.params.id], notes;
    if (team) {
        notes = team.notes.map((i) => entities.note[i]);
    }
    return {
        team: team,
        notes: notes,
        schema: schemaBuilder
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
        onNoteDelete: (note) => {
            return dispatch(deleteNote(note))
                .then(_getTeam);
        },
        onPropsEdit: (props) => {
            return dispatch(editProps(ownProps.params.id, props))
                .then(_getTeam);
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TeamPage);
