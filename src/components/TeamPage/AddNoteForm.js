import React from "react";
import {Button, Glyphicon, Tooltip} from "react-bootstrap";
import {Field, reduxForm} from "redux-form";
import {FieldGroup, ModalForm} from "components/common";

class AddNoteForm extends React.Component {
    static propTypes = {
        onSubmit: React.PropTypes.func,
        handleSubmit: React.PropTypes.func,
        reset: React.PropTypes.func
    }

    onKeyDown = (event) => {
        if (event.keyCode === 13 && event.ctrlKey) {
            this.submit(event);
        }
    }

    submit = (event) => {
        event.preventDefault();
        this.props.handleSubmit(event).then(() => {
            this.addNoteModal.closeModal();
            this.props.reset();
        });

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
                <Field
                    component={FieldGroup}
                    id="note_body"
                    label="Note body"
                    componentClass="textarea"
                    name="body"
                    />
            </ModalForm>
        </div>;
    }
}

export default reduxForm({
    form: "newNote"
})(AddNoteForm);
