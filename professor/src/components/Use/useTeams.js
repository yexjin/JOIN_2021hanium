import * as reducer from "../../store/reducer/teams";
import { useActions, useShallowEqualSelectorToJS } from "./components";

const useTeams = () => {
  const teamList = useShallowEqualSelectorToJS((state) =>
    state.teams.get("list")
  );

  const noteamList = useShallowEqualSelectorToJS((state) =>
    state.teams.get("noteam")
  );

  const actions = useActions(reducer);

  return {
    teamList,
    noteamList,

    listAllTeams: actions.listAllTeams,
    studentsNoTeam: actions.studentsNoTeam,
    insertStudentsApi: reducer.insertStudentsApi,
    deleteStudentsApi: reducer.deleteStudentsApi,
    deleteTeamApi: reducer.deleteTeamApi,
    createTeamApi: reducer.createTeamApi,
    createRandomTeamsApi: reducer.createRandomTeamsApi,
  };
};
export default useTeams;
