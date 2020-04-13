import React from "react";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import connect from "react-redux/es/connect/connect";
import withStyles from "@material-ui/core/styles/withStyles";
import AddIcon from "@material-ui/icons/Add";
import IconButton from "@material-ui/core/IconButton/IconButton";
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
  icon: {
    marginLeft: "4px",
    height: "40px",
    width: "40px",
  },
  iconInner: {
    marginTop: "-4px",
  },
});

class CardNewDialog extends React.Component {
    state = {
      open: false,
      title: "",
    };

    handleClickOpen = () => {
      this.setState({ open: true });
    };

    handleClose = () => {
      this.setState({ open: false, title: "" });
    };

    handleCreate = () => {
      const { dispatch, workspace } = this.props;
      if (this.state.title) {
        dispatch(workspaceActions.addCard(workspace.project_id, this.props.list.id, this.state.title));
        this.setState({ open: false, title: "" });
      }
    };

    handleChange = name => (event) => {
      this.setState({ [name]: event.target.value });
    };

    render() {
      const { title } = this.state;
      const { classes } = this.props;

      return (
        <div>
          <IconButton className={classes.icon} onClick={this.handleClickOpen}>
            <AddIcon className={classes.iconInner} />
          </IconButton>
          <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="form-dialog-title"
            maxWidth="xs"
            fullWidth
          >
            <DialogTitle id="form-dialog-title">Add Card</DialogTitle>
            <DialogContent>

              <TextField
                autoFocus
                margin="dense"
                id="title"
                label="Card Title"
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

export default CardNewDialog = connect(mapStateToProps)(withStyles(styles)(CardNewDialog));
