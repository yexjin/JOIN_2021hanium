import React, { useState, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useHistory, useParams } from "react-router-dom";
import { useAssignments, useTeams } from "../../../components/Use";

const P09_07 = () => {
  const history = useHistory();
  const { code } = useParams();

  const { createAssignmentsApi } = useAssignments();
  const { teamList, listAllTeams } = useTeams();

  const [data, setData] = useState({
    name: "",
    content: "",
  });

  const [teams, setTeams] = useState([]);

  const checkboxChange = (e) => {
    setTeams({
      ...teams,
      [e.target.name]: e.target.checked,
    });
  };

  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);

  const createHandler = async () => {
    const team = [];
    const keys = Object.keys(teams);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const value = teams[key];
      if (value === true) team.push(key);
    }

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("point", data.point);
    formData.append("startDate", data.startDate);
    formData.append("endDate", data.endDate);
    formData.append("content", data.content);
    formData.append("progress", 1);
    formData.append("classCode", code);
    formData.append("teams", team);
    formData.append("image", image);
    formData.append("answerFile", file);

    try {
      createAssignmentsApi(formData);
    } catch (e) {
      alert(e);
    }
    history.push(`/professor/class/${code}/assignmentList`);
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        await listAllTeams(code);
      } catch (e) {
        alert(e);
      }
    };
    fetch();
  }, []);

  const imageChange = (e) => {
    setImage(e.target.files[0]);
  };
  const answerFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  return {
    imageChange,
    handleChange,
    checkboxChange,
    answerFileChange,
    teamList,
    createHandler,
    data,
    teams,
  };
};

export default P09_07;
