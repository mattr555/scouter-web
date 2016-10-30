import React from "react";
import {Table, Button, FormControl, Glyphicon} from "react-bootstrap";
import {connect} from "react-redux";
import {Field, getFormValues} from "redux-form";

const disabledStyle = {opacity: 0};

const renderField = ({input, children, meta, ...rest}) => {
    return <FormControl value={input.value} onChange={input.onChange} {...rest}>
        {children}
    </FormControl>;
};

renderField.propTypes = {
    input: React.PropTypes.object,
    children: React.PropTypes.node,
    meta: React.PropTypes.object
};

class SchemaBuilder extends React.Component {
    // TODO: convert this to redux-form with FieldArray (should make schemaBuilder duck obsolete)
    static propTypes = {
        fields: React.PropTypes.any,
        values: React.PropTypes.object
    }

    render() {
        const {fields, values} = this.props;

        var rows = fields.map((r, i) => {
            var optionSelect = "n/a";
            if (values.robot_fields[i].type === "option") {
                optionSelect = <Field
                    type="text"
                    component={renderField}
                    name={`${r}.options`}
                    placeholder="comma separated"
                    format={(v) => v.join(",")}
                    parse={(v) => v.split(",")}
                    />;
            }

            var top = i === 0;
            var bottom = i === fields.length - 1;
            return <tr key={i}>
                <td>
                    <Field
                        type="text"
                        component={renderField}
                        name={`${r}.name`}/>
                </td>
                <td>
                    <Field
                        component={renderField}
                        componentClass="select"
                        name={`${r}.type`}>
                        <option value="number">Number</option>
                        <option value="option">Option</option>
                        <option value="badgood">Bad / Meh / Good</option>
                    </Field>
                </td>
                <td>
                    {optionSelect}
                </td>
                <td>
                    <Button bsSize="xsmall" bsStyle="danger" onClick={() => fields.remove(i)}><Glyphicon glyph="trash"/></Button>
                    <Button bsSize="xsmall" bsStyle="link" onClick={() => fields.swap(i, i-1)} disabled={top} style={top && disabledStyle || {}}><Glyphicon glyph="chevron-up"/></Button>
                    <Button bsSize="xsmall" bsStyle="link" onClick={() => fields.swap(i, i+1)} disabled={bottom} style={bottom && disabledStyle || {}}><Glyphicon glyph="chevron-down"/></Button>
                </td>
            </tr>;
        });

        return <div>
            <Table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Options</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </Table>
            <Button onClick={() => fields.push({type: "number"})} bsStyle="success">Add</Button>
        </div>;
    }
}

export default connect(state => ({
    values: getFormValues("userSettings")(state)
}))(SchemaBuilder);
