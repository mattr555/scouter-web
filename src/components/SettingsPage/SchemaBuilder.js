import React from "react";
import {Table, Button} from "react-bootstrap";
import {connect} from "react-redux";
import SchemaBuilderRow from "./SchemaBuilderRow";
import {changeField, deleteField, addField, moveFieldUp, moveFieldDown} from "ducks/schemaBuilder";

class SchemaBuilder extends React.Component {
    static propTypes = {
        schema: React.PropTypes.array,
        onFieldChange: React.PropTypes.func,
        onFieldDelete: React.PropTypes.func,
        onFieldAdd: React.PropTypes.func,
        onFieldUp: React.PropTypes.func,
        onFieldDown: React.PropTypes.func
    }

    render() {
        var rows = this.props.schema.map((r, i) => (
            <SchemaBuilderRow
                key={r.id}
                data={r}
                onChange={this.props.onFieldChange}
                onDelete={this.props.onFieldDelete}
                onUp={this.props.onFieldUp}
                onDown={this.props.onFieldDown}
                top={i === 0}
                bottom={i === this.props.schema.length - 1} />
        ));

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
            <Button onClick={this.props.onFieldAdd} bsStyle="success">Add</Button>
        </div>;
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onFieldChange: (field) => dispatch(changeField(field)),
        onFieldDelete: (id) => dispatch(deleteField(id)),
        onFieldAdd: () => dispatch(addField()),
        onFieldUp: (id) => dispatch(moveFieldUp(id)),
        onFieldDown: (id) => dispatch(moveFieldDown(id))
    };
};

export default connect(null, mapDispatchToProps)(SchemaBuilder);
