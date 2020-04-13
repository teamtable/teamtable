import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, withRouter, Switch } from "react-router-dom";
import { logout } from "../../unused/authActions";

import Projects from "./Projects/Projects";
import ProjectCard from "./Projects/ProjectCard";
import Workspace from "./Workspace/Workspace";
import ContentHeader from "./ContentHeader";

import "./Content.scss";

class Content extends Component {
  render() {
    const MyContent = props => (
      <div id="content-container">
        <Switch>
          <Route exact path="/projects/:id" component={WorkspaceComponent} />
          <Route path="/projects" component={Projects} />
        </Switch>
      </div>
    );

    return (
      <main id="content-wrap">
        <ContentHeader />
        <MyContent />
      </main>
    );
  }
}

function ProjectComponent({ match }) {
  return (
    <ProjectCard id={match.params.id} />
  );
}


function WorkspaceComponent({ match }) {
  return (
    <Workspace id={match.params.id} />
  );
}


export default Content = withRouter(connect(null, { logout })(Content));

//                            <Route exact path='/projects/:id' component={ProjectComponent} />

/*
<div>
    <NavigationSidebar navigationSidebarOpen={this.props.navigationSidebarOpen }/>
    <ChatSidebar navigationSidebarOpen={this.props.chatSidebarOpen && !this.props.isClosing}/>
</div>
*/
