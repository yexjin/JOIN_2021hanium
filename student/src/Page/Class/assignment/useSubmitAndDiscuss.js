import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getDataFromStorage } from "../../../utils/storage";
import { useAssignments, useTeams } from "../../../components/Use";
import { CTLoading, useLoading } from "../../../components";

const useSubmitAndDiscuss = () => {
  const studentInfo = getDataFromStorage();
  const { id, code } = useParams();
  const { loading, setLoading } = useLoading(true);
  const { teamList, teamMemberList } = useTeams();
  const { assignmentOne, getAssignment, assignmentTeamOne, getAssignmentTeam } =
    useAssignments();

  const [activeTab, setActiveTab] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        await teamMemberList(`classCode=${code}&memberId=${studentInfo.id}`);
        await getAssignmentTeam(id, teamList.teamId);
        await getAssignment(id);
      } catch (e) {
        alert(e);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [
    teamMemberList,
    teamList.teamId,
    code,
    getAssignment,
    getAssignmentTeam,
    id,
    setLoading,
    studentInfo.id,
  ]);

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  return {
    activeTab,
    loading,
    CTLoading,
    assignmentOne,
    assignmentTeamOne,
    toggle,
  };
};

export default useSubmitAndDiscuss;
