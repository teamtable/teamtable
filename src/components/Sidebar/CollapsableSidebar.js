import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink, withRouter } from "react-router-dom";
import { push as Menu } from "react-burger-menu";
import "./styles/CollapsableSidebar.scss";

// navigation
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";

// navigation icons
import ProjectsIcon from "@material-ui/icons/Apps";
import WorkspaceIcon from "@material-ui/icons/ListAltOutlined";
import ProfileIcon from "@material-ui/icons/AccountCircleOutlined";
import SettingsIcon from "@material-ui/icons/SettingsOutlined";
import LogoutIcon from "@material-ui/icons/PowerSettingsNewOutlined";

import { withStyles } from "@material-ui/core/styles";
// import green from "@material-ui/core/colors/green";
import { userActions } from "../../_actions/userActions";
import { Constants } from "../../_constants";
// import { logout } from "../../unused/authActions";

const styles = theme => ({
  listRipple: {
    color: "#b4b4b4",
  },
  listItem: {
    "&:hover": {
      backgroundColor: "#fafafa"
                + "!important",
    },
  },
});


class CollapsableSidebar extends Component {
    handleLogout = () => {
      const { dispatch } = this.props;
      dispatch(userActions.logout());
      /*
        this.props.logout();
        this.props.history.push('/')
        */
    };

    render() {
      const { fetching, classes, workspace } = this.props;

      const Puffer = (
        // icons insertable here
        <div style={{ width: "100px", position: "relative" }} />
      );

      const navigationMenu = (
        <Menu pageWrapId="content-wrap" customBurgerIcon={false} isOpen={this.props.isSidebarOpen} itemListClassName="" menuClassName="">
          <List component="nav" className="no-decoration">
            <ListItem button className={classes.listItem} selected={false} component={NavLink} to="/projects" onClick={() => { this.props.toggleSidebarCollapse(); }} TouchRippleProps={{ classes: { root: classes.listRipple } }}>
              <ListItemIcon>
                <ProjectsIcon />
              </ListItemIcon>
              <ListItemText primary="Project Selection" className="no-decoration" />
            </ListItem>

            {this.props.workspace.project_id !== -1
              ? (
                <ListItem
                  button
                  className={classes.listItem}
                  component={NavLink}
                  to={`/projects/${this.props.workspace.project_id}`}
                  onClick={() => { this.props.toggleSidebarCollapse(); }}
                  TouchRippleProps={{ classes: { root: classes.listRipple } }}
                >
                  <ListItemIcon>
                    <WorkspaceIcon />
                  </ListItemIcon>
                  <ListItemText primary="Workspace" className="no-decoration" />
                </ListItem>
              )
              : (
                <ListItem
                  button
                  className={classes.listItem}
                  TouchRippleProps={{ classes: { root: classes.listRipple } }}
                >
                  <ListItemIcon>
                    <WorkspaceIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Workspace"
                    className="no-decoration"
                    primaryTypographyProps={{ color: "textSecondary" }}
                  />
                </ListItem>
              )}

            <Divider />
            <ListItem button className={classes.listItem} TouchRippleProps={{ classes: { root: classes.listRipple } }}>
              <ListItemIcon>
                <ProfileIcon />
              </ListItemIcon>
              <ListItemText primary="Profile" className="no-decoration" primaryTypographyProps={{ color: "textSecondary" }} />
            </ListItem>
            <ListItem button className={classes.listItem} TouchRippleProps={{ classes: { root: classes.listRipple } }}>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="Settings" className="no-decoration" primaryTypographyProps={{ color: "textSecondary" }} />
            </ListItem>
            <Divider />
            <ListItem
              button
              className={classes.listItem}
              component={NavLink}
              style={{ "&:hover": {
                backgroundColor: "#fff",
              } }}
              to="/login"
              onClick={() => { this.handleLogout(); }}
              TouchRippleProps={{ classes: { ripple: classes.listRipple } }}
            >
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" className="no-decoration" />
            </ListItem>
          </List>
        </Menu>
      );

      const chatMenu = (
        <Menu pageWrapId="content-wrap" customBurgerIcon={false} isOpen={this.props.isSidebarOpen}>
          <h1 className="menu-item menu-item-title">Chat</h1>
        </Menu>
      );

      const notificationMenu = (
        <Menu pageWrapId="content-wrap" customBurgerIcon={false} isOpen={this.props.isSidebarOpen}>
          <h1 className="menu-item menu-item-title">Notifications</h1>
        </Menu>
      );

      const searchMenu = (
        <Menu pageWrapId="content-wrap" customBurgerIcon={false} isOpen={this.props.isSidebarOpen}>
          <h1 className="menu-item menu-item-title">Search</h1>
        </Menu>
      );

      if (this.props.sidebarType === Constants.SIDEBAR_CHAT) {
        return (
          <div>
            {chatMenu}
          </div>
        );
      }
      if (this.props.sidebarType === Constants.SIDEBAR_BELL) {
        return (
          <div>
            {notificationMenu}
          </div>
        );
      }
      if (this.props.sidebarType === Constants.SIDEBAR_SEARCH) {
        return (
          <div>
            {searchMenu}
          </div>
        );
      }
      return (
        <div>
          {navigationMenu}
        </div>
      );
    }
}


function mapStateToProps(state) {
  const { workspace } = state;
  return {
    workspace,
  };
}

export default CollapsableSidebar = withRouter(connect(mapStateToProps)(withStyles(styles)(CollapsableSidebar)));

/*
<div>
    <NavigationSidebar navigationSidebarOpen={this.props.navigationSidebarOpen }/>
    <ChatSidebar navigationSidebarOpen={this.props.chatSidebarOpen && !this.props.isClosing}/>
</div>
*/
