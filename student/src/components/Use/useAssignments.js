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
  const assignmentTeamOne = useShallowEqualSelectorToJS((state) =>
    state.assignments.get("assignmentTeam")
  );

  const assignmentByTeamList = useShallowEqualSelectorToJS((state) =>
    state.assignments.get("assignmentByTeam")
  );

  const actions = useActions(reducer);

  return {
    assignmentsList,
    assignmentOne,
    assignmentsTotal,
    assignmentTeamOne,
    assignmentByTeamList,

    ListTotalAssignments: actions.ListTotalAssignments,
    listAllByClassCode: actions.listAllByClassCode,
    getAssignment: actions.getAssignment,
    getAssignmentTeam: actions.getAssignmentTeam,
    getAssignmentsByTeam: actions.getAssignmentsByTeam,

    createAssignmentsApi: reducer.createAssignmentsApi,
    updateAssignmentsApi: reducer.updateAssignmentsApi,
    deleteAssignmentsApi: reducer.deleteAssignmentsApi,
    submitAssignmentsApi: reducer.submitAssignmentsApi,
  };
};

export default useAssignments;
