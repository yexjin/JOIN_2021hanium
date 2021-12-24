import * as reducer from "../../store/reducer/discuss";
import { useActions, useShallowEqualSelectorToJS } from "./components";

const useDiscuss = () => {
  const DiscussList = useShallowEqualSelectorToJS((state) =>
    state.discuss.get("list")
  );

  const actions = useActions(reducer);

  return {
    DiscussList,
    listAllDiscuss: actions.listAllDiscuss,
    getDiscuss: actions.getDiscuss,
    createDiscussApi: reducer.createDiscussApi,
    removeDiscussApi: reducer.removeDiscussApi,
  };
};

export default useDiscuss;
