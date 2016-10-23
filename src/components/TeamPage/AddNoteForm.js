import React from "react";
import {Button, Glyphicon, Tooltip} from "react-bootstrap";
import {FieldGroup, ModalForm} from "components/common";

class AddNoteForm extends React.Component {
    initialState = {form: {body: ""}}
    state = this.initialState

    static propTypes = {
        onSubmit: React.PropTypes.func
    }

    onChange = (event) => {
        this.setState({
            form: {...this.state.form, [event.target.name]: event.target.value}
        });
    }

    onKeyDown = (event) => {
        if (event.keyCode === 13 && event.ctrlKey) {
            this.submit(event);
        }
    }

    submit = (event) => {
        event.preventDefault();
        this.props.onSubmit(this.state.form);
        this.setState({form: this.initialState.form});
        this.addNoteModal.closeModal();
    }

    render(){
        const ctrlTooltip = (<Tooltip id="ctrlTooltip">(Ctrl + Enter)</Tooltip>);

        return <div>
            <Button bsStyle="success" onClick={() => this.addNoteModal.openModal()}>
                <Glyphicon glyph="plus" /> Add New Note
            </Button>
            <ModalForm
                onSubmit={this.submit}
                submitTooltip={ctrlTooltip}
                formId="addNoteForm"
                formTitle="New Note"
                ref={(e) => this.addNoteModal = e}
                >
                <FieldGroup
                    id="note_body"
                    label="Note body"
                    componentClass="textarea"
                    value={this.state.form.body}
                    name="body"
                    onChange={this.onChange}
                    onKeyDown={this.onKeyDown}
                    />
            </ModalForm>
        </div>;
    }
}

export default AddNoteForm;
