import React, { useState, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { Button, Form, FormGroup, Label, Input, Col } from "reactstrap";
import { useHistory, useParams } from "react-router-dom";
import { useAssignments, useTeams } from "../../../components/Use";
import { DateChange3 } from "../../../utils/dateChange";
import styled from "styled-components";
import InputWithLabel from "./InputWithLabel";
import FileInputWithLabel from "./FileInputWithLabel";

const ListText = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 23px;

  color: #3d3d3d;
  margin-top: 30px;
`;
const SubmitButton = styled.button`
  background: #ffffff;
  border: 2px solid #426589;
  box-sizing: border-box;

  margin-bottom: 30px;
  margin-top: -20px;
  float: right;

  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  line-height: 23px;
  text-align: center;

  color: #426589;

  width: 80px;
  height: 35px;
  :hover {
    background-color: #426589;
    color: white;
  }
`;
const Hr = styled.hr`
  border: 1px solid #c4c4c4;
  transform: rotate(-0.16deg);
  width: 95%;
`;
const HeadLabel = styled.div`
  display: inline-block;
  margin-left: -12px;
  margin-right: 59px;
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 15px;
  width: 56px;

  color: #3d3d3d;
  margin-bottom: 15px;
  text-align: center;
`;
const Box = styled.div`
  width: 1032px;

  button {
    font-family: Roboto;
    font-style: normal;
    font-weight: 400;
    font-size: 17px;
    text-align: center;
    background-color: #ffffff;
    border-color: #426589;
    color: #426589;
    width: 60px;
    height: 30px;
  }
`;
const CheckText = styled.span`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 21px;

  color: #000000;
  margin-left: 10px;
  padding-top: -40px;
`;

const TextArea = styled.input`
  width: 920px;
  height: 367px;
  margin-left: 10px;
  background: #ffffff;
  border: 1px solid #000000;
  box-sizing: border-box;
  margin-bottom: 20px;
`;
const Text = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: 400;
  color: #ef8f88;
  margin-top: 10px;
  margin-left: 120px;
`;

const InputDiv = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
  margin-left: 10px;
  height: 680px;
`;

const AssignmentModify = () => {
  const { code, id } = useParams();

  const { assignmentOne, getAssignment, updateAssignmentsApi } =
    useAssignments();
  const { teamList, listAllTeams } = useTeams();

  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);
  const [teams, setTeams] = useState(
    assignmentOne.team ? assignmentOne.team : []
  );

  const imageChange = (e) => {
    setImage(e.target.files[0]);
  };
  const fileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const checkboxChange = (e) => {
    const { name, checked } = e.target;

    if (checked) {
      setTeams([
        ...teams,
        {
          team_id: name,
        },
      ]);
    } else {
      const newTeams = teams.filter((data) => data.team_id !== name);
      setTeams(newTeams);
    }
  };

  const teamCheck = (id) => {
    let checked = [];
    checked = teams.filter((data) => data.team_id === id);

    return checked.length === 1;
  };

  const [data, setData] = useState();

  const history = useHistory();

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (assignmentOne.team) {
      assignmentOne.team.map((item) => {
        setTeams({
          [item.team_id]: true,
        });
      });
    }
  }, [assignmentOne]);

  useEffect(() => {
    const fetch = async () => {
      try {
        await getAssignment(id);
        await listAllTeams(code);
      } catch (e) {
        alert(e);
      }
    };
    fetch();
  }, []);

  useEffect(() => {
    setData({
      ...assignmentOne,
      startDate: DateChange3(assignmentOne.startDate),
      endDate: DateChange3(assignmentOne.endDate),
    });
    setTeams(assignmentOne.team);
  }, [assignmentOne]);

  console.log(teams);

  const modifyHandler = async () => {
    let team = [];
    for (let i = 0; i < teams.length; i++) {
      let temp = team.concat(teams[i].team_id);
      team = temp;
    }
    console.log(team);
    try {
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

      updateAssignmentsApi(id, formData);
    } catch (e) {
      alert(e);
    } finally {
      history.push(`/professor/class/${code}/assignment/${id}`);
    }
  };

  console.log(file);
  console.log(image);

  if (!data) {
    return "로딩중";
  }

  return (
    <Box>
      <ListText>과제 수정</ListText>
      <Form>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <SubmitButton size="sm" onClick={modifyHandler}>
            완료
          </SubmitButton>
        </div>
        <InputDiv>
          <InputWithLabel
            label="과제명"
            type="name"
            name="name"
            id="assignmentName"
            value={data.name}
            onChange={handleChange}
          />
          <InputWithLabel
            label="배점"
            type="point"
            name="point"
            id="point"
            value={data.point}
            onChange={handleChange}
          />

          <InputWithLabel
            label="공개일"
            type="datetime-local"
            name="startDate"
            id="startDate"
            value={DateChange3(data.startDate)}
            onChange={handleChange}
          />
          <InputWithLabel
            label="마감일"
            type="datetime-local"
            name="endDate"
            id="endDate"
            value={DateChange3(data.endDate)}
            onChange={handleChange}
          />
          <FormGroup
            row
            style={{
              marginLeft: 3,
              padding: "8px 0px",
              alignItems: "center",
            }}
          >
            <Label for="point" sm={1} style={{ marginRight: "25px" }}>
              <HeadLabel>팀지정</HeadLabel>
            </Label>
            {teamList.results.map((team) => (
              <Col sm={1} style={{ marginTop: -16 }}>
                <>
                  <Input
                    type="checkbox"
                    checked={teamCheck(team.id)}
                    name={team.id}
                    onChange={checkboxChange}
                    style={{ marginRight: "5px" }}
                  />
                  <CheckText>{team.name}팀</CheckText>
                </>
              </Col>
            ))}
          </FormGroup>

          <TextArea
            type="textarea"
            name="content"
            id="assignmentText"
            value={data.content}
            onChange={handleChange}
            placeholder="과제에 대한 세부내용을 입력하세요."
          />

          <FileInputWithLabel
            label="첨부 파일"
            type="file"
            name="imagefile"
            id="imageFile"
            onChange={imageChange}
          />
          <Hr />
          <FileInputWithLabel
            label="해답 파일"
            type="file"
            name="solutionFile"
            id="solutionFile"
            onChange={fileChange}
          />

          <Text>
            * 해답 파일은 학생들에게 공개되지 않으며 자동 채점을 위한 비교
            파일입니다.
          </Text>
          <Hr />
        </InputDiv>
      </Form>
    </Box>
  );
};

export default AssignmentModify;
