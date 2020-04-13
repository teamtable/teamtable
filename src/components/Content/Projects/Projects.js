import React, { Component } from "react";
import { connect } from "react-redux";

import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import ProjectCard from "./ProjectCard";
import { history } from "../../../utils/history";
import { projectActions } from "../../../_actions/projectActions";
import { workspaceActions } from "../../../_actions/workspaceActions";

const styles = theme => ({
  projectCardWrap: {
    paddingLeft: "15px",
  },
  item: {
    margin: 15,
  },
});

// TODO: Make Action area wrap the whole coard (inkl. CardHeader), but not the EditButton (nested in CardHeader)
// TODO: funktioniert an sich schon wegen e.stopPropagation(), aber es wird ein error geloggt (Button in Button)
const handleCardActionClick = (projectId) => {
  console.log("Entered handlecardActionClick");
  history.push(`/projects/${projectId}`);
};

class Projects extends Component {
  componentDidMount() {
    const { dispatch, workspace } = this.props;
    dispatch(projectActions.getAll()).then(((projects) => {
      if (projects.length >= 1 && workspace.project_id === -1) dispatch(workspaceActions.setCurrentProject(projects[0].id));
    }));
  }

  renderJoinedProjects() {
    const { classes } = this.props;
    const { projects } = this.props.projects;
    return (
      <div>
        {/* eslint-disable-next-line no-nested-ternary */}
        {projects.isRequestingGetAllProjects
          ? <CircularProgress size={36} /> // TODO: not seen it yet
          : projects.length === 0
            ? <p>Create a project to get started..</p>
            : (
              <Grid container>
                {projects.map(project => (
                  <Grid item key={project.id} className={classes.item}>
                    <ProjectCard project={project} onCardClick={handleCardActionClick} />
                  </Grid>
                ))}
              </Grid>
            )}
      </div>
    );
  }


  render() {
    return (
      <div className={this.props.classes.projectCardWrap}>
        {this.renderJoinedProjects()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { projects, workspace } = state;
  return {
    projects,
    workspace,
  };
}

export default Projects = connect(mapStateToProps)(withStyles(styles)(Projects));
