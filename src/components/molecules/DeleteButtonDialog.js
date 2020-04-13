import React from "react";
import { connect } from "react-redux";
import { func, string } from "prop-types";

import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DeleteIcon from "@material-ui/icons/Delete";

const styles = theme => ({
  button: {
    margin: 10,
  },
  root: {
    marginRight: "auto",
    marginLeft: 10,
  },
});

class ProjectDeleteDialog extends React.Component {
    static propTypes = {
      // project id match
      deleteAction: func,
      dialogText: string,
    };

    constructor(props) {
      super(props);

      this.state = {
        open: false,
      };
    }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false }); // not required, because component is unmounted after delete. Would raise warning.
  };

  render() {
    const { classes, dialogText, deleteAction } = this.props;
    const { open } = this.state;

    return (
      <div className={classes.root}>
        <Button color="secondary" onClick={this.handleOpen}>
          <DeleteIcon fontSize="small" />
            Delete
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Confirm Delete"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {dialogText}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary" autoFocus>
                Cancel
            </Button>
            <Button onClick={open ? deleteAction : null} color="secondary">
                Delete
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default ProjectDeleteDialog = connect()(withStyles(styles)(ProjectDeleteDialog));
