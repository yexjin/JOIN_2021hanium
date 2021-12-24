import { useEffect, useState } from "react";
import { getDataFromStorage } from "../../../utils/storage";
import { useParams, useHistory } from "react-router-dom";
import { useDiscuss, useAssignments, useTeams } from "../../../components/Use";

const useDiscusses = () => {
  const history = useHistory();
  const studentInfo = getDataFromStorage();
  const { id, code } = useParams();
  const { teamList, teamMemberList } = useTeams();
  const { assignmentTeamOne, getAssignmentTeam } = useAssignments();
  const { createDiscussApi, DiscussList, listAllDiscuss, removeDiscussApi } =
    useDiscuss();

  const [data, setData] = useState("");

  useEffect(() => {
    const fetch = async () => {
      try {
        await teamMemberList(`classCode=${code}&memberId=${studentInfo.id}`);
        await getAssignmentTeam(id, teamList.teamId);
        await listAllDiscuss(assignmentTeamOne.id, id);
      } catch (e) {
        alert(e);
      }
    };

    fetch();
  }, [
    assignmentTeamOne.id,
    code,
    getAssignmentTeam,
    id,
    listAllDiscuss,
    studentInfo.id,
    teamMemberList,
    teamList.teamId,
  ]);

  const submitHandler = async () => {
    try {
      const body = {
        assignmentTeamId: assignmentTeamOne.id,
        memberId: studentInfo.id,
        content: data,
      };
      await createDiscussApi(body);
      await listAllDiscuss(assignmentTeamOne.id);
    } catch (e) {
      alert(e);
    }
  };

  const DeleteHandler = async (_id) => {
    try {
      await removeDiscussApi(_id);
      await listAllDiscuss("1", id);
    } catch (e) {
      alert(e);
    }
  };

  const backHandler = async () => {
    history.push(`/student/class/${code}/main/assignment/${id}`)
  }

  return {
    data,
    id,
    setData,
    DiscussList,
    submitHandler,
    DeleteHandler,
    backHandler,
  };
};

export default useDiscusses;
