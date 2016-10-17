import React from "react";
import {FormControl, Button, Glyphicon} from "react-bootstrap";

class SchemaBuilderRow extends React.Component {
    static propTypes = {
        data: React.PropTypes.object,
        onChange: React.PropTypes.func,
        onDelete: React.PropTypes.func
    }

    // state = {form: {...this.props.data, options: this.props.data.options && this.props.data.options.join(",") || ""}}

    onChange = (event) => {
        // this.setState({
        //     form: {...this.state.form, [event.target.name]: event.target.value}
        // });
        this.props.onChange({...this.props.data, [event.target.name]: event.target.value});
    }

    onDelete = () => this.props.onDelete(this.props.data.id)

    render() {
        const {data} = this.props;
        var optionSelect = "n/a";

        if (data.type === "option") {
            optionSelect = (
                <FormControl
                    type="text"
                    name="options"
                    placeholder="comma separated"
                    value={data.options}
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
            </td>
        </tr>;
    }
}

export default SchemaBuilderRow;
