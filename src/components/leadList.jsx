import React, { Component } from "react";
import Lead from "./lead";
import { getLeadList, deleteLead } from "../services/leadService";

class Leads extends Component {
  state = {
    leads: [],
    del_message: "",
    flag: "alert alert-info"
  };
  constructor() {
    super();
    this.handleDelete = this.handleDelete.bind(this);
  }
  componentDidMount = () => {
    let getLeads = async () => {
      const leads = await getLeadList();
      this.setState({ leads });
    };
    getLeads();
  };

  leadCountMessage = () => {
    const { length: count } = this.state.leads;
    let message = "";
    if (count === 0) {
      message = "No Leads in database.";
    } else if (count === 1) {
      message = `Showing ${count} Lead`;
    } else {
      message = `Showing ${count} Leads`;
    }
    return (
      <div className="alert alert-info" role="alert">
        {message}
      </div>
    );
  };

  handleDelete = lead => {
    let delete_resp = async lead => {
      const del = await deleteLead(lead);
      const leads = this.state.leads.filter(m => m.id !== lead.id);
      this.setState({
        leads,
        del_message: del.message,
        flag: `alert alert-${del.flag} alert-dismissible fade show`
      });
    };
    delete_resp(lead);
  };

  renderMessages() {
    let { del_message, flag } = this.state;
    return (
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
          {this.leadCountMessage()}
        </div>
      </div>
    );
  }
  render() {
    return (
      <React.Fragment>
        <div class="container">
          {this.renderMessages()}
          <div class="row">
            <div class="col-sm">
              {this.state.leads.length > 0 &&
                this.state.leads.map(lead => (
                  <Lead
                    key={lead.id}
                    lead={lead}
                    onDelete={this.handleDelete}
                  />
                ))}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Leads;
