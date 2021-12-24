import * as reducer from "../../store/reducer/report";
import {
  useActions,
  useShallowEqualSelector,
  useShallowEqualSelectorToJS,
} from "./components";

const useReport = () => {
  const reportByTeam = useShallowEqualSelectorToJS((state) =>
    state.report.get("teamList")
  );

  const reportByAssign = useShallowEqualSelectorToJS((state) =>
    state.report.get("list")
  );

  const actions = useActions(reducer);

  return {
    reportByAssign,
    reportByTeam,

    listAllByTeam: actions.listAllByTeam,
    listAllByAssign: actions.listAllByAssign,
  };
};

export default useReport;
