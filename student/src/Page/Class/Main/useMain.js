import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useEnrolment, useClasses } from "../../../components/Use";
import { getDataFromStorage } from "../../../utils/storage";

const useMain = () => {
  const [code, setCode] = useState("");
  const [Modal, setModalOpen] = useState(false);

  const history = useHistory();
  const studentInfo = getDataFromStorage();

  const { classesList, listAllClasses } = useClasses();
  const { createEnrolApi } = useEnrolment();

  const handleChange = (e) => {
    setCode(e.target.value);
  };

  const ClickHandler = async (code) => {
    history.push(`/student/class/${code}/main`);
  };

  const ModalOpen = () => {
    setModalOpen(true);
  };

  const ModalClose = () => {
    setModalOpen(false);
  };

  const createEnrol = async (e) => {
    const body = {
      classCode: code,
      memberId: studentInfo.id,
    };

    try {
      await createEnrolApi(body);
      ModalClose();
      await listAllClasses(studentInfo.id);
    } catch (e) {
      alert(e);
    }
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const studentInfo = getDataFromStorage();
        await listAllClasses(studentInfo.id);
      } catch (e) {
        alert(e);
      }
    };

    fetch();
  }, []);

  return {
    code,
    Modal,
    classesList,
    handleChange,
    ClickHandler,
    ModalOpen,
    ModalClose,
    createEnrol,
  };
};

export default useMain;
