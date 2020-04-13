import React, { Component } from "react";
import axios from "axios";

class ProjectCreateForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      project: {
        title: "",
        description: "",
        members: "",
      },
    };
  }

  handleChange = (event) => {
    // bracket notation for dynamic variable names
    this.setState({ [event.target.name]: event.target.value });
    //   console.log(this.state)
  };

  handleSubmit = (event) => {
    console.log("entered");
    event.preventDefault();

    const project = {
      title: this.state.title,
      description: this.state.description,
      members: this.state.members,
    };

    console.log(project);
    axios.post("http://localhost:3001/projects", { project })
      .then((response) => {
        console.log("finished");
        console.log(response);
        console.log(response.data);
      });
  };

  render() {
    return (
      <div className="projectCreateForm text-right">
        <form onSubmit={this.handleSubmit}>

          <label className="col-md-10">
              Project title:
            <input type="text" name="title" placeholder="Title" onChange={this.handleChange} />
          </label>

          <label className="col-md-10">
              Project description:
            <input type="text" name="description" placeholder="Description" onChange={this.handleChange} />
          </label>

          <label className="col-md-10">
              Project members:
            <input type="text" name="members" placeholder="Members" onChange={this.handleChange} />
          </label>

          <div className="clearfix" />
          <button className="btn btn-primary" type="submit">Add</button>
        </form>
      </div>
    );
  }
}

export default ProjectCreateForm;
