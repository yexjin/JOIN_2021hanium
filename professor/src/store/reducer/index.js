import { combineReducers } from "redux";
import { penderReducer } from "redux-pender";
import memberReducer from "./member";
import classesReducer from "./classes";
import assignmentsReducer from "./assignments";
import commentsReducer from "./comments";
import teamsReducer from "./teams";
import enrolmentReducer from "./enrolment";
import reportReducer from "./report";

export default combineReducers({
  pender: penderReducer,
  member: memberReducer,
  classes: classesReducer,
  assignments: assignmentsReducer,
  comments: commentsReducer,
  teams: teamsReducer,
  enrol: enrolmentReducer,
  report: reportReducer,
});
