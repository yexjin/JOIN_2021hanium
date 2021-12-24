import { combineReducers } from "redux";
import { penderReducer } from "redux-pender";
import memberReducer from "./member";
import classesReducer from "./classes";
import assignmentsReducer from "./assignments";
import commentsReducer from "./comments";
import teamsReducer from "./teams";
import chatsReducer from "./chats";
import enrolmentReducer from "./enrolment";
import discussReducer from "./discuss";

export default combineReducers({
  pender: penderReducer,
  member: memberReducer,
  classes: classesReducer,
  assignments: assignmentsReducer,
  comments: commentsReducer,
  teams: teamsReducer,
  chats: chatsReducer,
  enrol: enrolmentReducer,
  discuss: discussReducer,
});
