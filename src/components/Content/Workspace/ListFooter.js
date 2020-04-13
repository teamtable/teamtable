import React, { Component } from "react";

import withStyles from "@material-ui/core/styles/withStyles";
import { Constants } from "../../../_constants";

const styles = theme => ({
  container: {
    minHeight: "40px",
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    transition: "background 0.3s ease",
    "&:focus": {
      background: "rgba(255, 255, 255, 0.85)",
    },
  },
});

/*
const Container = styled.div`
  min-height: 40px;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: background 0.3s ease;
  &:hover {
    background: rgba(0, 0, 0, 0.15);
  }
`
*/

class ListFooter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSidebarOpen: false,
      sidebarType: Constants.SIDEBAR_NAV,
    };
  }


  render() {
    const { classes } = this.props;
    return (

      <div className={classes.container} {...this.props}>
                add another card
      </div>
    );
  }
}

// <PlaceholderAddAction actionContent='Add another card' />

export default (withStyles(styles)(ListFooter));
