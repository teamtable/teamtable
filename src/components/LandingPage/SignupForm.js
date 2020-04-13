import React, { Component } from "react";
import { Form, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { Button, TextField } from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";
import { signup } from "../../unused/authActions";
import TextFieldGroup from "../_common/FormFields";
import { userActions } from "../../_actions/userActions";
import { trackEvent } from "../../utils/GoogleAnalytics";


const styles = theme => ({
  submit: {
    width: "100%",
    marginTop: "20px",
  },
  textField: {
    width: "100%",
    paddingBottom: "10px",
  },
});

class SignupForm extends Component {
  constructor(props) {
    super(props);


    // reset login status
    // this.props.dispatch(userActions.logout());

    this.state = {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
      submitted: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

    handleChange = name => (event) => {
      this.setState({ [name]: event.target.value });
    };


    handleSubmit(e) {
      e.preventDefault();

      this.setState({ submitted: true });
      const user = {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
        password_confirmation: this.state.password_confirmation,
      };

      const { name, email, password, password_confirmation } = this.state;

      console.log(`signup click --  user: ${JSON.stringify({ user })}`);
      const { dispatch } = this.props;
      if (user.name && user.email && user.password && user.password_confirmation) {
        const dispatchReturn = dispatch(userActions.register(name, email, password, password_confirmation));
        console.log(`dispatch return login: ${dispatchReturn}`);
        console.log(`localstorage user${localStorage.getItem("user")}`);
        trackEvent("Sign-Up", "submitted");
      }
    }

    renderError() {
      let { alert } = this.props;
      alert = alert.auth;

      if (!alert || !alert.message) return false;

      return (
        <div className="alert alert-danger" role="alert">
          {alert.message}
        </div>
      );
    }

    render() {
      const { name, email, password, password_confirmation, submitted } = this.state;
      const { classes, auth } = this.props;

      return (
        <main>
          <Form onSubmit={this.handleSubmit}>
            {this.renderError()}

            <TextField
              {...(submitted && !name && { error: true })}
              id="signup-name"
              label="Name *"
              type="text"
              className={classes.textField}
              value={name}
              onChange={this.handleChange("name")}
            />

            <TextField
              {...(submitted && !password && { error: true })}
              id="signup-email"
              label="Email Address *"
              type="text"
              className={classes.textField}
              value={email}
              onChange={this.handleChange("email")}
            />

            <TextField
              {...(submitted && !password && { error: true })}
              id="signup-password"
              label="Password *"
              type="password"
              className={classes.textField}
              value={password}
              onChange={this.handleChange("password")}
            />

            <TextField
              {...(submitted && !password_confirmation && { error: true })}
              id="signup-password-confirm"
              label="Password Repeat *"
              type="password"
              className={classes.textField}
              value={password_confirmation}
              onChange={this.handleChange("password_confirmation")}
            />

            <div className="submissionFields" style={{ textAlign: "center", paddingTop: "00px" }}>
              {auth.isRegistering
                ? <CircularProgress size={36} className={classes.submit} />
                : (
                  <Button type="submit" value="Signup" variant="contained" color="primary" className={classes.submit}>
                                Sign Up
                  </Button>
                )}
            </div>
            <div className="alternativeAccess" style={{ textAlign: "right", paddingTop: "20px" }}>
              <p>Already a member? <Link to="/login">Log in</Link></p>
            </div>
          </Form>
        </main>
      );
    }
}


function mapStateToProps(state) {
  const { alert, auth } = state;
  return {
    alert,
    auth,
  };
}

export default SignupForm = withRouter(connect(mapStateToProps)(withStyles(styles)(SignupForm)));
