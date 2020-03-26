import React, { Component } from "react";
import Moment from "react-moment";

// use lead from props
const Lead = ({ lead }) => {
  return (
    <div
      className="card border-secondary mb-4"
      style={{ maxWidth: 28 + "rem" }}
      key={lead.id}
    >
      <h5 class="card-header">
        {lead.first_name} {lead.last_name}
      </h5>
      <div className="card-body">
        <h6 className="card-subtitle mb-2 text-muted">
          {lead.email}
          <span style={{ align: "right" }}>
            <Moment format="MMM DD YYYY hh:mm A">{lead.updated_at}</Moment>
          </span>
        </h6>
        <p class="card-text">{lead.notes}</p>
        <p>{lead.is_contacted}</p>

        <a href={`/EditLead/${lead.id}`} class="btn btn-primary btn-sm mr-2">
          Edit
        </a>

        <button
          onClick={() => this.props.onDelete(lead)}
          className="btn btn-danger btn-sm"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Lead;
