import { API_URL } from "../_actions/apiURL";

export const projectService = {
  getAll,
  getById,
  create,
  update,
  deleteProject,
  addMember,
  removeMember,
  getMembers,
};

function handleResponse(response) {
  return response.text().then((text) => {
    // console.log(response)
    const data = text && JSON.parse(text);
    if (response.status >= 300) {
      if (response.status === 401) {
        console.log("401 response");
      }
      console.log(response.status);
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }
    // console.log(response.status)
    return data;
  });
}

function getById(id) {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json", Authorization: localStorage.getItem("authToken") },
  };

  return fetch(`${API_URL}/projects/${id}`, requestOptions).then(handleResponse);
}

function getAll() {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json", Authorization: localStorage.getItem("authToken") },
  };

  return fetch(`${API_URL}/projects`, requestOptions).then(handleResponse);
}

function create(title, description) {
  const project = {
    title,
    description,
  };

  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: localStorage.getItem("authToken") },
    body: JSON.stringify({ project }),
  };

  return fetch(`${API_URL}/projects`, requestOptions).then(handleResponse);
}

function update(project_id, title, description) {
  const project = {
    title: title || null,
    description: description || null,
  };

  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json", Authorization: localStorage.getItem("authToken") },
    body: JSON.stringify(project),
  };

  return fetch(`${API_URL}/projects/${project_id}`, requestOptions).then(handleResponse);
}

function deleteProject(project_id) {
  const requestOptions = {
    method: "DELETE",
    headers: { "Content-Type": "application/json", Authorization: localStorage.getItem("authToken") },
  };
  return fetch(`${API_URL}/projects/${project_id}`, requestOptions).then(handleResponse);
}

function addMember(project_id, email) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: localStorage.getItem("authToken") },
    body: JSON.stringify({ project_id, email }),
  };
  return fetch(`${API_URL}/memberships`, requestOptions).then(handleResponse);
}

function removeMember(membershipId) {
  const requestOptions = {
    method: "DELETE",
    headers: { "Content-Type": "application/json", Authorization: localStorage.getItem("authToken") },
  };
  return fetch(`${API_URL}/memberships/${membershipId}`, requestOptions).then(handleResponse);
}

function getMembers(project_id) {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json", Authorization: localStorage.getItem("authToken") },
  };
  return fetch(`${API_URL}/projects/${project_id}/members`, requestOptions).then(handleResponse);
}
