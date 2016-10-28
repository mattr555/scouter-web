import React from "react";
import {FormGroup, ControlLabel, FormControl, HelpBlock} from "react-bootstrap";

const FieldGroup = ({input, meta, id, label, help, children, ...props}) => {
    const valClass = meta.touched && meta.error && "error" || undefined;
    return <FormGroup controlId={id} validationState={valClass}>
        {label && <ControlLabel>{label}</ControlLabel>}
        <FormControl value={input.value} onChange={input.onChange} {...props}>
            {children}
        </FormControl>
        {help && <HelpBlock>{help}</HelpBlock>}
        {meta.touched && meta.error && <HelpBlock>{meta.error}</HelpBlock>}
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
