
import { combineReducers } from "redux";
import { auth } from "./auth.reducers";
import { alert } from "./alert.reducers";

import { projects } from "./projects.reducers";
import { workspace } from "./workspace.reducer";
/*
import medicationsReducers from './medicationsReducers';
import insurancesReducers from './insurancesReducers';
import providersReducers from './providersReducers';
import behaviorsReducers from './behaviorsReducers';
*/

const rootReducer = combineReducers({
  auth,
  alert,
  workspace,
  projects,

  /*
    medications: medicationsReducers,
    insurances: insurancesReducers,
    providers: providersReducers,
    behaviors: behaviorsReducers
    */
});

export default rootReducer;
