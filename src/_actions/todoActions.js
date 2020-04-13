/*
import { API_URL } from './apiURL'
import * as types from './actionTypes'

const todoLink = `${API_URL}/todos`;

// Action Creators
const setTodos = todos => {
    return {
        type: types.REQUEST_PROJECTS,
        todos  //collection of todos
    }
};

const addTodo = todo => {
    return {
        type: types.ADD_PROJECT,
        todo
    }
};

const destroyTodo = todo => {
    return {
        type: types.DELETE_PROJECT,
        id: todo
    }
};

// Action Creators - FORM

const setSelectedTodo = todo => {
    return {
        type: types.UPDATE_PROJECT,
        todo
    }
};

export const resetTodoForm = () => {
    return {
        type: types.RESET_FORM
    }
};

// Async Actions
export const getTodos = () => {
    return (dispatch) => {
        return fetch(`${todoLink}`, {
            headers: {
                "Authorization": `Bearer ${localStorage.token}`,
            },
        })
            .then(response => response.json())
            .then(todos => {
                dispatch(setTodos(todos))
            }) //returns collection of todos
            .catch(error => console.log(error));
    };
};

export const createTodo= todo => {
    return (dispatch) => {
        return fetch(`${todoLink}`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${localStorage.token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({todo: todo})
        })
            .then(response => response.json())
            .then(todo => {
                dispatch(addTodo(todo));
                dispatch(resetTodoForm());
            })
            .catch(error => console.log(error))
    };
};

export const updateTodo = (todoId, todo) => {
    return (dispatch) => {
        return fetch(`${todoLink}/${todoId}`, {
            method: "PATCH",
            headers: {
                "Authorization": `Bearer ${localStorage.token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({todo: todo})
        })
            .then(response => response.json())
            .then(todo => {
                dispatch(setSelectedTodo(todo));
                dispatch(resetTodoForm());
            })
            .catch(error => console.log(error))
    };
};

export const deleteTodo = todoId => {
    return (dispatch) => {
        return fetch(`${todoLink}/${todoId}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${localStorage.token}`,
                "Accept":"application/json",
                'Content-Type': 'application/json'
            }
        })
            .then(todo => {
                dispatch(destroyTodo(todo));
            })
            .catch(error => console.log(error))
    };
};

export const updateCompletion = (todo) => {
    return (dispatch) => {
        return fetch(`${API_URL}/todos/${todo.id}`, {
            method: "PATCH",
            headers: {
                "Authorization": `Bearer ${localStorage.token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({todo: todo})
        })
            .then(response => response.json())
            .then(updatedTodo => {
                dispatch(setSelectedTodo(updatedTodo));
            })
            .catch(error => console.log(error))
    };
};
s */
