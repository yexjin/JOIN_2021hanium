import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useAssignments, useTeams } from "../../../components/Use";
import { getDataFromStorage } from "../../../utils/storage";
import { useLoading, CTLoading } from "../../../components";
import { DateChange } from "../../../utils/dateChange";

const useClassMain = () => {
  const history = useHistory();
  const studentInfo = getDataFromStorage();

  const { code } = useParams();
  const { loading, setLoading } = useLoading(true);

  const { assignmentByTeamList, getAssignmentsByTeam } = useAssignments();
  const { teamList, teamMemberList } = useTeams();

  const [data, setData] = useState({ skip: 0, limit: 4 });

  const clickHandler = (assignmentId) => {
    history.push(`/student/class/${code}/main/assignment/${assignmentId}`);
  };

  const pageHandler = (idx) => {
    setData({
      ...data,
      skip: (idx - 1) * data.limit,
    });
  };

  const total =
    parseInt(assignmentByTeamList.total / data.limit) +
    (assignmentByTeamList.total % data.limit === 0 ? 0 : 1);

  let array = [];
  for (let i = 0; i < total; i++) {
    array.push(i + 1);
  }

  useEffect(() => {
    const fetch = async () => {
      try {
        await teamMemberList(`classCode=${code}&memberId=${studentInfo.id}`);
        await getAssignmentsByTeam(
          teamList.teamId,
          `skip=${data.skip}&limit=${data.limit}`
        );
      } catch (e) {
        alert(e);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [
    code,
    getAssignmentsByTeam,
    setLoading,
    studentInfo.id,
    teamList.teamId,
    teamMemberList,
    data,
  ]);

  return {
    assignmentByTeamList,
    loading,
    CTLoading,
    teamList,
    clickHandler,
    DateChange,
    data,
    array,
    pageHandler,
    studentInfo,
  };
};

export default useClassMain;
