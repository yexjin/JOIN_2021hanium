import { createAction, handleActions } from "redux-actions";
import { pender } from "redux-pender";
import { Map, List, fromJS } from "immutable";
import { CommentsApi } from "../../remote";

export const LISTALL_COMMENTS = "comments/LISTALL";

export const listAllComments = createAction(
  LISTALL_COMMENTS,
  CommentsApi.listAll
);

export const createCommentApi = CommentsApi.create;
export const deleteCommentApi = CommentsApi.remove;

const initialState = Map({
  list: Map({
    count: 0,
    results: List([]),
  }),
});

export default handleActions(
  {
    ...pender({
      type: LISTALL_COMMENTS,
      onSuccess: (state, action) => {
        return state.set("list", fromJS(action.payload.data));
      },
    }),
  },
  initialState
);
