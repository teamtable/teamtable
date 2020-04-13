import { Constants } from "../_constants";

export const alertActions = {
  success,
  error,
  clear,
};

function success(message) {
  return { type: Constants.ALERT_SUCCESS, message };
}

function error(message) {
  return { type: Constants.ALERT_ERROR, message };
}

function clear() {
  return { type: Constants.ALERT_CLEAR };
}
