import React from "react";
import { connect } from "react-redux";

import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DeleteIcon from "@material-ui/icons/Delete";
// import { projectActions } from "../../../_actions/projectActions";

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
  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Button color="secondary" onClick={this.handleClickOpen}>
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
                Are you sure you want to delete this project?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary" autoFocus>
                Cancel
            </Button>
            <Button onClick={this.handleDelete} color="secondary">
                Delete
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default ProjectDeleteDialog = connect()(withStyles(styles)(ProjectDeleteDialog));
