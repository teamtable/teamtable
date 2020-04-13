import React from "react";
import { connect } from "react-redux";

import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Chip from "@material-ui/core/Chip";
import { projectActions } from "../../../_actions/projectActions";

const styles = theme => ({
  button: {
    margin: "10px",
    float: "right",
  },
  dialog: {
    maxWidth: 540,
    margin: "auto",
  },
  input: {
    display: "none",
  },
  addMemberField: {
    width: 340,
  },
  addMemberButton: {
    marginTop: 12,
    marginLeft: 12,
    float: "right",
  },
  chipContainer: {
    marginTop: 8,
    marginLeft: -10,
  },
  chip: {
    margin: "5px",
    height: "30px",
  },
});

class ProjectNewDialog extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      created: false,
      project: {
        title: "",
        description: "",
        id: null,
      },
      email: "",
      memberChips: [],
      // memberships: []
      _isMounted: true,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({
      open: false,
      created: false,
      project: {
        title: "",
        description: "",
        id: null,
      },
      email: "",
      memberChips: [],
      _isMounted: false,
    });
  };

  handleChange = name => ({ target: { value } }) => {
    if (name === "email") this.setState({ email: value });
    else {
      this.setState({
        project: {
          ...this.state.project,
          [name]: value,
        },
      });
    }
  };

  createProject = (addMember = false) => {
    const { title, description } = this.state.project;
    const { dispatch } = this.props;
    dispatch(projectActions.create(title, description)).then((data) => {
      if (this.state._isMounted) {
        this.setState({
          project: {
            ...this.state.project,
            id: data.project.id,
          },
          created: true,
        });
        if (addMember) this.continueHandleAddMember();
      }
    });
  }

  updateProject = () => {
    const { id, title, description } = this.state.project;
    const { dispatch } = this.props;
    dispatch(projectActions.update(id, title, description));
  };

  handleAddMember = () => {
    if (!this.state.created) {
      this.createProject(true);
    } else {
      this.continueHandleAddMember();
    }
  };

  continueHandleAddMember = () => {
    const { email } = this.state;
    const { dispatch } = this.props;
    dispatch(projectActions.addMember(this.state.project.id, email)).then((data) => {
      // alert(this.props.value)

      // TODO: if success, else show error message
      if (true) {
        this.state.memberChips.push({ key: data.id, label: email });
        this.setState({ email: "" });
      } else {

      }
    });
  };

  handleDeleteChip = data => () => {
    this.setState((state) => {
      const memberChips = [...state.memberChips];
      const chipToDelete = memberChips.indexOf(data);
      memberChips.splice(chipToDelete, 1);
      return { memberChips };
    });
    const { dispatch } = this.props;
    dispatch(projectActions.removeMember(data.key));
  };

  handleSubmit = (e) => {
    if (this.state.project.title !== "") {
      if (this.state.created) {
        this.updateProject();
      } else {
        this.createProject();
      }

      if (!alert || !alert.message) this.handleClose();
    }
  };

  handleCancel = () => {
    if (this.state.created) {
      const { dispatch } = this.props;
      dispatch(projectActions.deleteProject(this.state.project.id));
    }
    this.handleClose();
  };

  renderError() {
    const { alert } = this.props;


    if (!alert || !alert.message) return false;

    if (!(alert.type === "alert-success")) {
      console.log("Render Error");
      return (
        <div className="alert alert-danger" role="alert">
          {alert.message}
        </div>
      );
    }
    return (
      <div className="alert alert-success" role="alert">
        {alert.message}
      </div>
    );
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Button variant="contained" color="primary" onClick={this.handleClickOpen}>
            New Project
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
          className={classes.dialog}
        >
          <DialogTitle id="form-dialog-title">New Project</DialogTitle>
          <DialogContent>
            {this.renderError()}
            <TextField
              autoFocus
              margin="dense"
              id="title"
              label="Project Title"
              type="text"
              fullWidth
              value={this.state.title} // alt. mittels konstante die man oben definiert
              onChange={this.handleChange("title")}
            />

            <TextField
              margin="dense"
              id="description"
              label="Project Description"
              type="text"
              fullWidth
              value={this.state.description}
              onChange={this.handleChange("description")}
              multiline
              rows="1"
              rowsMax="6"
            />

            <TextField
              fullWidth
              className={classes.addMemberField}
              margin="dense"
              id="add-member"
              label="Add Member"
              type="text"
              value={this.state.email}
              placeholder="example@mail.com"
              onChange={this.handleChange("email")}
            />

            <Fab
              color="primary"
              size="small"
              aria-label="Add"
              className={classes.addMemberButton}
              id="add-member-button"
              onClick={this.handleAddMember}
            >
              <AddIcon />
            </Fab><br />

            <div className={classes.chipContainer}>
              <Chip
                key={0}
                /* icon={icon} */
                label={JSON.parse(localStorage.getItem("user")).email}/* TODO replace with current users mail */
                className={classes.chip}
              />

              {this.state.memberChips.map(data =>
              // let icon = null;

                (
                  <Chip
                    key={data.key}
                    /* icon={icon} */
                    label={data.label}
                    onDelete={this.handleDeleteChip(data)}
                    className={classes.chip}
                  />
                ))}
            </div>

          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCancel} color="primary">
                Cancel
            </Button>
            <Button onClick={this.handleSubmit} color="primary">
                Create
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { projects } = state;
  return {
    projects,
  };
}

export default ProjectNewDialog = connect(mapStateToProps)(withStyles(styles)(ProjectNewDialog));
