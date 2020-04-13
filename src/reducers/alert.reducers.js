import { combineReducers } from "redux";
import { Constants } from "../_constants";

function authAlertReducer(state = {}, action) {
  switch (action.type) {
  case Constants.ALERT_SUCCESS:
    return {
      type: "alert-success",
      message: action.message,
    };
  case Constants.ALERT_ERROR:
    return {
      type: "alert-danger",
      message: action.message,
    };
  case Constants.ALERT_CLEAR:
    return {};
  default:
    return state;
  }
}

function projectsAlertReducer(state = {}, action) {
  switch (action.type) {
  case Constants.ALERT_SUCCESS:
    return {
      type: "alert-success",
      message: action.message,
    };
  case Constants.ALERT_ERROR:
    return {
      type: "alert-danger",
      message: action.message,
    };
  case Constants.ALERT_CLEAR:
    return {};
  default:
    return state;
  }
}

export const alert = combineReducers({
  auth: authAlertReducer,
  projects: projectsAlertReducer,
});
