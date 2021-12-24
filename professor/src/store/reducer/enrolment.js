import { createAction, handleActions } from "redux-actions";
import { pender } from "redux-pender";
import { Map, List, fromJS } from "immutable";
import { EnrolmentApi } from "../../remote";

export const LISTALL_ENROL = "enrolment/ENROLLIST";
export const LISTALL_STUDENTS = "enrolment/STUDENTLIST";

export const enrolListAll = createAction(
  LISTALL_ENROL, 
  EnrolmentApi.enrolList);

export const studentListAll = createAction(
  LISTALL_STUDENTS,
  EnrolmentApi.studentList
);


export const updateEnrolApi = EnrolmentApi.put;
export const removeEnrolApi = EnrolmentApi.removeEnrol;
export const removeStudentApi = EnrolmentApi.removeStudent;

const initialState = Map({
  enrols: Map({
    count: 0,
    results: List([]),
  }),
  students: Map({
    count: 0,
    results: List([]),
  }),
  student: Map({
    id: "",
    name: "",

  })
});

export default handleActions(
  {
    ...pender({
      type: LISTALL_ENROL,
      onSuccess: (state, action) => {
        const data = action.payload.data;

        return state.set("enrols", fromJS(data));
      },
    }),
    ...pender({
      type: LISTALL_STUDENTS,
      onSuccess: (state, action) => {
        const data = action.payload.data;

        return state.set("students", fromJS(data));
      },
    }),
  },
  initialState
);
