import { createAction, handleActions } from "redux-actions";
import { pender } from "redux-pender";
import { Map, List, fromJS } from "immutable";
import { ClassesApi } from "../../remote";

export const LISTALL_CLASSES = "classes/LISTALL";
export const GET_CLASSES = "classes/GET";

export const listAllClasses = createAction(LISTALL_CLASSES, ClassesApi.listAll);

export const getClasses = createAction(GET_CLASSES, ClassesApi.get);

export const createClassesApi = ClassesApi.create;
export const updateClassesApi = ClassesApi.put;
export const removeClassesApi = ClassesApi.remove;

const initialState = Map({
  list: Map({
    count: 0,
    results: List([]),
  }),
  class: Map({
    name: "",
    code: "",
  }),
});

export default handleActions(
  {
    ...pender({
      type: LISTALL_CLASSES,
      onSuccess: (state, action) => {
        const data = action.payload.data;

        return state.set("list", fromJS(action.payload.data));
      },
    }),
    ...pender({
      type: GET_CLASSES,
      onSuccess: (state, action) => {
        const data = action.payload.data;

        return state.set("class", fromJS(data));
      },
    }),
  },
  initialState
);
