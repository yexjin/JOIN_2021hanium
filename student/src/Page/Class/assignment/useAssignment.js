import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { getDataFromStorage } from "../../../utils/storage";
import { useAssignments, useComments } from "../../../components/Use";
import { CTLoading, useLoading } from "../../../components";

const useAssignment = () => {
  const history = useHistory();
  const studentInfo = getDataFromStorage();
  const { code, id } = useParams();
  const { loading, setLoading } = useLoading(true);
  const { assignmentOne, getAssignment } = useAssignments();
  const { commentList, listAllComments, createCommentApi, deleteCommentApi } =
    useComments();

  const [data, setData] = useState({
    contents: "",
  });

  useEffect(() => {
    const fetch = async () => {
      try {
        await getAssignment(id);
        await listAllComments(id);
      } catch (e) {
        alert(e);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [getAssignment, listAllComments, id, setLoading]);

  const submitCommentHandler = async () => {
    try {
      const request = {
        memberId: studentInfo.id,
        assignmentId: id,
        contents: data.contents,
      };
      await createCommentApi(request);
      await listAllComments(id);
      setData({
        ...data,
        contents: "",
      });
    } catch (e) {
      alert(e);
    }
  };

  const deleteCommentHandler = async (commentId) => {
    try {
      await deleteCommentApi(commentId);
      await listAllComments(id);
      setData({
        ...data,
        contents: "",
      });
    } catch (e) {
      alert(e);
    }
  };

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = () => {
    history.push(`/student/class/${code}/main/assignment/${id}/submit`);
  };

  const listHandler = () => {
    history.push(`/student/class/${code}/main`);
  };

  return {
    loading,
    CTLoading,
    assignmentOne,
    commentList,
    data,
    studentInfo,
    submitCommentHandler,
    deleteCommentHandler,
    handleChange,
    submitHandler,
    listHandler,
  };
};

export default useAssignment;
