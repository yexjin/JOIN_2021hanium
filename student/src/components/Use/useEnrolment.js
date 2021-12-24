import * as reducer from "../../store/reducer/enrolment";
import {
  useActions,
  useShallowEqualSelectorToJS,
  useShallowEqualSelector,
} from "./components";

const useEnrolment = () => {
  return {
    createEnrolApi: reducer.createEnrolApi,
  };
};

export default useEnrolment;
