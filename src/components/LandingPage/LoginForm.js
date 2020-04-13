import React, { Component } from "react";
import { Form, Col, Grid } from "react-bootstrap";

import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import "./styles/LoginForm.scss";
import { Button, TextField } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";

import withStyles from "@material-ui/core/styles/withStyles";
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


class LoginForm extends Component {
  constructor(props) {
    super(props);

    // reset login status
    // this.props.dispatch(userActions.logout());

    this.state = {
      email: "",
      password: "",
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
      const { email, password } = this.state;
      console.log(`login click --  email: ${email} pw: ${password}`);
      const { dispatch } = this.props;
      if (email && password) {
        const dispatchReturn = dispatch(userActions.login(email, password));
        console.log(`dispatch return login: ${dispatchReturn}`);
        console.log(`localstorage user${localStorage.getItem("user")}`);
      }
      trackEvent("Sign-Up", "submitted");
    }

    renderError() {
      let { alert } = this.props;
      alert = alert.auth;

      if (!alert || !alert.message) return false;

      if (!(alert.type === "alert-success")) {
        return (
          <div className="alert alert-danger" role="alert">
            {alert.message}
          </div>
        );
      }

      return (
        <div className="alert alert-success" role="alert" style={{ whiteSpace: "pre-line" }}>
          {alert.message}
        </div>
      );
    }


    render() {
      const { email, password, submitted } = this.state;
      const { classes, auth } = this.props;

      console.log(auth.isAuthenticating);

      return (
        <main>
          <Form onSubmit={this.handleSubmit}>
            {this.renderError()}

            <TextField
              {...(submitted && !password && { error: true })}
              id="login-email"
              label="Email Address *"
              type="text"
              className={classes.textField}
              value={email}
              onChange={this.handleChange("email")}
            />

            <TextField
              {...(submitted && !password && { error: true })}
              id="login-password"
              label="Password *"
              type="password"
              className={classes.textField}
              value={password}
              onChange={this.handleChange("password")}
            />

            <div className="submissionFields" style={{ textAlign: "center", paddingTop: "00px" }}>
              {auth.isAuthenticating
                ? <CircularProgress size={36} className={classes.submit} />
                : (
                  <Button type="submit" value="Login" variant="contained" color="primary" className={classes.submit}>
                                Log in
                  </Button>
                )}
            </div>

            <div className="alternativeAccess" style={{ textAlign: "right", paddingTop: "20px" }}>
              <p>Not a member? <Link to="/signup" onClick={() => (trackEvent("Sign-Up", "Click: Sign up", "Login Form"))}>Sign up</Link></p>
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

export default LoginForm = withRouter(connect(mapStateToProps)(withStyles(styles)(LoginForm)));

/*


        const OldLogin = ()  => {
            return (
                <main>
                    <Form onSubmit={this.handleSubmit}>
                        {this.renderError()}
                        <TextFieldGroup
                            label="Email"
                            id="formControlsEmail"
                            type="text"
                            name="email"
                            placeholder="Email"
                            value={this.state.email}
                            onChange={this.handleChange}
                            className={(submitted && !email ? 'form-control form-field text-field has-error' : 'form-control form-field text-field')}
                            helpBlock=
                                {submitted && !email &&
                                <div className="help-block has-error">Email is required</div>
                                }
                        />

                        <TextFieldGroup
                            label="Password"
                            id="formControlsPassword"
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={this.state.password}
                            onChange={this.handleChange}
                            className={(submitted && !password ? 'form-control form-field text-field has-error' : 'form-control form-field text-field')}
                            helpBlock=
                                {submitted && !password &&
                                <div className="help-block has-error">Password is required</div>
                                }
                        />
                        <div className="submissionFields" style={{textAlign: "center"}}>
                            <Button type="submit" value="Login" variant="contained" color="primary" style={{width: "100%"}}>
                                Log in
                            </Button>
                        </div>
                        <div className="alternativeAccess" style={{textAlign: "right", paddingTop:"20px"}}>
                            <p>Not a member? <Link to="/signup">Sign Up</Link></p>
                        </div>
                    </Form>
                </main>
            );
        };


<FormControl className={classes.textField} { ...( submitted && !password && { error:true } ) }>
                        <InputLabel htmlFor="component-error">Name</InputLabel>
                        <Input
                            id="component-error"
                            value={this.state.name}
                            onChange={this.handleChange}
                            aria-describedby="component-error-text"
                        />


                            <FormHelperText id="component-error-text" className={classes.textFieldHelper}>
                                {submitted && !password &&
                                <main>Please enter a password</main>
                                }
                                </FormHelperText>
                    </FormControl>
 */
