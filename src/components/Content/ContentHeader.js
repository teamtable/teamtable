import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, withRouter, Switch } from "react-router-dom";

import "./ContentHeader.scss";
import Typography from "@material-ui/core/Typography";
import ProjectNewDialog from "./Projects/ProjectNewDialog";
import ListNewDialog from "./Workspace/ListNewDialog";

class ContentHeader extends Component {
  render() {
    // Workspace Selection Header Menu
    const ProjectsHeader = () => (
      <main id="content-header-wrap">

        <Typography gutterBottom variant="h5" component="h2" className="center-vertically">
                        Projects
        </Typography>

        <div className="content-header-buttons">
          <ProjectNewDialog />
        </div>
      </main>
    );


    const WorkspaceTitle = (id) => {
      console.log(`Workspacetitle ${id}`);
      const { projects } = this.props;

      const project = projects.projects.find(p => p.id.toString() === id.toString());
      console.log("project found: ", project);
      if (project) return project.title;
      return null;
    };

    // lists menu
    const ProjectHeader = ({ match }) => (
      <main id="content-header-wrap">
        <div className="content-header-title">
          <h1 className="center-vertically">{WorkspaceTitle(match.params.id)}</h1>
          <div className="content-header-buttons">
            <ListNewDialog />
          </div>
        </div>
      </main>

    );

    const MyMenu = props => (
      <Switch>
        <Route exact path="/projects/:id" component={ProjectHeader} />
        <Route path="/projects/" component={ProjectsHeader} />
      </Switch>
    );

    return (
      <MyMenu />
    );
  }
}

function mapStateToProps(state) {
  const { projects } = state;
  return {
    projects,
  };
}

export default ContentHeader = withRouter(connect(mapStateToProps)(ContentHeader));
