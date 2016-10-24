import React from "react";
import {Button} from "react-bootstrap";
import {FieldGroup, ModalForm} from "components/common";

class EditPropertiesForm extends React.Component {
    static propTypes = {
        schema: React.PropTypes.array,
        teamProps: React.PropTypes.array
    }

    state = {form: this.generateForm(this.props)}

    generateForm(props){
        const {schema, teamProps} = props;
        if (schema && teamProps){
            let newForm = {};
            let values = {};
            for (let p of teamProps){
                //extract initial values of robot properties
                values[p.name] = p.value;
            }
            for (let s of schema) {
                //assign values to schema names, filling in unassigned values
                newForm[s.name] = values[s.name] || "";
            }
            return newForm;
        }
        return null;
    }

    onChange = (event) => {
        this.setState({
            form: {...this.state.form, [event.target.name]: event.target.value}
        });
    }

    onSubmit = (event) => {
        event.preventDefault();
        const {schema} = this.props;
        let finalProps = [];
        for (let {name} of schema) {
            finalProps.push({name: name, value: this.state.form[name]});
        }
        console.log(finalProps);
        this.editModal.closeModal();
    }

    render() {
        const {schema} = this.props;

        if (this.state.form === null) return <div/>;

        const fields = schema.map((s) => {
            if (s.type === "option") {
                return <span key={s.name}>option stub</span>;
            }

            if (s.type === "badgood") {
                return <span key={s.name}>bad/good stub</span>;
            }

            return <FieldGroup
                id={s.name.replace(" ", "_") + "_field"}
                key={s.name}
                label={s.name}
                name={s.name}
                value={this.state.form[s.name]}
                type={s.type}
                onChange={this.onChange}
                />;
        });

        return <div>
            <Button onClick={() => this.editModal.openModal()}>Edit Props</Button>
            <ModalForm
                ref={(e) => this.editModal = e}
                onSubmit={this.onSubmit}
                formId="editPropertiesForm"
                formTitle="Edit Robot Properties"
                >
                {fields}
            </ModalForm>
        </div>;
    }
}

export default EditPropertiesForm;
