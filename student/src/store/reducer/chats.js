import { createAction, handleActions } from "redux-actions";
import { pender } from "redux-pender";
import { Map, List, fromJS } from "immutable";
import { ChatsApi } from "../../remote";

export const LISTALL_CHATS = "chats/LISTALL";
export const CONCAT_CHATS = "chats/CONCAT";

export const listAllChats = createAction(LISTALL_CHATS, ChatsApi.listChat);

export const concatChat = createAction(CONCAT_CHATS, (message) => message);

export const createChatApi = ChatsApi.create;

const initialState = Map({
  list: Map({
    count: 0,
    results: List([]),
  }),
});

export default handleActions(
  {
    [CONCAT_CHATS]: (state, { payload: message }) => {
      let results = state.getIn(["list", "results"]);
      let count = state.getIn(["list", "count"]);
      count += 1;
      results = [...results, message];
      return state
        .setIn(["list", "count"], count)
        .setIn(["list", "results"], fromJS(results));
    },
    ...pender({
      type: LISTALL_CHATS,
      onSuccess: (state, action) => {
        return state.set("list", fromJS(action.payload.data));
      },
    }),
  },
  initialState
);
