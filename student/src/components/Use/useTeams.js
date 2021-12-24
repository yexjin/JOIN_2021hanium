import * as reducer from "../../store/reducer/teams";
import {
  useActions,
  useShallowEqualSelector,
  useShallowEqualSelectorToJS,
} from "./components";

const useTeams = () => {
  const teamList = useShallowEqualSelectorToJS((state) =>
    state.teams.get("list")
  );

  const teamOne = useShallowEqualSelectorToJS((state) =>
    state.teams.get("team")
  );

  const teamId = useShallowEqualSelector((state) =>
    state.teams.getIn(["team", "id"])
  );

  const actions = useActions(reducer);

  return {
    teamList,
    teamOne,
    teamId,

    teamMemberList: actions.teamMemberList,
  };
};

export default useTeams;
