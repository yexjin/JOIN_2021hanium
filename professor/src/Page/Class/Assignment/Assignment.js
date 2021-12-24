import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input, Col } from "reactstrap";
import { useAssignments, useComments, useTeams } from "../../../components/Use";
import { DateChange, DateChange2 } from "../../../utils/dateChange";
import { getDataFromStorage } from "../../../utils/storage";
import styled from "styled-components";
import { CTLoading, useLoading } from "../../../components";
import oc from "open-color";
import { DownloadsApi } from "../../../remote";

const FormDiv = styled.div`
  overflow-y: scroll;
  overflow-x: hidden;
  height: 680px;
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;

const ListText = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  // line-height: 23px;
  padding: 20px 0px 20px 0px;
  color: #3d3d3d;
  // margin-top: 42px;
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
const Myimg = styled.div`
  img {
    width: 180px;
    height: 180px;
  }
`;
const Details = styled.div`
  display: inline-block;
  margin-right: 59px;
  font-family: Roboto;
  font-style: normal;
  font-size: 18px;
  line-height: 23px;
  width: 100px;

  color: #ffffff;
  margin-top: 10px;
  margin-bottom: 15px;
  text-align: center;
`;

const ModifyButton = styled.button`
  background: #ffffff;
  border: 2px solid #426589;
  box-sizing: border-box;

  margin-bottom: 30px;
  margin-top: 20px;
  float: right;
  margin-right: 60px;

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

const LabelText = styled.div`
  display: inline-block;
  margin-right: 59px;
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 23px;
  width: 100px;

  color: #3d3d3d;
  margin-top: 5px;
  margin-bottom: 8px;
  text-align: center;
`;

const CommentText = styled.div`
  display: inline-block;
  margin-right: 59px;
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 15px;
  line-height: 23px;
  width: fit-content;

  color: #3d3d3d;
  margin-top: 5px;
  margin-bottom: 10px;
  text-align: center;
`;

const CommentContentText = styled.div`
  display: flex;
  margin-right: 59px;
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 15px;
  line-height: 23px;
  width: 600px;

  color: #3d3d3d;
  margin-top: 5px;
  margin-bottom: 10px;
`;

const EnterButton = styled.button`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  line-height: 23px;
  text-align: center;
  margin-top: 3px;
  margin-left: 25px;
  color: #426589;
  background: #ffffff;
  border: 2px solid #426589;
  box-sizing: border-box;
  padding-top: 2px;
  :hover {
    background-color: #426589;
    color: white;
  }
`;

const DeleteButton = styled.button`
  background: #ffffff;
  border: 2px solid #426589;
  box-sizing: border-box;

  margin-bottom: 30px;
  margin-top: 20px;
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

const assignment = ({ match }) => {
  const history = useHistory();
  const { code } = useParams();
  const assignmentId = match.params.id;
  const professorInfo = getDataFromStorage();

  const { loading, setLoading } = useLoading(true);
  const getFile = DownloadsApi.get;

  console.log(loading);

  const [data, setData] = useState({
    contents: "",
  });

  const { assignmentOne, getAssignment, deleteAssignmentsApi } =
    useAssignments();
  const { commentList, listAllComments, createCommentApi, deleteCommentApi } =
    useComments();
  const { teamList, listAllTeams } = useTeams();

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };
  const fetch = async () => {
    try {
      await getAssignment(assignmentId);
      await listAllTeams(code);
      await listAllComments(assignmentId);
    } catch (e) {
      alert(e);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetch();
  }, []);

  const modifyHandler = () => {
    history.push(`/professor/class/${code}/assignment/${assignmentId}/modify`);
  };

  const deleteHandler = async () => {
    try {
      history.push(`/professor/class/${code}/assignmentList`);
      await deleteAssignmentsApi(assignmentId);
    } catch (e) {
      alert(e);
    }
  };

  const teamCheck = (id) => {
    let valid = false;
    if (!assignmentOne.team) return valid;
    assignmentOne.team.map((item) => {
      if (item.team_id === id) {
        valid = true;
      }
    });
    return valid;
  };

  const submitCommentHandler = async () => {
    try {
      const request = {
        memberId: professorInfo.id,
        assignmentId: assignmentId,
        contents: data.contents,
      };
      await createCommentApi(request);
      await listAllComments(assignmentId);
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
      await listAllComments(assignmentId);
      setData({
        ...data,
        contents: "",
      });
    } catch (e) {
      alert(e);
    }
  };

  return loading ? (
    <CTLoading />
  ) : (
    <Box>
      <Top>
        <ListText>과제</ListText>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <ModifyButton
            onClick={modifyHandler}
            size="sm"
            style={{ marginRight: "20px" }}
          >
            수정
          </ModifyButton>
          <DeleteButton onClick={deleteHandler} size="sm">
            삭제
          </DeleteButton>
        </div>
      </Top>
      <FormDiv>
        <Form>
          <FormGroup
            row
            style={{
              marginLeft: 3,
              padding: "8px 0px",
              width: "960px",
              borderBottom: "1px solid #C4C4C4",
              alignItems: "center",
            }}
          >
            <LabelText sm={1} style={{ fontWeight: "bold", paddingLeft: 0 }}>
              과제명
            </LabelText>
            <Col sm={10}>{assignmentOne.name}</Col>
          </FormGroup>
          <FormGroup
            row
            style={{
              marginLeft: 3,
              padding: "8px 0px",
              width: "960px",
              borderBottom: "1px solid #C4C4C4",
              alignItems: "center",
            }}
          >
            <LabelText
              for="point"
              htmlFor="point"
              sm={1}
              style={{ fontWeight: "bold", paddingLeft: 0 }}
            >
              배점
            </LabelText>
            <Col sm={4}>{assignmentOne.point}</Col>
          </FormGroup>
          <FormGroup
            row
            style={{
              marginLeft: 3,
              padding: "8px 0px",
              width: "960px",
              borderBottom: "1px solid #C4C4C4",
              alignItems: "center",
            }}
          >
            <LabelText
              for="point"
              htmlFor="point"
              sm={1}
              style={{ fontWeight: "bold", paddingLeft: 0 }}
            >
              공개일
            </LabelText>
            <Col sm={5}>{DateChange(assignmentOne.startDate)}</Col>
          </FormGroup>
          <FormGroup
            row
            style={{
              marginLeft: 3,
              padding: "8px 0px",
              width: "960px",
              borderBottom: "1px solid #C4C4C4",
              alignItems: "center",
            }}
          >
            <LabelText
              for="point"
              htmlFor="point"
              sm={1}
              style={{ fontWeight: "bold", paddingLeft: 0 }}
            >
              마감일
            </LabelText>
            <Col sm={5}>{DateChange(assignmentOne.endDate)}</Col>
          </FormGroup>
          <FormGroup
            row
            style={{
              marginLeft: 3,
              padding: "8px 0px",
              width: "960px",
              borderBottom: "1px solid #C4C4C4",
              alignItems: "center",
            }}
          >
            <LabelText
              for="team"
              htmlFor="team"
              sm={1}
              style={{ fontWeight: "bold", paddingLeft: 0 }}
            >
              팀지정
            </LabelText>
            {teamList.results.map((team) => (
              <Col sm={1}>
                <Input
                  type="checkbox"
                  checked={teamCheck(team.id)}
                  disabled={true}
                  style={{ marginRight: "5px" }}
                />
                {team.name}팀
              </Col>
            ))}
          </FormGroup>
          <FormGroup
            style={{
              marginLeft: 3,
              padding: "15px 0px 150px 0px",
              width: "960px",
              borderBottom: "1px solid #C4C4C4",
              alignItems: "center",
            }}
          >
            <Myimg>
              {assignmentOne.image !== null && (
                <img src={`/${assignmentOne.image}`} alt="이미지" />
              )}
            </Myimg>
            <p
              style={{
                marginLeft: 20,
              }}
            >
              {assignmentOne.content}
            </p>
          </FormGroup>
          <FormGroup
            style={{
              marginLeft: 3,
              padding: "15px 0px",
              width: "960px",
              borderBottom: "1px solid #C4C4C4",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex" }}>
              <div
                style={{
                  fontWeight: "bold",
                  paddingLeft: "15px",
                  marginRight: "85px",
                }}
              >
                첨부 파일
              </div>
              <a
                href={`http://localhost:3000/api/v1/downloads/${assignmentOne.image}`}
                download
                style={{ color: "black", textDecoration: "none" }}
              >
                {assignmentOne.image}
              </a>
            </div>
          </FormGroup>
          <FormGroup
            style={{
              marginLeft: 3,
              padding: "15px 0px",
              width: "960px",
              borderBottom: "1px solid #C4C4C4",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex" }}>
              <div
                style={{
                  fontWeight: "bold",
                  paddingLeft: "15px",
                  marginRight: "85px",
                }}
              >
                해답 파일
              </div>
              <a
                href={`http://localhost:3000/api/v1/downloads/${assignmentOne.answerFile}`}
                download
                style={{ color: "black", textDecoration: "none" }}
              >
                {assignmentOne.answerFile}
              </a>
            </div>
          </FormGroup>
          <div
            style={{ fontSize: "14px", paddingLeft: "15px" }}
            class="mt-3 mb-3"
          >
            댓글 {commentList.total}개
          </div>
          {commentList.results.map((comment) => {
            return (
              <FormGroup
                row
                style={{
                  marginLeft: 3,
                  width: "960px",
                  borderBottom: "1px solid #C4C4C4",
                }}
              >
                <Label
                  for="name"
                  sm={2}
                  style={{
                    fontWeight: "bold",
                    paddingLeft: "15px",
                    fontSize: "15px",
                  }}
                >
                  {comment.name}
                </Label>
                <Label
                  for="contents"
                  sm={6}
                  style={{ paddingLeft: "10px", fontSize: "15px" }}
                >
                  {comment.contents}
                </Label>
                <CommentText for="date" sm={2} style={{ paddingLeft: "5px" }}>
                  ({DateChange2(comment.createdAt)})
                </CommentText>
                <Button
                  close
                  style={{ background: "none", border: 0, color: "red" }}
                  onClick={() => {
                    deleteCommentHandler(comment.id);
                  }}
                />
              </FormGroup>
            );
          })}
          <FormGroup
            row
            style={{
              padding: "7px 15px",
            }}
          >
            <Col sm={10}>
              <Input
                type="conmment"
                name="contents"
                id="contents"
                value={data.contents}
                onChange={handleChange}
              />
            </Col>
            <Col>
              <EnterButton size="sm" onClick={submitCommentHandler}>
                확인
              </EnterButton>
            </Col>
          </FormGroup>
        </Form>
      </FormDiv>
    </Box>
  );
};

export default assignment;
