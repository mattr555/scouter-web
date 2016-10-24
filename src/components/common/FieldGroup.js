import React from "react";
import {FormGroup, ControlLabel, FormControl, HelpBlock} from "react-bootstrap";

const FieldGroup = ({id, label, help, children, ...props}) => {
    return <FormGroup controlId={id}>
        <ControlLabel>{label}</ControlLabel>
        <FormControl {...props}>
            {children}
        </FormControl>
        {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>;
};

FieldGroup.propTypes = {
    id: React.PropTypes.string,
    label: React.PropTypes.string,
    help: React.PropTypes.string,
    children: React.PropTypes.node
};

export default FieldGroup;
