import { createAction, handleActions } from "redux-actions";
import { pender } from "redux-pender";
import { Map, List, fromJS } from "immutable";
import { ReportApi } from "../../remote";

export const LISTALL_TEAM = "report/LISTALLBYTEAM";
export const LISTALL_ASSIGN = "report/LISTALLBYASSIGNMENT";

export const listAllByTeam = createAction(LISTALL_TEAM, ReportApi.listByTeam);
export const listAllByAssign = createAction(
  LISTALL_ASSIGN,
  ReportApi.listByAssign
);

const initialState = Map({
  list: Map({
    count: 0,
    results: List([]),
  }),
  teamList: Map({
    count: 0,
    results: List([]),
  }),
});

export default handleActions(
  {
    ...pender({
      type: LISTALL_TEAM,
      onSuccess: (state, action) => {
        return state.set("teamList", fromJS(action.payload.data));
      },
    }),
    ...pender({
      type: LISTALL_ASSIGN,
      onSuccess: (state, action) => {
        return state.set("list", fromJS(action.payload.data));
      },
    }),
  },
  initialState
);
