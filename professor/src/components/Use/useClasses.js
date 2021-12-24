import * as reducer from "../../store/reducer/classes";
import {
  useActions,
  useShallowEqualSelectorToJS,
  useShallowEqualSelector,
} from "./components";

const useClasses = () => {
  const classesList = useShallowEqualSelectorToJS((state) =>
    state.classes.get("list")
  );
  const classOne = useShallowEqualSelectorToJS((state) =>
    state.classes.get("class")
  );
  const classCode = useShallowEqualSelector((state) =>
    state.classes.getIn(["class", "code"])
  );
  const actions = useActions(reducer);

  return {
    classesList,
    classOne,
    classCode,

    listAllClasses: actions.listAllClasses,
    getClasses: actions.getClasses,

    createClassesApi: reducer.createClassesApi,
    updateClassesApi: reducer.updateClassesApi,
    removeClassesApi: reducer.removeClassesApi,
  };
};

export default useClasses;
