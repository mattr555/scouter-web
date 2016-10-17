import React from "react";
import {Table, Button} from "react-bootstrap";
import {connect} from "react-redux";
import SchemaBuilderRow from "./SchemaBuilderRow";
import {changeField, deleteField, addField} from "ducks/schemaBuilder";

class SchemaBuilder extends React.Component {
    static propTypes = {
        schema: React.PropTypes.array,
        onFieldChange: React.PropTypes.func,
        onFieldDelete: React.PropTypes.func,
        onFieldAdd: React.PropTypes.func
    }

    render() {
        var rows = this.props.schema.map((r) => (
            <SchemaBuilderRow
                key={r.id}
                data={r}
                onChange={this.props.onFieldChange}
                onDelete={this.props.onFieldDelete} />
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

const mapStateToProps = ({schemaBuilder}) => ({schema: schemaBuilder});

const mapDispatchToProps = (dispatch) => {
    return {
        onFieldChange: (field) => dispatch(changeField(field)),
        onFieldDelete: (id) => dispatch(deleteField(id)),
        onFieldAdd: () => dispatch(addField())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SchemaBuilder);
