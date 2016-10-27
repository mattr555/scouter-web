import React from "react";
import {FormGroup, ControlLabel, FormControl, HelpBlock} from "react-bootstrap";

const FieldGroup = ({input, id, label, help, children, ...props}) => {
    return <FormGroup controlId={id}>
        <ControlLabel>{label}</ControlLabel>
        <FormControl value={input.value} onChange={input.onChange} {...props}>
            {children}
        </FormControl>
        {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>;
};

FieldGroup.propTypes = {
    id: React.PropTypes.string,
    label: React.PropTypes.string,
    help: React.PropTypes.string,
    children: React.PropTypes.node,
    input: React.PropTypes.object,
    meta: React.PropTypes.object
};

export default FieldGroup;
