import React from "react";
import {Button, Modal, Glyphicon, FormGroup, FormControl, ControlLabel, OverlayTrigger, Tooltip} from "react-bootstrap";

class AddNoteForm extends React.Component {
    initialState = {open: false, form: {body: ""}}
    state = this.initialState

    static propTypes = {
        onSubmit: React.PropTypes.func
    }

    openModal = () => this.setState({open: true});
    closeModal = () => this.setState({open: false});

    onChange = (event) => {
        this.setState({
            form: {...this.state.form, [event.target.name]: event.target.value}
        });
    }

    onKeyDown = (event) => {
        console.log("clicked");
        if (event.keyCode === 13 && event.ctrlKey) {
            this.submit(event);
        }
    }

    submit = (event) => {
        event.preventDefault();
        this.props.onSubmit(this.state.form);
        this.setState({form: this.initialState.form});
        this.closeModal();
    }

    render(){
        const ctrlTooltip = (<Tooltip id="ctrlTooltip">(Ctrl + Enter)</Tooltip>);

        //TODO: extract form out
        return <div>
            <Button bsStyle="success" onClick={this.openModal}>
                <Glyphicon glyph="plus" /> Add New Note
            </Button>
            <Modal show={this.state.open} onHide={this.closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>New Note</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form id="addNoteForm" onSubmit={this.submit}>
                        <FormGroup controlId="note_body">
                            <ControlLabel>Note body</ControlLabel>
                            <FormControl componentClass="textarea" value={this.state.form.body} name="body" onChange={this.onChange} onKeyDown={this.onKeyDown} />
                        </FormGroup>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <OverlayTrigger placement="top" overlay={ctrlTooltip}>
                        <Button type="submit" form="addNoteForm" bsStyle="success">Submit</Button>
                    </OverlayTrigger>
                    <Button onClick={this.closeModal}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>;
    }
}

export default AddNoteForm;
