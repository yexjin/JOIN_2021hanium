import { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useEnrolment } from "../../../components/Use";
import { CTLoading, useLoading } from "../../../components";

const useP05_04 = () => {
  const { code } = useParams();
  const { loading, setLoading } = useLoading(true);
  const {
    enrolList,
    enrolListAll,
    studentList,
    studentListAll,
    updateEnrolApi,
    removeEnrolApi,
    removeStudentApi,
  } = useEnrolment();

  useEffect(() => {
    const fetch = async () => {
      try {
        await enrolListAll(code);
        await studentListAll(code);
      } catch (e) {
        alert(e);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const removeStudentHandler = async (student) => {
    try {
      const { id } = student;
      setLoading(true);
      await removeStudentApi(`memberId=${id}&classCode=${code}`);
      fetch();
    } catch (e) {
      alert(e);
    } finally {
      setLoading(false);
    }
  };

  const AcceptHandler = async (student) => {
    const body = {
      memberId: student.id,
      classCode: code,
    };
    try {
      await updateEnrolApi(body);
      await studentListAll(code);
      await enrolListAll(code);
    } catch (e) {
      alert(e);
    }
  };

  const RefuseHandler = async () => {
    try {
      await removeEnrolApi(`memberId=${student.id}&classCode=${code}`);
      await enrolListAll(code);
    } catch (e) {
      alert(e);
    }
  };

  return {
    code,
    loading,
    enrolList,
    studentList,
    removeStudentHandler,
    AcceptHandler,
    RefuseHandler,
    CTLoading,
  };
};

export default useP05_04;
