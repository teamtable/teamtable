import fetch from "isomorphic-fetch";
import { API_URL } from "../_actions/apiURL";
import * as types from "./actionTypes";

const authRequest = () => ({
  type: types.AUTHENTICATION_REQUEST,
});

const authSuccess = (user, token) => ({
  type: types.AUTHENTICATION_SUCCESS,
  user,
  token,
});

const authFailure = errors => ({
  type: types.AUTHENTICATION_FAILURE,
  errors,
});

export const logout = () => (dispatch) => {
  localStorage.clear();
  return dispatch({
    type: types.LOGOUT,
  });
};

export const signup = (user) => {
  const newUser = user;
  return dispatch => fetch(`${API_URL}/users`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user }),
  })
    .then(response => response.json())
    .then((jresp) => {
      dispatch(authenticate({ name: newUser.name,
        email: newUser.email,
        password: newUser.password }));
    })
    .catch((errors) => {
      dispatch(authFailure(errors));
    });
};

export const authenticate = credentials => (dispatch) => {
  dispatch(authRequest());
  return fetch("http://localhost:3001/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ auth: credentials }),
  })
    .then(res => res.json())
    .then((response) => {
      const token = response.jwt;
      localStorage.setItem("token", token);
    })
    .then((user) => {
      console.log(user);
      dispatch(authSuccess(user, localStorage.token)); // switched authFailure and authSuccess
    })
    .catch((errors) => {
      dispatch(authFailure(errors)); // switched
      console.log(errors);
      localStorage.clear();
    });
};

/*
export const getUser = (credentials) => {
    const request = new Request(`${API_URL}/find_user`, {
        method: "POST",
        headers: new Headers({
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.token}`,
        }),
        body: JSON.stringify({user: credentials})
    });
    return fetch(request)
        .then(response => response.json())
        .then(userJson => {return userJson})
        .catch(error => {
            return error;
        });
};
*/
