import React, { Component } from "react";
import { Link } from "react-router-dom";
import { dateToNiceString } from "./Utilities";
import { getLeadList, deleteLead } from "../services/leadService";

class Leads extends Component {
  state = {
    leads: [],
    message: "",
    del_message: "",
    flag: "alert alert-info"
  };
  componentDidMount = () => {
    let getLeads = async () => {
      const leads = await getLeadList();
      const message = this.leadCountMessage(leads);
      this.setState({ leads, message });
    };
    getLeads();
  };
  leadCountMessage = leads => {
    const { length: count } = leads;
    let message = "";
    if (count === 0) {
      message = "No Leads in database.";
    } else {
      message = `Showing ${count} Leads`;
    }
    return message;
  };
  handleDelete = lead => {
    let delete_resp = async lead => {
      const del = await deleteLead(lead);

      const leads = this.state.leads.filter(m => m.id !== lead.id);
      const message = this.leadCountMessage(leads);

      this.setState({
        leads,
        message,
        del_message: del.message,
        flag: `alert alert-${del.flag} alert-dismissible fade show`
      });
    };
    delete_resp(lead);
  };

  render() {
    let { leads, message, del_message, flag } = this.state;

    return (
      <React.Fragment>
        <div class="container">
          <div class="row">
            <div class="col-sm">
              {del_message && (
                <div className={flag} role="alert">
                  {del_message}
                  <button
                    type="button"
                    className="close"
                    data-dismiss="alert"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
              )}
              {message && (
                <div className="alert alert-info" role="alert">
                  {message}
                </div>
              )}
            </div>
          </div>
          <div class="row">
            <div class="col-sm">
              {leads.length > 0 &&
                leads.map(lead => (
                  <div className="card" key={lead.id}>
                    <div className="card-body">
                      <h5 className="card-title">{lead.first_name}</h5>
                      <h6 className="card-subtitle mb-2 text-muted">
                        {lead.email}
                      </h6>
                      <p>{lead.notes}</p>
                      <p>{lead.is_contacted}</p>
                      <p>{dateToNiceString(lead.created_at)}</p>

                      <Link
                        to={{
                          pathname: `/EditLead/${lead.id}`
                        }}
                      >
                        <button className="btn btn-primary btn-sm mr-2">
                          Edit
                        </button>
                      </Link>

                      <button
                        onClick={() => this.handleDelete(lead)}
                        className="btn btn-danger btn-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Leads;
