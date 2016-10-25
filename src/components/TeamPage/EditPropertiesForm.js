import React from "react";
import {Button, Radio} from "react-bootstrap";
import {FieldGroup, ModalForm} from "components/common";

require("style/editPropertiesForm.scss");

class EditPropertiesForm extends React.Component {
    static propTypes = {
        schema: React.PropTypes.array,
        teamProps: React.PropTypes.array,
        onSubmit: React.PropTypes.func
    }

    state = {form: this.generateForm(this.props)}

    generateForm(props){
        let {schema, teamProps} = props;
        teamProps = teamProps || [];
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
            // convert map of name: value back to schema array in correct order
            finalProps.push({name: name, value: this.state.form[name]});
        }
        this.props.onSubmit(finalProps);
        this.editModal.closeModal();
    }

    render() {
        const {schema} = this.props;

        if (this.state.form === null) return <div/>;

        const fields = schema.map((s) => {
            const id = s.name.replace(" ", "_") + "_field";
            if (s.type === "option") {
                return <FieldGroup
                    id={id}
                    key={s.name}
                    label={s.name}
                    name={s.name}
                    value={this.state.form[s.name]}
                    componentClass="select"
                    onChange={this.onChange}
                >
                    <option value=''> - </option>
                    {s.options.map((o) => <option key={o}>{o}</option>)}
                </FieldGroup>;
            }

            if (s.type === "badgood") {
                return <div key={s.name}>
                    <label className="block-label">{s.name}</label>
                    {["Bad", "Meh", "Good"].map((val) => (
                        <Radio
                            inline
                            name={s.name}
                            value={val}
                            key={val}
                            checked={val === this.state.form[s.name]}
                            onChange={this.onChange}
                            >{val}</Radio>
                    ))}
                </div>;
            }

            return <FieldGroup
                id={id}
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
