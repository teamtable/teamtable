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

import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/EditOutlined";
import { projectActions } from "../../../_actions/projectActions";
import { userActions } from "../../../_actions/userActions";
import DeleteButtonDialog from "../../molecules/DeleteButtonDialog";
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
    zIndex: "100",
    marginLeft: "4px",
    height: "40px",
    width: "40px",
  },
  iconInnerEdit: {
    zIndex: "100",
    marginTop: "-2px",
    height: "20px",
    width: "20px",
  },

});

class ListEditDialog extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      list: this.props.list,

    };
  }

    handleClickOpen = () => {
      const { listTitle } = this.props.list.title;
      this.setState({ open: true, list: this.props.list });
    };

    handleClose = () => {
      this.setState({ open: false });
    };

    handleChange = name => (event) => {
      this.setState({
        list: {
          ...this.state.list,
          [name]: event.target.value,
        },
      });
    };

    handleDelete = () => {
      console.log("handle Edit list");

      const { list, dispatch } = this.props;

      console.log("handle delete list.project_id: ", list.project_id);
      dispatch(workspaceActions.deleteList(list.id, list.project_id));
      this.handleClose();
    };

    handleEdit = (e) => {
      e.stopPropagation();
      const { id, title } = this.state.list;
      const { dispatch } = this.props;
      dispatch(workspaceActions.updateList(id, title)).then(() => {
        this.handleClose();
      });
    };


    render() {
      const { title } = this.state.list;
      const { list, classes } = this.props;

      return (
        <div>
          <IconButton className={classes.icon} onClick={this.handleClickOpen}>
            <EditIcon className={classes.iconInnerEdit} />
          </IconButton>
          <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="form-dialog-title"
            maxWidth="xs"
            fullWidth
          >
            <DialogTitle id="form-dialog-title">Edit List</DialogTitle>
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
              <DeleteButtonDialog deleteAction={this.handleDelete} dialogText={`Are you sure you want to delete the list \'${list.title}\'?`} />

              <Button onClick={this.handleClose} color="primary">
                            Cancel
              </Button>
              <Button onClick={this.handleEdit} color="primary">
                            Edit
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      );
    }
}


export default ListEditDialog = connect()(withStyles(styles)(ListEditDialog));
