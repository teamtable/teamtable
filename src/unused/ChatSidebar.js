import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { push as Menu } from "react-burger-menu";
import { logout } from "./authActions";
import "../components/Sidebar/Actionbar.scss";

class ChatSidebar extends React.Component {
  showSettings(event) {
    event.preventDefault();
  }

  render() {
    const navigationMenu = (
      <Menu pageWrapId="content-wrap" customBurgerIcon={false} isOpen={this.props.navigationSidebarOpen}>
        <span className="menu-item">Chat</span>
      </Menu>
    );

    return (
      <Menu pageWrapId="content-wrap" customBurgerIcon={false} isOpen={this.props.navigationSidebarOpen}>
        <span className="menu-item">Chat</span>
      </Menu>
    );
  }
}

export default ChatSidebar = withRouter(connect(null, { logout })(ChatSidebar));

/* <a onClick={ this.showSettings } className="menu-item--small" href="">Settings</a> */
