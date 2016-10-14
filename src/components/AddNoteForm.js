import React from "react";
import {Button, Modal, Glyphicon, FormGroup, FormControl} from "react-bootstrap";

class AddNoteForm extends React.Component {
    state = {open: false, form: {body: ""}}

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

    submit = (event) => {
        event.preventDefault();
        this.props.onSubmit(this.state.form);
        this.closeModal();
    }

    render(){
        return <div>
            <Button bsStyle="success" onClick={this.openModal}>
                <Glyphicon glyph="plus" /> Add New Note
            </Button>
            <Modal show={this.state.open} onHide={this.closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Hi</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form id="addNoteForm" onSubmit={this.submit}>
                        <FormGroup controlId="note_body">
                            <FormControl componentClass="textarea" value={this.state.form.body} name="body" onChange={this.onChange} />
                        </FormGroup>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button type="submit" form="addNoteForm" bsStyle="success">Submit</Button>
                    <Button onClick={this.closeModal}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>;
    }
}

export default AddNoteForm;
