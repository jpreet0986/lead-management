import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavBar from "./components/navBar";
import LeadList from "./components/leadList";
import AddLead from "./components/addLead";
import EditLead from "./components/editLead";
import "./styles/css/App.css";

class App extends Component {
  render() {
    return (
      <Router>
        <main className="container">
          <h3 className="heading">Lead Management</h3>
          <NavBar />
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
