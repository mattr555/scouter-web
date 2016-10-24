import React from "react";
import {Button, Modal, OverlayTrigger} from "react-bootstrap";

class ModalForm extends React.Component {
    static propTypes = {
        onSubmit: React.PropTypes.func,
        submitTooltip: React.PropTypes.element,
        formId: React.PropTypes.string,
        formTitle: React.PropTypes.string,
        children: React.PropTypes.node
    }

    state = {open: false};

    openModal = () => this.setState({open: true})
    closeModal = () => this.setState({open: false})

    render() {
        var {onSubmit, submitTooltip, formId, formTitle, children} = this.props;

        var submitButton = <Button type="submit" form={formId} bsStyle="success">Submit</Button>;
        if (submitTooltip) {
            submitButton = <OverlayTrigger placement="top" overlay={submitTooltip}>
                {submitButton}
            </OverlayTrigger>;
        }

        return <Modal show={this.state.open} onHide={this.closeModal}>
            <Modal.Header closeButton>
                <Modal.Title>{formTitle}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form id={formId} onSubmit={onSubmit}>
                    {children}
                </form>
            </Modal.Body>
            <Modal.Footer>
                {submitButton}
                <Button onClick={this.closeModal}>Close</Button>
            </Modal.Footer>
        </Modal>;
    }
}

export default ModalForm;
