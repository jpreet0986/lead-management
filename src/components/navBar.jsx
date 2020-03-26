import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
} from "react-router-dom";

// React will automatically pass props to this
// just use const NavBar = props => {

const NavBar = () => {
  return (
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
    </nav>
  );
};

export default NavBar;
