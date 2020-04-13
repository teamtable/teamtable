import { Constants } from "../_constants";
import { userService } from "../_services/user.service.js";
import { alertActions } from "./alertActions";
import { history } from "../utils/history";
import { trackEvent } from "../utils/GoogleAnalytics";

export const userActions = {
  login,
  logout,
  register,
  getAll,
  delete: _delete,
};

function login(email, password) {
  console.log(`${"login --  email: "}${email} pw: ${password}`);
  return (dispatch) => {
    dispatch(request({ email }));

    userService.login(email, password)
      .then(
        (user) => {
          console.log(`userAction: dispatch user: ${user}`);
          dispatch(success(user));
          console.log(`localstorage user${localStorage.getItem("user")}`);
          history.replace("/projects");
          window.location.reload();
          trackEvent("Sign-Up", "Login successful");
        },
        (error) => {
          console.log(`userAction: dispatch error: ${error}`);
          dispatch(failure(error.toString()));
          dispatch(alertActions.error(error.toString()));
        },
      );
  };

  function request(user) { return { type: Constants.USERS_LOGIN_REQUEST, user }; }
  function success(user) { return { type: Constants.USERS_LOGIN_SUCCESS, user }; }
  function failure(error) { return { type: Constants.USERS_LOGIN_FAILURE, error }; }
}

function logout() {
  userService.logout();
  return { type: Constants.USERS_LOGOUT };
}

function register(name, email, password, password_confirmation) {
  return (dispatch) => {
    dispatch(request());

    userService.register(name, email, password, password_confirmation)
      .then(
        (user) => {
          dispatch(success(user));
          history.push("/login");
          dispatch(alertActions.success("Registration successful!\n Please check your email for confirmation."));
          trackEvent("Sign-Up", "Signup successful");
        },
        (error) => {
          dispatch(failure(error.toString()));
          dispatch(alertActions.error(error.toString()));
        },
      );
  };

  function request() { return { type: Constants.USERS_REGISTER_REQUEST }; }
  function success(user) { return { type: Constants.USERS_REGISTER_SUCCESS, user }; }
  function failure(error) { return { type: Constants.USERS_REGISTER_FAILURE, error }; }
}

function getAll() {
  return (dispatch) => {
    dispatch(request());

    userService.getAll()
      .then(
        users => dispatch(success(users)),
        error => dispatch(failure(error.toString())),
      );
  };

  function request() { return { type: Constants.USERS_GETALL_REQUEST }; }
  function success(users) { return { type: Constants.USERS_GETALL_SUCCESS, users }; }
  function failure(error) { return { type: Constants.USERS_GETALL_FAILURE, error }; }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
  return (dispatch) => {
    dispatch(request(id));

    userService.delete(id)
      .then(
        user => dispatch(success(id)),
        error => dispatch(failure(id, error.toString())),
      );
  };

  function request(id) { return { type: Constants.USERS_DELETE_REQUEST, id }; }
  function success(id) { return { type: Constants.USERS_DELETE_SUCCESS, id }; }
  function failure(id, error) { return { type: Constants.USERS_DELETE_FAILURE, id, error }; }
}
