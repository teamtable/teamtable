import React from "react";
import { bool, object, func } from "prop-types";

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

class CardEditDialog extends React.Component {
    static propTypes = {
      card: object.isRequired,
      open: bool.isRequired,
      closeDialog: func.isRequired,
    };

    constructor(props) {
      super(props);

      this.state = {
        card: this.props.card,
      };
    }

    handleClose = () => {
      this.props.closeDialog();
    };

    handleChange = name => (event) => {
      this.setState({
        card: {
          ...this.state.card,
          [name]: event.target.value,
        },
      });
    };

    handleDelete = () => {
      console.log("handle Delete edit card");

      const { card, dispatch } = this.props;

      console.log("handle delete card.project_id: ", card.project_id);
      dispatch(workspaceActions.deleteCard(card.id, card.project_id));
      this.handleClose();
    };

    handleEdit = (e) => {
      e.stopPropagation();
      const { dispatch } = this.props;
      dispatch(workspaceActions.updateCard(this.state.card)).then(() => {
        this.handleClose();
      });
    };


    render() {
      const { title } = this.state.card;
      const { card, classes } = this.props;

      return (
        <div>
          <Dialog
            open={this.props.open}
            onClose={this.handleClose}
            aria-labelledby="form-dialog-title"
            maxWidth="xs"
            fullWidth
          >
            <DialogTitle id="form-dialog-title">Edit Card</DialogTitle>
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
              <DeleteButtonDialog
                deleteAction={this.handleDelete}
                dialogText={`Are you sure you want to delete the card titled ${card.title}?`}
              />

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


export default CardEditDialog = connect()(withStyles(styles)(CardEditDialog));
