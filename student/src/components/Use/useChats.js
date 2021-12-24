import * as reducer from "../../store/reducer/chats";
import { useActions, useShallowEqualSelectorToJS } from "./components";

const useChats = () => {
  const chatList = useShallowEqualSelectorToJS((state) =>
    state.chats.get("list")
  );

  const actions = useActions(reducer);

  return {
    chatList,

    listAllChats: actions.listAllChats,
    concatChat: actions.concatChat,
    
    createChatApi: reducer.createChatApi,
  };
};

export default useChats;
