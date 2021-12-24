import * as reducer from "../../store/reducer/assignments";
import {
  useActions,
  useShallowEqualSelector,
  useShallowEqualSelectorToJS,
} from "./components";

const useAssignments = () => {
  const assignmentsList = useShallowEqualSelectorToJS((state) =>
    state.assignments.get("list")
  );

  const assignmentOne = useShallowEqualSelectorToJS((state) =>
    state.assignments.get("assignment")
  );

  const assignmentsTotal = useShallowEqualSelectorToJS((state) =>
    state.assignments.get("my_assignments")
  );

  const actions = useActions(reducer);

  return {
    assignmentsList,
    assignmentOne,
    assignmentsTotal,

    listAllByClassCode: actions.listAllByClassCode,
    getAssignment: actions.getAssignment,
    ListTotalAssignments: actions.ListTotalAssignments,

    createAssignmentsApi: reducer.createAssignmentsApi,
    updateAssignmentsApi: reducer.updateAssignmentsApi,
    deleteAssignmentsApi: reducer.deleteAssignmentsApi,
  };
};

export default useAssignments;
