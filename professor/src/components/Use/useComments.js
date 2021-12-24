import * as reducer from "../../store/reducer/comments";
import { useActions, useShallowEqualSelectorToJS } from "./components";

const useComments = () => {
  const commentList = useShallowEqualSelectorToJS((state) =>
    state.comments.get("list")
  );
  const actions = useActions(reducer);

  return {
    commentList,

    listAllComments: actions.listAllComments,

    createCommentApi: reducer.createCommentApi,
    deleteCommentApi: reducer.deleteCommentApi,
  };
};

export default useComments;
