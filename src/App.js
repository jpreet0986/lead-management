import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
} from "react-router-dom";
//import BirthdayList from "./components/birthday";
import LeadList from "./components/LeadList";
import AddLead from "./components/AddLead";
import EditLead from "./components/EditLead";

import "./App.css";

class App extends Component {
  render() {
    return (
      <Router>
        <main className="container">
          <h3>Lead Management</h3>
          <nav className="navbar navbar-expand-lg navheader">
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <NavLink
                    to={"/addLead"}
                    activeClassName="selected"
                    className="nav-link"
                  >
                    Create Lead
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to={"/leadList"}
                    activeClassName="selected"
                    className="nav-link"
                  >
                    Leads List
                  </NavLink>
                </li>
              </ul>
            </div>
          </nav>{" "}
          <br />
          <div class="container">
            <div class="row">
              <div class="col-sm">
                <Switch>
                  <Route exact path="/addLead" component={AddLead} />
                  <Route path="/editLead/:id" component={EditLead} />
                  <Route path="/leadList" component={LeadList} />
                  <Route path="/" component={LeadList} />
                </Switch>
              </div>
            </div>
          </div>
        </main>
      </Router>
    );
  }
}

export default App;
