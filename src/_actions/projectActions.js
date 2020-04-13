import { Constants } from "../_constants";
import { projectService } from "../_services/project.service.js";
import { alertActions } from "./alertActions";

export const projectActions = {
  getById,
  getAll,
  create,
  update,
  deleteProject,
  addMember,
  removeMember,
  getMembers,
};

function getById(project_id) {
  return (dispatch) => {
    dispatch(request(project_id));
    return projectService.getById(project_id).then(
      (data) => {
        dispatch(success(data));
        return Promise.resolve(data); // TODO: Evt. lieber die Projekte aus state holen statt sie zu übergeben
      },
      (error) => {
        console.log(error);
        // dispatch(failure(error.toString()));
        // dispatch(alertActions.error(error.toString()));
        return Promise.reject(error);
      },
    );
  };

  function request(project_id) {
    return { type: Constants.PROJECTS_GET_BY_ID_REQUEST, project_id };
  }

  function success(projects) {
    return { type: Constants.PROJECTS_GET_BY_ID_SUCCESS, projects };
  }

  function failure(error) {
    return { type: Constants.PROJECTS_GET_BY_ID_FAILURE, error };
  }
}


function getAll() {
  return (dispatch) => {
    dispatch(request());
    return projectService.getAll().then(
      (data) => {
        dispatch(success(data));
        return Promise.resolve(data); // TODO: Evt. lieber die Projekte aus state holen statt sie zu übergeben
      },
      (error) => {
        console.log(error);
        // dispatch(failure(error.toString()));
        // dispatch(alertActions.error(error.toString()));
        return Promise.reject(error);
      },
    );
  };

  function request() {
    return { type: Constants.PROJECTS_GET_ALL_REQUEST };
  }

  function success(projects) {
    return { type: Constants.PROJECTS_GET_ALL_SUCCESS, projects };
  }

  function failure(error) {
    return { type: Constants.PROJECTS_GET_ALL_FAILURE, error };
  }
}


function create(title, description) {
  return (dispatch) => {
    dispatch(request(title, description));
    return projectService.create(title, description)
      .then(
        (data) => {
          dispatch(success(data));
          return Promise.resolve(data);
        },
        (error) => {
          console.log(error);
          // dispatch(failure(error.toString())); // TODO: error handling
          // dispatch(alertActions.error(error.toString()));
          return Promise.reject(error);
        },
      );
  };

  function request(title, description) {
    return { type: Constants.PROJECTS_CREATE_REQUEST, title, description };
  }

  function success(data) {
    return { type: Constants.PROJECTS_CREATE_SUCCESS, data };
  }

  function failure(error) {
    return { type: Constants.PROJECTS_CREATE_FAILURE, error };
  }
}

function update(project_id, title, description) {
  return (dispatch) => {
    dispatch(request(project_id, title, description));
    return projectService.update(project_id, title, description)
      .then(
        () => Promise.resolve(),
        (error) => {
          console.log(error);
          // dispatch(failure(error.toString())); // TODO: error handling
          // dispatch(alertActions.error(error.toString()));
          return Promise.reject();
        },
      ).then(() => {
        projectService.getById(project_id).then(
          (data) => {
            console.log(`Call dispatch with updated project: ${JSON.stringify(success(data))}`);
            dispatch(success(data));
          },
        );
      });
  };

  function request(project_id, title, description) {
    return { type: Constants.PROJECTS_UPDATE_REQUEST, project_id, title, description };
  }

  function success(project) {
    return { type: Constants.PROJECTS_UPDATE_SUCCESS, project };
  }

  function failure(error) {
    return { type: Constants.PROJECTS_UPDATE_FAILURE, error };
  }
}

function deleteProject(project_id) {
  return (dispatch) => {
    dispatch(request(project_id));
    return projectService.deleteProject(project_id)
      .then(
        () => {
          dispatch(success(project_id));
          return Promise.resolve();
        },
        (error) => {
          console.log(error);
          // dispatch(failure(error.toString())); // TODO: error handling
          // dispatch(alertActions.error(error.toString()));
          return Promise.reject();
        },
      );
  };

  function request(project_id) {
    return { type: Constants.PROJECTS_DELETE_REQUEST, project_id };
  }

  function success(project_id) {
    return { type: Constants.PROJECTS_DELETE_SUCCESS, project_id };
  }

  function failure(error) {
    return { type: Constants.PROJECTS_DELETE_FAILURE, error };
  }
}

function addMember(project_id, email) {
  return (dispatch) => {
    dispatch(request(project_id, email));
    return projectService.addMember(project_id, email)
      .then(
        (data) => {
          dispatch(success(data));
          return Promise.resolve(data);
        },
        (error) => {
          console.log(error);
          // dispatch(failure(error.toString())); // TODO: error handling
          // dispatch(alertActions.error(error.toString()));
          return Promise.reject(error);
        },
      );
  };


  function request(project_id, email) {
    return { type: Constants.PROJECTS_ADD_MEMBER_REQUEST, project_id, email };
  }

  function success(membership) {
    return { type: Constants.PROJECTS_ADD_MEMBER_SUCCESS, membership };
  }

  function failure(error) {
    return { type: Constants.PROJECTS_ADD_MEMBER_FAILURE, error };
  }
}


function removeMember(membershipId) {
  return (dispatch) => {
    dispatch(request(membershipId));
    projectService.removeMember(membershipId)
      .then(
        () => {
          dispatch(success(membershipId));
        },
        (error) => {
          console.log(error);
          // dispatch(failure(error.toString())); // TODO: error handling
          // dispatch(alertActions.error(error.toString()));
        },
      );
  };

  function request(membershipId) {
    return { type: Constants.PROJECTS_REMOVE_MEMBER_REQUEST, membershipId };
  }

  function success(membershipId) {
    return { type: Constants.PROJECTS_REMOVE_MEMBER_SUCCESS, membershipId };
  }

  function failure(error) {
    return { type: Constants.PROJECTS_REMOVE_MEMBER_FAILURE, error };
  }
}

function getMembers(project_id) {
  return (dispatch) => {
    dispatch(request(project_id));
    return projectService.getMembers(project_id)
      .then(
        (data) => {
          dispatch(success(project_id, data));
          return Promise.resolve(data);
        },
        (error) => {
          console.log(error);
          // dispatch(failure(error.toString())); // TODO: error handling
          // dispatch(alertActions.error(error.toString()));
          return Promise.reject(error);
        },
      );
  };

  function request(project_id) {
    return { type: Constants.PROJECTS_GET_MEMBERS_REQUEST, project_id };
  }

  function success(project_id, memberships) {
    return { type: Constants.PROJECTS_GET_MEMBERS_SUCCESS, project_id, memberships };
  }

  function failure(error) {
    return { type: Constants.PROJECTS_GET_MEMBERS_FAILURE, error };
  }
}
