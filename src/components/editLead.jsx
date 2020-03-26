import React, { Component } from "react";
import { editLead, getLead } from "../services/leadService";
import { FormErrors } from "./formErrors";

class EditLead extends Component {
  state = {
    id: "",
    first_name: "",
    last_name: "",
    email: "",
    notes: "",
    is_contacted: false,
    message: "",
    lead: {},
    formErrors: {
      first_name: "",
      notes: "",
      email: ""
    },
    emailValid: true,
    nameValid: true,
    notesValid: true,
    formValid: false
  };

  constructor(props) {
    super(props);
    const lead_id = props.match.params.id;
    const selectLead = async lead_id => {
      const lead = await getLead(lead_id);
      this.setState({
        id: lead.id,
        first_name: lead.first_name,
        last_name: lead.last_name,
        email: lead.email,
        notes: lead.notes,
        is_contacted: lead.is_contacted
      });
    };
    selectLead(lead_id);
  }
  handleFormSubmit(event) {
    event.preventDefault();
    editLead(this.state.lead, this.state.id)
      .then(res => {
        this.setState({
          message: "Lead edited successfully"
        });
      })
      .catch(res => {
        this.setState({
          message: "Some error occured"
        });
      });
  }
  handleUserInput(event) {
    const name = event.target.name;
    const value = event.target.value;
    let lead = this.state.lead;
    if (this.validateField(name, value)) {
      lead[name] = value;
    }

    this.setState({ lead, [name]: value });
  }

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let emailValid = this.state.emailValid;
    let nameValid = this.state.nameValid;
    let notesValid = this.state.notesValid;
    console.log("field--" + fieldName);

    switch (fieldName) {
      case "email":
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid ? "" : " is invalid";
        break;
      case "first_name":
        nameValid = value.length >= 4;
        fieldValidationErrors.name = nameValid ? "" : " is too short";
        break;
      case "notes":
        notesValid = value.length >= 20;
        fieldValidationErrors.notes = notesValid ? "" : " is too short";
        break;
      default:
        break;
    }
    let formValid = emailValid && nameValid && notesValid;
    this.setState({
      formErrors: fieldValidationErrors,
      emailValid: emailValid,
      nameValid: nameValid,
      notesValid: notesValid,
      formValid: formValid
    });
    return formValid;
  }

  errorClass(error) {
    return error && error.length === 0 ? "" : "has-error";
  }
  render() {
    return (
      <form className="leadForm">
        <FormErrors formErrors={this.state.formErrors} />

        {this.state.message && (
          <div className="alert alert-info" role="alert">
            {this.state.message}
          </div>
        )}
        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            name="first_name"
            value={this.state.first_name}
            onChange={e => this.handleUserInput(e)}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            name="last_name"
            value={this.state.last_name}
            onChange={e => this.handleUserInput(e)}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="inputEmail">Email</label>
          <input
            type="text"
            name="email"
            value={this.state.email}
            onChange={e => this.handleUserInput(e)}
            className={`form-control ${this.errorClass(this.state.emailValid)}`}
          />
        </div>
        <div className="form-group">
          <label htmlFor="inputNotes">Notes</label>
          <input
            type="text"
            name="notes"
            value={this.state.notes}
            onChange={e => this.handleUserInput(e)}
            className="form-control"
          />
        </div>
        <div className="form-group form-check">
          <input
            type="checkbox"
            className="form-check-input"
            name="is_contacted"
            defaultChecked={this.state.is_contacted}
            onChange={e => this.handleUserInput(e)}
          />
          <label htmlFor="isContacted" className="form-check-label">
            Is Contacted
          </label>
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={e => this.handleFormSubmit(e)}
          disabled={!this.state.formValid}
        >
          Update Lead
        </button>
      </form>
    );
  }
}

export default EditLead;
