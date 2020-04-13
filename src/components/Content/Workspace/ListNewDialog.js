import React from "react";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { withRouter } from "react-router-dom";
import connect from "react-redux/es/connect/connect";
import withStyles from "@material-ui/core/styles/withStyles";
import { userActions } from "../../../_actions/userActions";
import { workspaceActions } from "../../../_actions/workspaceActions";

const styles = theme => ({
  submit: {
    width: "100%",
    marginTop: "20px",
  },
  textField: {
    width: "100%",
    paddingBottom: "10px",
  },
});

class ListNewDialog extends React.Component {
    state = {
      open: false,
      title: "",
    };

    handleClickOpen = () => {
      this.setState({ open: true, title: "" });
    };

    handleClose = () => {
      this.setState({ open: false });
    };

    handleCreate = () => {
      const { workspace, dispatch } = this.props;
      if (this.state.title) {
        console.log("workspace.project_id", workspace.project_id);
        dispatch(workspaceActions.addList(workspace.project_id, this.state.title));
        this.setState({ open: false });
      }
    };

    handleChange = name => (event) => {
      this.setState({ [name]: event.target.value });
    };


    render() {
      const { title } = this.state;

      return (
        <div>
          <Button variant="contained" color="primary" onClick={this.handleClickOpen}>
                    Add List
          </Button>
          <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="form-dialog-title"
            maxWidth="xs"
            fullWidth
          >
            <DialogTitle id="form-dialog-title">Add List</DialogTitle>
            <DialogContent>

              <TextField
                autoFocus
                margin="dense"
                id="title"
                label="List Title"
                type="text"
                value={title}
                onChange={this.handleChange("title")}
                fullWidth
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                            Cancel
              </Button>
              <Button onClick={this.handleCreate} color="primary">
                            Add
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      );
    }
}

function mapStateToProps(state) {
  const { workspace } = state;
  console.log("mapstatetoprops workspace.project_id: ", workspace.project_id);
  return {
    workspace,
  };
}

export default ListNewDialog = connect(mapStateToProps)(withStyles(styles)(ListNewDialog));
