
import { authHeader } from "../utils/auth-header";
import { API_URL } from "../_actions/apiURL";

export const userService = {
  login,
  logout,
  register,
  getAll,
  getById,
  update,
  delete: _delete,
};

function login(email, password) {
  const user = {
    email,
    password,
  };

  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user }),
  };

  return fetch(`${API_URL}/login`, requestOptions)
    .then(handleResponse)
    .then((handledResponse) => {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem("user", JSON.stringify(handledResponse.responseText));
      localStorage.setItem("authToken", handledResponse.response.headers.get("Authorization"));
      return handledResponse.responseText;
    });
}

function register(name, email, password, password_confirmation) {
  const user = {
    name,
    email,
    password,
    password_confirmation,
  };

  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user }),
  };

  return fetch(`${API_URL}/signup`, requestOptions)
    .then(handleResponse)
    .then(handledResponse => handledResponse.responseText);
}


function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem("user");
  localStorage.removeItem("authToken");
}

function getAll() {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };

  return fetch(`${API_URL}/users`, requestOptions).then(handleResponse);
}

function getById(id) {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };

  return fetch(`${API_URL}/users/${id}`, requestOptions);
}


function update(user) {
  const requestOptions = {
    method: "PUT",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(user),
  };

  return fetch(`${API_URL}/users/${user.id}`, requestOptions).then(handleResponse);
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
  const requestOptions = {
    method: "DELETE",
    headers: authHeader(),
  };

  return fetch(`${API_URL}/users/${id}`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        console.log("401 response");
        logout();
        // location.reload(true);
      }


      const parsed = JSON.parse(text);
      let errorText = "";

      if (parsed.errors) {
        for (const prop in parsed.errors) {
          if (parsed.errors.hasOwnProperty(prop)) {
            errorText += `${parsed.errors[prop]}. `;
          }
        }
      } else {
        errorText = response.statusText;
      }

      console.log(`HandleResponse errorText: ${errorText}`);

      return Promise.reject(errorText);
    }
    console.log(`response data: ${data}`);

    const handledResponse = {
      response,
      responseText: data,
    };

    return handledResponse;
  });
}
