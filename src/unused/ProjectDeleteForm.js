import React, { Component } from "react";
import axios from "axios";

class ProjectDeleteForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
    };
  }

  handleChange = (event) => {
    // bracket notation for dynamic variable names
    this.setState({ id: event.target.value });
    //   console.log(this.state)
  }

  handleSubmit = (event) => {
    event.preventDefault();

    axios.delete("http://localhost:3001/projects/".concat(this.state.id))
      .then((response) => {
        console.log("deleted");
        console.log(response);
        console.log(response.data);
      });
  }

  render() {
    return (
      <div className="projectCreateForm text-right">
        <form onSubmit={this.handleSubmit}>

          <label className="col-md-10">
              Project id:
            <input type="text" name="id" placeholder="Title" onChange={this.handleChange} />
          </label>

          <div className="clearfix" />
          <button className="btn btn-danger" type="submit">Delete</button>
        </form>
      </div>
    );
  }
}

export default ProjectDeleteForm;
