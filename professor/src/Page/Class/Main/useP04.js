import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useClasses } from "../../../components/Use";
import { getDataFromStorage } from "../../../utils/storage";

const useP04 = () => {
  const [Modal, setModalOpen] = useState(false);
  const [name, setName] = useState("");

  const history = useHistory();
  const professorInfo = getDataFromStorage();
  const { classesList, listAllClasses, createClassesApi } = useClasses();

  const ModalOpen = () => {
    setModalOpen(true);
  };

  const ModalClose = () => {
    setModalOpen(false);
  };

  const ClickHandler = async (code) => {
    history.push(`/professor/class/${code}/enrol`);
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        await listAllClasses(professorInfo.id);
      } catch (e) {
        alert(e);
      }
    };

    fetch();
  }, []);

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const createClass = async (e) => {
    const body = {
      name: name,
      memberId: professorInfo.id,
    };

    try {
      ModalClose();
      await createClassesApi(body);
      await listAllClasses(professorInfo.id);
    } catch (e) {
      alert(e);
    }
  };

  return {
    Modal,
    name,
    ModalOpen,
    ModalClose,
    classesList,
    ClickHandler,
    handleChange,
    createClass,
    professorInfo,
  };
};

export default useP04;
