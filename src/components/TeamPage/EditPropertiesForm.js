import React from "react";
import {Button} from "react-bootstrap";
import {Field, reduxForm} from "redux-form";
import {FieldGroup, ModalForm} from "components/common";

require("style/editPropertiesForm.scss");

class EditPropertiesForm extends React.Component {
    static propTypes = {
        schema: React.PropTypes.array,
        onSubmit: React.PropTypes.func,
        handleSubmit: React.PropTypes.func
    }

    onSubmit = (event) => {
        console.log("on submit");
        event.preventDefault();
        const {schema, handleSubmit, onSubmit} = this.props;

        handleSubmit((data) => {
            console.log("handle submit", data);
            let finalProps = [];
            for (let {name} of schema) {
                // convert map of name: value back to schema array in correct order
                finalProps.push({name: name, value: data[name]});
            }
            onSubmit(finalProps).then(() => {
                this.editModal.closeModal();
            });
        })(event);
    }

    render() {
        const {schema} = this.props;

        const fields = schema.map((s) => {
            const id = s.name.replace(" ", "_") + "_field";
            if (s.type === "option") {
                return <Field
                    component={FieldGroup}
                    id={id}
                    key={s.name}
                    label={s.name}
                    name={s.name}
                    componentClass="select"
                >
                    <option value=''> - </option>
                    {s.options.map((o) => <option key={o}>{o}</option>)}
                </Field>;
            }

            if (s.type === "badgood") {
                return <div key={s.name}>
                    <label className="block-label">{s.name}</label>
                    {["Bad", "Meh", "Good"].map((val) => (
                        <label className="radio-inline" key={val}><Field
                            component="input"
                            type="radio"
                            name={s.name}
                            value={val}
                            key={val}
                            />{val}</label>
                    ))}
                </div>;
            }

            return <Field
                component={FieldGroup}
                id={id}
                key={s.name}
                label={s.name}
                name={s.name}
                type={s.type}
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

export default reduxForm({
    form: "properties"
})(EditPropertiesForm);
