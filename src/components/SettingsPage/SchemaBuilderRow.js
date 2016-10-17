import React from "react";
import {FormControl, Button, Glyphicon} from "react-bootstrap";

const disabledStyle = {
    opacity: 0
};

class SchemaBuilderRow extends React.Component {
    static propTypes = {
        data: React.PropTypes.object,
        onChange: React.PropTypes.func,
        onDelete: React.PropTypes.func,
        onUp: React.PropTypes.func,
        onDown: React.PropTypes.func,
        top: React.PropTypes.bool,
        bottom: React.PropTypes.bool
    }

    // state = {form: {...this.props.data, options: this.props.data.options && this.props.data.options.join(",") || ""}}

    onChange = (event) => {
        // this.setState({
        //     form: {...this.state.form, [event.target.name]: event.target.value}
        // });
        const newForm = {...this.props.data, [event.target.name]: event.target.value};
        let options = newForm.options;
        if (newForm.type !== "option") {
            delete newForm.options;
            this.props.onChange(newForm);
            return;
        } else if (typeof options === "string"){
            options = options.split(",");
        } else if (typeof options === "undefined"){
            options = [];
        }
        this.props.onChange({...newForm, options});
    }

    onDelete = () => this.props.onDelete(this.props.data.id)
    onUp = () => this.props.onUp(this.props.data.id)
    onDown = () => this.props.onDown(this.props.data.id)

    render() {
        const {data, top, bottom} = this.props;
        var optionSelect = "n/a";

        if (data.type === "option") {
            const options = data.options && data.options.join(",") || "";
            optionSelect = (
                <FormControl
                    type="text"
                    name="options"
                    placeholder="comma separated"
                    value={options}
                    onChange={this.onChange} />
            );
        }

        return <tr>
            <td>
                <FormControl
                    type="text"
                    name="name"
                    value={data.name}
                    onChange={this.onChange} />
            </td>
            <td>
                <FormControl
                    componentClass="select"
                    name="type"
                    value={data.type}
                    onChange={this.onChange}>
                    <option value="number">Number</option>
                    <option value="option">Option</option>
                    <option value="badgood">Bad / Meh / Good</option>
                </FormControl>
            </td>
            <td>
                {optionSelect}
            </td>
            <td>
                <Button bsSize="xsmall" bsStyle="danger" onClick={this.onDelete}><Glyphicon glyph="trash"/></Button>
                <Button bsSize="xsmall" bsStyle="link" onClick={this.onUp} disabled={top} style={top && disabledStyle || {}}><Glyphicon glyph="chevron-up"/></Button>
                <Button bsSize="xsmall" bsStyle="link" onClick={this.onDown} disabled={bottom} style={bottom && disabledStyle || {}}><Glyphicon glyph="chevron-down"/></Button>
            </td>
        </tr>;
    }
}

export default SchemaBuilderRow;
