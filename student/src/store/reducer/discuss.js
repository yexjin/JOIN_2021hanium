import { createAction, handleActions } from "redux-actions";
import { pender } from "redux-pender";
import { Map, List, fromJS } from "immutable";
import { DiscussApi } from "../../remote";

export const LISTALL_DISCUSS = "discuss/LISTALL";
export const GET_DISCUSS = "discuss/GET";

export const listAllDiscuss = createAction(LISTALL_DISCUSS, DiscussApi.listAll);
export const getDiscuss = createAction(GET_DISCUSS, DiscussApi.get);

export const createDiscussApi = DiscussApi.create;
export const removeDiscussApi = DiscussApi.remove;

const initialState = Map({
  list: Map({
    count: 0,
    results: List([]),
  }),
});

export default handleActions(
  {
    ...pender({
      type: LISTALL_DISCUSS,
      onSuccess: (state, action) => {
        const data = action.payload.data;

        return state.set("list", fromJS(data));
      },
    }),
    ...pender({
      type: GET_DISCUSS,
      onSuccess: (state, action) => {
        const data = action.payload.data;

        return state.set("discuss", fromJS(data));
      },
    }),
  },
  initialState
);
