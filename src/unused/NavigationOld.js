import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { logout } from "./authActions";


class NavigationOld extends Component {
    handleLogout = (e) => {
      e.preventDefault();
      /*
        this.props.logout();
        this.props.history.push('/')
        */
    };

    render() {
      const logoLink = (
        <li id="logo"><Link to="/">TeamTable</Link></li>
      );

      const mainNav = (
        <ul>
          {logoLink}
          <li><Link to="/projects">Projects</Link></li>
        </ul>
      );

      const userNav = (
        <ul>
          {logoLink}
          <li><Link to="/about">About</Link></li>
          <li><Link to="/health_resources">Health Resources</Link></li>
          <li><Link to="/entries">Entries</Link></li>
          <li><Link to="/user_profile">Profile</Link></li>
          <li onClick={e => this.handleLogout(e)}>Log Out</li>
        </ul>
      );

      return (
        <nav>
          {this.props.isAuthenticated ? userNav : mainNav}
        </nav>
      );
    }
}

export default NavigationOld = withRouter(connect(null, { logout })(NavigationOld));
