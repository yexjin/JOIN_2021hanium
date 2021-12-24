import * as reducer from "../../store/reducer/enrolment";
import {
  useActions,
  useShallowEqualSelectorToJS,
  useShallowEqualSelector,
} from "./components";

const useEnrolment = () => {
  const enrolList = useShallowEqualSelectorToJS((state) =>
    state.enrol.get("enrols")
  );
  const studentList = useShallowEqualSelectorToJS((state) =>
    state.enrol.get("students")
  );
  const actions = useActions(reducer);

  return {
    enrolList,
    studentList,

    enrolListAll: actions.enrolListAll,
    studentListAll: actions.studentListAll,

    updateEnrolApi: reducer.updateEnrolApi,
    removeEnrolApi: reducer.removeEnrolApi,
    removeStudentApi: reducer.removeStudentApi,
  };
};

export default useEnrolment;
