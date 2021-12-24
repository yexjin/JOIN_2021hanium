import { createAction, handleActions } from "redux-actions";
import { pender } from "redux-pender";
import { Map, List, fromJS } from "immutable";
import { AssignmentsApi } from "../../remote";

export const LISTALL_ASSIGNMENTS = "assignments/LISTALL";
export const GET_ASSIGNMENTS = "assignments/GET";
export const LISTTOTAL_ASSIGNMENTS = "assignments/LISTALLASSIGNMENTS";

export const listAllByClassCode = createAction(
  LISTALL_ASSIGNMENTS,
  AssignmentsApi.listAll
);

export const getAssignment = createAction(
  GET_ASSIGNMENTS,
  AssignmentsApi.assignmentById
);

export const ListTotalAssignments = createAction(
  LISTTOTAL_ASSIGNMENTS,
  AssignmentsApi.listAllAssignments
);


export const updateAssignmentsApi = AssignmentsApi.put;
export const deleteAssignmentsApi = AssignmentsApi.remove;
export const createAssignmentsApi = AssignmentsApi.create;

const initialState = Map({
  list: Map({
    count: 0,
    results: List([]),
  }),
  assignment: Map({
    id: "",
    name: "",
    progress: "",
    point: 0,
    endDate: "",
    content: "",
    startDate: "",
  }),
  my_assignments: Map({
    count: 0,
    results: List([]),
    })
});

export default handleActions(
  {
    ...pender({
      type: LISTALL_ASSIGNMENTS,
      onSuccess: (state, action) => {
        return state.set("list", fromJS(action.payload.data));
      },
    }),
    ...pender({
      type: GET_ASSIGNMENTS,
      onSuccess: (state, action) => {
        return state.set("assignment", fromJS(action.payload.data));
      },
    }),
    ...pender({
      type: LISTTOTAL_ASSIGNMENTS,
      onSuccess: (state, action) => {
        return state.set("my_assignments", fromJS(action.payload.data));
      }
    })
  },
  initialState
);