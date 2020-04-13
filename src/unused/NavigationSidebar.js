import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { push as Menu } from "react-burger-menu";
import { logout } from "./authActions";
import "../components/Sidebar/Actionbar.scss";

class NavigationSidebar extends React.Component {
  showSettings(event) {
    event.preventDefault();
  }

  render() {
    return (
      <Menu pageWrapId="content-wrap" customBurgerIcon={false} isOpen={this.props.navigationSidebarOpen}>
        <Link to="/" className="menu-item">TeamTable</Link>
        <Link to="/projects" className="menu-item">Projects</Link>
      </Menu>
    );
  }
}

export default NavigationSidebar = withRouter(connect(null, { logout })(NavigationSidebar));

/* <a onClick={ this.showSettings } className="menu-item--small" href="">Settings</a> */
