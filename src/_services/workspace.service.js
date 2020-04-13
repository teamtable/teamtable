// import config from 'config';
import { API_URL } from "../_actions/apiURL";

export const workspaceService = {
  getAllLists,
  getCurrentLists,
  getListById,
  addList,
  updateList,
  deleteList,
  updateListPositions,
  updateCardPositions,
  addCard,
  updateCard,
  deleteCard,
};

// handles all responses that we receive back from the API
function handleResponse(response) {
  return response.text().then((text) => {
    console.log(response);
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


function getAllLists(project_id) {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json", Authorization: localStorage.getItem("authToken") },
  };

  return fetch(`${API_URL}/projects/${project_id}/lists`, requestOptions).then(handleResponse);
}

function getCurrentLists() {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json", Authorization: localStorage.getItem("authToken") },
  };

  return fetch(`${API_URL}/lists`, requestOptions).then(handleResponse);
}

function getListById(list_id) {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json", Authorization: localStorage.getItem("authToken") },
  };
  return fetch(`${API_URL}/lists/${list_id}`, requestOptions).then(handleResponse);
}

function addList(project_id, list) {
  console.log("addList list: ", JSON.stringify(list));

  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: localStorage.getItem("authToken") },
    body: JSON.stringify({ list }),
  };

  return fetch(`${API_URL}/lists`, requestOptions).then(handleResponse);
}

function updateList(list) {
  console.log("addList list: ", JSON.stringify(list));

  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json", Authorization: localStorage.getItem("authToken") },
    body: JSON.stringify({ list }),
  };

  return fetch(`${API_URL}/lists/${list.list_id}`, requestOptions).then(handleResponse);
}

function deleteList(list_id) {
  const requestOptions = {
    method: "DELETE",
    headers: { "Content-Type": "application/json", Authorization: localStorage.getItem("authToken") },
    body: "",
  };

  return fetch(`${API_URL}/lists/${list_id}`, requestOptions).then(handleResponse);
}


function updateListPositions(list_positions) {
  const requestOptions = {
    method: "PATCH",
    headers: { "Content-Type": "application/json", Authorization: localStorage.getItem("authToken") },
    body: JSON.stringify({ list_positions }),
  };

  return fetch(`${API_URL}/list-positions`, requestOptions).then(handleResponse);
}

function updateCardPositions(cardsPatched) {
  const requestOptions = {
    method: "PATCH",
    headers: { "Content-Type": "application/json", Authorization: localStorage.getItem("authToken") },
    body: JSON.stringify(cardsPatched),
  };

  return fetch(`${API_URL}/card-positions`, requestOptions).then(handleResponse);
}

function addCard(project_id, list_id, card) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: localStorage.getItem("authToken") },
    body: JSON.stringify({ card }),
  };
  return fetch(`${API_URL}/cards`, requestOptions).then(handleResponse);
}


function updateCard(card, cardId) {
  console.log("updateCard card: ", JSON.stringify(card));

  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json", Authorization: localStorage.getItem("authToken") },
    body: JSON.stringify({ card }),
  };

  return fetch(`${API_URL}/cards/${cardId}`, requestOptions).then(handleResponse);
}

function deleteCard(card_id) {
  const requestOptions = {
    method: "DELETE",
    headers: { "Content-Type": "application/json", Authorization: localStorage.getItem("authToken") },
    body: "",
  };

  return fetch(`${API_URL}/cards/${card_id}`, requestOptions).then(handleResponse);
}


/*
function updateLists(project_id, lists) {
    // entweder hier validierung ob title/text präsent (falls man nur eines davon updaten möchte) oder wenn nicht geändert
    // das bisherige mitschicken.
    let project = {
        title: title || null,
        description: description || null
    };

    console.log("ProjectCard of update request: " + JSON.stringify(project)) // TODO ist title/description undefined sollte dieser nicht im projekt enthalten sein

    const requestOptions = {
        method: 'PUT',
        headers: {'Content-Type': 'application/json', 'Authorization': localStorage.getItem('authToken')},
        body: JSON.stringify(project)
    };

    return fetch(`${API_URL}/projects/${project_id}`, requestOptions).then(handleResponse);
}
*/


function getById(id) {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json", Authorization: localStorage.getItem("authToken") },
  };

  return fetch(`${API_URL}/projects/${id}`, requestOptions).then(handleResponse);
}


function removeList(list_id) {
  const requestOptions = {
    method: "DELETE",
    headers: { "Content-Type": "application/json", Authorization: localStorage.getItem("authToken") },
  };
  return fetch(`${API_URL}/lists/${list_id}`, requestOptions).then(handleResponse);
}

function removeCard(cardId) {
  const requestOptions = {
    method: "DELETE",
    headers: { "Content-Type": "application/json", Authorization: localStorage.getItem("authToken") },
  };
  return fetch(`${API_URL}/memberships/${cardId}`, requestOptions).then(handleResponse);
}
