import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { Constants } from "../../_constants";
import Actionbar from "./Actionbar";
import CollapsableSidebar from "./CollapsableSidebar";
import "./styles/Sidebars.scss";

class Sidebars extends Component {
  componentDidMount() {
    console.log("Force updated.");
  }

  constructor(props) {
    super(props);
    this.state = {
      isSidebarOpen: false,
      sidebarType: Constants.SIDEBAR_NAV,
    };
  }

    toggleSidebarCollapse = () => {
      this.setState({
        isSidebarOpen: !this.state.isSidebarOpen,
        sidebarType: this.state.sidebarType,
      });
    };

    setSidebarType = (sidebarType) => {
      this.setState({
        isSidebarOpen: this.state.isSidebarOpen,
        sidebarType,
      });
    };

    // handle the button clicks on the different menu items to open/close the designated sidebar (navigation, chat, notifications, search...)
    toggleSidebarMenu = (sidebarType) => {
      // sidebar is open already
      if (this.state.isSidebarOpen) {
        if (this.state.sidebarType === sidebarType) this.toggleSidebarCollapse();
        else {
          this.setSidebarType(sidebarType);
        }
      }
      // sidebar is closed and the target sidebar is different from the current one
      else if (this.state.sidebarType !== sidebarType) {
        this.setState({
          isSidebarOpen: this.state.isSidebarOpen,
          sidebarType,
        });
        this.setState({
          isSidebarOpen: !this.state.isSidebarOpen,
          sidebarType,
        });
      }
      // sidebar is closed and the target sidebar is the same as our current one
      else {
        this.toggleSidebarCollapse();
      }
    };

    render() {
      return (
        <div id="Sidebars">
          <div id="main-nav-wrap">
            <Actionbar toggleSidebarMenu={this.toggleSidebarMenu} />
          </div>
          <div id="collapsable-sidebar-wrap">
            <CollapsableSidebar isSidebarOpen={this.state.isSidebarOpen} sidebarType={this.state.sidebarType} toggleSidebarCollapse={this.toggleSidebarCollapse} />
          </div>
        </div>
      );
    }
}

export default Sidebars = connect()(Sidebars);

/*
<div>
    <NavigationSidebar navigationSidebarOpen={this.props.navigationSidebarOpen }/>
    <ChatSidebar navigationSidebarOpen={this.props.chatSidebarOpen && !this.props.isClosing}/>
</div>
*/
