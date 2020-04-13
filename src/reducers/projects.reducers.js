import { Constants } from "../_constants";

const initialState = {
  projects: [],
  memberships: [],
  isRequestingGetById: false,
  isRequestingGetAllProjects: false,
  isRequestingUpdateProject: false,
  isRequestingCreateProject: false,
  isRequestingDeleteProject: false,
  deletedProjects: [],
  isRequestingAddMember: false,
  isRequestingRemoveMember: false,
  isRequestingGetMembers: false,
};


export function projects(state = initialState, action = {}) {
  const { projects, deletedProjects, memberships } = state;

  switch (action.type) {
  case Constants.PROJECTS_GET_BY_ID_REQUEST:
    return { ...state, isRequestingGetById: true };

  case Constants.PROJECTS_GET_BY_ID_FAILURE:
    return { ...state, formErrors: action.errors };

  case Constants.PROJECTS_GET_BY_ID_SUCCESS:
    projects[projects.findIndex(p => p.id === action.project_id)] = action.project;
    return { ...state, projects, isRequestingGetById: false };


  case Constants.PROJECTS_GET_ALL_REQUEST:
    return { ...state, isRequestingGetAllProjects: true };

  case Constants.PROJECTS_GET_ALL_SUCCESS:
    // // const { projects } = state;
    return { ...state, projects: action.projects, isRequestingGetAllProjects: false };

  case Constants.PROJECTS_GET_ALL_FAILURE:
    return { ...state, formErrors: action.errors };


  case Constants.PROJECTS_CREATE_REQUEST:
    return { ...state, isRequestingCreateProject: true };

  case Constants.PROJECTS_CREATE_FAILURE:
    return { ...state, formErrors: action.errors };

  case Constants.PROJECTS_CREATE_SUCCESS:
    // const { projects } = state;
    return {
      ...state,
      projects: [action.data.project].concat(projects),
      memberships: [action.data.membership].concat(memberships),
      isRequestingCreateProject: false,
    };


  case Constants.PROJECTS_UPDATE_REQUEST:
    return { ...state, isRequestingUpdateProject: true };

  case Constants.PROJECTS_UPDATE_FAILURE:
    return { ...state, formErrors: action.errors };

  case Constants.PROJECTS_UPDATE_SUCCESS:
    console.log(JSON.stringify(projects));
    projects[projects.findIndex(p => p.id === action.project.id)] = action.project;
    return { ...state, projects, isRequestingUpdateProject: false };


  case Constants.PROJECTS_DELETE_REQUEST:
    return { ...state, isRequestingDeleteProject: true };

  case Constants.PROJECTS_DELETE_FAILURE:
    return { ...state, formErrors: action.errors };

  case Constants.PROJECTS_DELETE_SUCCESS:
    deletedProjects.push(action.project_id);
    return {
      ...state,
      projects: projects.filter(p => p.id !== action.project_id),
      memberships: memberships.filter(m => m.project_id !== action.project_id),
      isRequestingDeleteProject: false,
      deletedProjects,
    };


  case Constants.PROJECTS_ADD_MEMBER_REQUEST:
    return { ...state, isRequestingAddMember: true };

  case Constants.PROJECTS_ADD_MEMBER_FAILURE:
    return { ...state, formErrors: action.errors };

  case Constants.PROJECTS_ADD_MEMBER_SUCCESS:
    return { ...state, memberships: [action.membership].concat(memberships), isRequestingAddMember: false };


  case Constants.PROJECTS_REMOVE_MEMBER_REQUEST:
    return { ...state, isRequestingRemoveMember: true };

  case Constants.PROJECTS_REMOVE_MEMBER_FAILURE:
    return { ...state, formErrors: action.errors };

  case Constants.PROJECTS_REMOVE_MEMBER_SUCCESS:
    return {
      ...state,
      memberships: memberships.filter(m => m.id !== action.membershipId),
      isRequestingRemoveMember: false,
    };


  case Constants.PROJECTS_GET_MEMBERS_REQUEST:
    return { ...state, isRequestingGetMembers: true };

  case Constants.PROJECTS_GET_MEMBERS_FAILURE:
    return { ...state, formErrors: action.errors };

  case Constants.PROJECTS_GET_MEMBERS_SUCCESS:
    const membershipsNew = memberships.filter(m => m.project_id !== action.project_id).concat(action.memberships);
    return { ...state, memberships: membershipsNew, isRequestingGetMembers: false };


  default:
    return state;
  }
}
