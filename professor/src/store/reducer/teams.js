import { createAction, handleActions } from "redux-actions";
import { pender } from "redux-pender";
import { Map, List, fromJS } from "immutable";
import { TeamsApi } from "../../remote";

export const LISTALL_TEAMS = "teams/LISTALL";
export const NOTEAM_STUDENTS = "teams/noteam";

export const listAllTeams = createAction(LISTALL_TEAMS, TeamsApi.listAllTeams);

export const insertStudentsApi = TeamsApi.insertStudentTeam;
export const deleteStudentsApi = TeamsApi.deleteStudentTeam;
export const createTeamApi = TeamsApi.create;
export const deleteTeamApi = TeamsApi.remove;
export const createRandomTeamsApi = TeamsApi.createRandomTeams;

export const studentsNoTeam = createAction(NOTEAM_STUDENTS, TeamsApi.studentsNoTeam);

const initialState = Map({
  list: Map({
    count: 0,
    results: List([]),
  }),
  noteam: Map({
    count: 0,
    results: List([]),
  }),
});

export default handleActions(
  {
    ...pender({
      type: LISTALL_TEAMS,
      onSuccess: (state, action) => {
        return state.set("list", fromJS(action.payload.data));
      },
    }),
    ...pender({
      type: NOTEAM_STUDENTS,
      onSuccess: (state, action) => {
        return state.set("noteam", fromJS(action.payload.data));
      }
    })
  },
  initialState
);
