import React, { Component } from "react";
import fetch from "isomorphic-fetch";

class ProjectsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      project1: null,
      projects: [],
      numbers: [1, 2, 3, 4, 5],
    };
  }

  /*
  componentDidMount() {
    // Get project by id
    axios.get('http://localhost:3001/projects/1.json')
        .then(response => {
          this.setState({project1: response.data})
        })
        .catch(error => console.log(error))

    // Get all projects
    axios.get('http://localhost:3001/projects.json')
        .then(response => {
          this.setState({projects: response.data.projects})
          console.log(response.data)
          console.log(this.state.projects)
          // console.log(response.status)
          // console.log(response.headers)
        })
        .catch(error => console.log(error))
  }
  */

  render() {
    const project1_title = "";
    if (this.state.project1 != null) {
      //  project1_title = this.state.project1.title
    }

    return (
    /* instead of a div, to have a surrounding for babel compiler, but not in result */
      <>
        <div className="projectsContainer border col-md-6">
          {project1_title}

          {
            this.state.projects.map(project => (
              <div className="project" key={project.id}>
                <h4>{project.title}</h4>
                <p>ID: {project.id}</p>
                <p>Description: {project.description}</p>
                <p>Members: {project.members}</p>
                <hr />
              </div>
            ))
          }
        </div>
      </>
    );
  }
}

export default ProjectsContainer;
