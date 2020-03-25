import React, { Component } from "react";
import { addLead } from "../services/leadService";
import { FormErrors } from "./FormErrors";
//https://learnetto.com/blog/react-form-validation
class AddLead extends Component {
  state = {
    first_name: "",
    last_name: "",
    email: "",
    notes: "",
    is_contacted: false,
    message: "",
    formErrors: {
      // first_name: "",
      // notes: "",
      // email: ""
    },
    emailValid: false,
    nameValid: false,
    notesValid: false,
    formValid: false
  };

  handleFormSubmit(event) {
    event.preventDefault();
    addLead({ ...this.state })
      .then(res => {
        this.setState({
          first_name: "",
          last_name: "",
          email: "",
          notes: "",
          is_contacted: false,
          message: "Lead created successfully"
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
    this.setState({ [name]: value }, () => {
      this.validateField(name, value);
    });
  }

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let emailValid = this.state.emailValid;
    let nameValid = this.state.nameValid;
    let notesValid = this.state.notesValid;

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
    this.setState(
      {
        formErrors: fieldValidationErrors,
        emailValid: emailValid,
        nameValid: nameValid,
        notesValid: notesValid
      },
      this.validateForm
    );
  }

  validateForm() {
    this.setState({
      formValid:
        this.state.emailValid && this.state.nameValid && this.state.notesValid
    });
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
            value={this.state.is_contacted}
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
          Add Lead
        </button>
      </form>
    );
  }
}

export default AddLead;
