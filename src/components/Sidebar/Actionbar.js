import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import ReactSVG from "react-svg";
import { logout } from "../../unused/authActions";
import { Constants } from "../../_constants";

import "./styles/Actionbar.scss";
import menuIcon from "../../images/menuIcon.svg";
import notificationIcon from "../../images/notificationIcon.svg";
import searchIcon from "../../images/searchIcon.svg";
import messageIcon from "../../images/messageIcon.svg";

import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import ChatIcon from "@material-ui/icons/TextsmsOutlined";
import NotificationIcon from "@material-ui/icons/NotificationsActiveOutlined";


import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  icon: {
    fontSize: 30,
  },
});

// Represents the sidebar on the very far left, containing the menu button opening the nav menu as well as buttons to open the search menu or the chat menu.
class Actionbar extends Component {
  render() {
    const { classes } = this.props;
    // const { classes } = props; <ReactSVG src={menuIcon}  svgClassName={"nav-icon-svg menu-icon-svg"} />

    const openNavIcon = (
      <div className="icon-spacer">
        <div className="nav-icon menu-icon">
          <div style={{ cursor: "pointer" }} onClick={() => { this.props.toggleSidebarMenu(Constants.SIDEBAR_NAV); }}>
            <IconButton color="inherit" aria-label="Menu">
              <MenuIcon className={classes.icon} />
            </IconButton>
          </div>
        </div>
      </div>
    );

    /*

        <IconButton className={""} aria-label="Delete">
                    <ReactSVG src={menuIcon}  svgClassName={"nav-icon-svg menu-icon-svg"} />

                </IconButton> <ReactSVG src={searchIcon}  svgClassName={"nav-icon-svg"} />
         */

    const navigation = (
      <div id="guestNav">
        {openNavIcon}
        <div id="menu-button-separator" />
        <div className="nav-action-icons-wrap">
          <div className="nav-icon">
            <div style={{ cursor: "pointer", height: "100%" }} onClick={() => { this.props.toggleSidebarMenu(Constants.SIDEBAR_CHAT); }}>
              <IconButton color="inherit" aria-label="Menu">
                <ChatIcon className={classes.icon} />
              </IconButton>
            </div>
          </div>
          <div className="nav-icon">
            <div style={{ cursor: "pointer" }} onClick={() => { this.props.toggleSidebarMenu(Constants.SIDEBAR_BELL); }}>
              <IconButton color="inherit" aria-label="Menu">
                <NotificationIcon className={classes.icon} />
              </IconButton>
            </div>
          </div>
          <div className="nav-icon">
            <div style={{ cursor: "pointer" }} onClick={() => { this.props.toggleSidebarMenu(Constants.SIDEBAR_SEARCH); }}>
              <IconButton color="inherit" aria-label="Menu">
                <SearchIcon className={classes.icon} />
              </IconButton>
            </div>
          </div>
        </div>
      </div>
    );

    return (
      <div className="nav-wrap">
        <div className="nav-inner">
          {navigation}
        </div>
      </div>
    );
  }
}

export default Actionbar = connect()(withStyles(styles)(Actionbar));
// export default Actionbar = withRouter(connect(null, {logout})(withStyles(styles))(Actionbar));
