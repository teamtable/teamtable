import React from "react";
import { connect } from "react-redux";

import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Chip from "@material-ui/core/Chip";
// import ProjectDeleteDialog from "./ProjectDeleteDialog";
import { projectActions } from "../../../_actions/projectActions";
import DeleteButtonDialog from "../../molecules/DeleteButtonDialog";

const styles = theme => ({
  button: {
    margin: 10,
  },
  icon: {
    marginTop: "8px",
  },
  deleteButton: {
    marginRight: "auto",
    marginLeft: 10,
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
    marginTop: 5,
    marginLeft: -5,
  },
  chip: {
    margin: "5px",
    height: "30px",
  },
});

class ProjectEditDialog extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      projectBefore: {
        title: "",
        description: "",
        memberChips: [],
      },
      project: {
        id: this.props.project_id,
        title: "",
        description: "",
      },
      email: "",
      memberChips: [],
    };


    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  initialize = (_callback) => {
    const { project_id } = this.props;
    const project = this.props.projects.find(p => p.id === project_id);
    const { dispatch } = this.props;
    this.setState({
      projectBefore: {
        ...this.state.projectBefore,
        title: project.title,
        description: project.description,
      },
      project: {
        id: project.id,
        title: project.title,
        description: project.description,
      },
    });

    dispatch(projectActions.getMembers(project_id)).then(members => members.forEach(m => this.state.projectBefore.memberChips.push({ key: m.id, label: m.email }))).then(() => _callback());
  };

  handleClickOpen = () => {
    this.initialize(() => {
      this.setState({ open: true });
    });
  };

  handleClose = () => {
    this.setState({
      open: false,
      projectBefore: {
        title: "",
        description: "",
        memberChips: [],
      },
      project: {
        ...this.state.project,
        title: "",
        description: "",
      },
      email: "",
      memberChips: [],
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

  handleSubmit = (e) => {
    e.stopPropagation();
    const { id, title, description } = this.state.project;
    const { dispatch } = this.props;
    dispatch(projectActions.update(id, title, description)).then(() => {
      this.handleClose();
    });
  };

  handleAddMember = () => {
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

  handleCancel = (e) => {
    e.stopPropagation();

    const { dispatch } = this.props;
    this.state.memberChips.forEach(m => dispatch(projectActions.removeMember(m.key)));
    this.handleClose();
  };


  handleDelete = () => {
    const { dispatch, project_id } = this.props;
    dispatch(projectActions.deleteProject(project_id)).then(() => {
      this.handleClose();
    });
  };

  render() {
    const { classes, deletedProjects, project_id } = this.props;
    return (
      <div onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        e.nativeEvent.stopImmediatePropagation();
      }}
      >
        <IconButton
          className={classes.icon}
          onMouseDown={e => e.stopPropagation()}
          onClick={(e) => {
            this.handleClickOpen();
            e.stopPropagation();
          }}
        >
          <MoreVertIcon />

        </IconButton>


        <Dialog
          open={deletedProjects.findIndex(dp => dp === project_id) === -1 ? this.state.open : false}
          onClose={this.handleSubmit}
          aria-labelledby="form-dialog-title"
          className={classes.dialog}
        >
          <DialogTitle id="form-dialog-title">Edit Project</DialogTitle>
          <DialogContent>

            <TextField
              autoFocus
              margin="dense"
              id="title"
              label="Project Title"
              type="text"
              fullWidth
              defaultValue={this.state.projectBefore.title}
              value={this.state.title} // alt. mittels konstante die man oben definiert
              onChange={this.handleChange("title")}
            />

            <TextField
              margin="dense"
              id="description"
              label="Project Description"
              type="text"
              fullWidth
              defaultValue={this.state.projectBefore.description}
              value={this.state.description}
              onChange={this.handleChange("description")}
              multiline
              rows="1"
              rowsMax="6"
            />

            <TextField
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

            {/* TODO: Wenn auf Rails Seite implementiert MemberCHips abhämgig von Rechten deletable machen
                Bis dahin können nur frisch hinzugefügte Memberschips wieder gelöscht werden */}
            <div className={classes.chipContainer}>
              {this.state.projectBefore.memberChips.map(data =>
              // let icon = null;
                (
                  <Chip
                    key={data.key}
                    /* icon={icon} */
                    label={data.label}
                    className={classes.chip}
                  />
                ))}
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
            <DeleteButtonDialog deleteAction={this.handleDelete} dialogText={`Are you sure you want to delete the project titled '${this.state.projectBefore.title}'?`} />

            <Button onClick={this.handleCancel} color="primary">
                        Cancel
            </Button>
            <Button onClick={this.handleSubmit} color="primary">
                        Save
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { projects, deletedProjects } = state.projects;
  return {
    projects,
    deletedProjects,
  };
}

export default ProjectEditDialog = connect(mapStateToProps)(withStyles(styles)(ProjectEditDialog));
