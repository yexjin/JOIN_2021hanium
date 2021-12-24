import React, { useEffect, useState } from "react";
import styled from "styled-components";

import StudentBox from "./P06_Student";
import Assign from "./P07_Assign";
import { useHistory, Link, useParams } from "react-router-dom";

import { CTLoading, useLoading } from "../../../components";
import { useEnrolment, useTeams } from "../../../components/Use";

const WrapBox = styled.div`
  height: 785px;
  width: 1032px;
`;

const Box = styled.div`
  border: 1px solid #000000;
  width: 991px;
  height: 250px;
  overflow-y: auto;
  margin-top: 5px;
  margin-bottom: 30px;
  padding: 30px 30px 30px 30px;
  display: flex;
  flex-wrap: wrap;
  justify-content: left;
`;

const DeleteButton = styled.span`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 19px;
  float: right;
  margin-right: 32px;
  color: #7c7979;
`;

const ModifyButton = styled.span`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 19px;
  margin-left: 900px;
  color: #7c7979;
`;

const Buttons = styled.span``;

const CreateBox = styled.div`
  background: #ffffff;
  border: 1px dashed #000000;
  box-sizing: border-box;
  width: 991px;
  height: 250px;
  margin-top: 92px;
  text-align: center;
  img {
    margin-top: 85px;
    width: 70px;
    height: 70px;
  }
`;

const Text = styled.div`
  font-family: "Nanum Gothic", sans-serif;
  font-size: 20px;
  font-weight: 900;
  width: 120px;
  padding-top: 40px;
  margin-bottom: -20px;
`;

const TitleBox = styled.div`
  display: flex;
  justify-content: space-between;
`;

const LinkButton = styled.div`
  margin-top: 15px;
  float: right;
  width: 100px;
  height: 38px;
  border: 2px solid #426589;
  box-sizing: border-box;
  border-radius: 50px;
  color: #426589;
  font-size: 18px;
  text-align: center;
  cursor: pointer;
  margin-right: 39px;
  :hover {
    background-color: #426589;
    color: white;
  }
`;

const NoBox = styled.div`
  margin-top: 250px;
  width: 100%;
  height: 100%;
`;

const NoImg = styled.div`
  text-align: center;
  img {
    float: middle;
    width: 250px;
    height: 250px;
  }
`;

const TeamsBox = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
  height: 730px;
`;
const NoText = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 21px;
  text-align: center;

  color: #000000;
`;

const ListText = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;

  color: #3d3d3d;
  padding: 20px 0px 0px 0px;
`;

const P05_04 = () => {
  const { code } = useParams();

  const { loading, setLoading } = useLoading(true);

  const [Modal, setModalOpen] = useState(false);
  const ModalOpen = () => {
    setModalOpen(true);
  };
  const ModalClose = () => {
    setModalOpen(false);
  };

  const { studentList, studentListAll } = useEnrolment();
  const { teamList, listAllTeams, deleteTeamApi, createTeamApi } = useTeams();

  const deleteHandler = async (id) => {
    try {
      await deleteTeamApi(id);
      alert("삭제되었습니다.");
      <Link to={`/professor/class/${code}/enrol`}></Link>;
      await listAllTeams(code);
    } catch (e) {
      alert(e);
    }
  };

  const createHandler = async (e) => {
    try {
      await createTeamApi(code);
      <Link to={`/professor/class/${code}/enrol`}></Link>;
      await listAllTeams(code);
    } catch (e) {
      alert(e);
    }
  };

  const fetch = async () => {
    try {
      await studentListAll(code);
      await listAllTeams(code);
    } catch (e) {
      alert(e);
    } finally {
      await setLoading(false);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  return loading ? (
    <CTLoading />
  ) : (
    <>
      <WrapBox>
        {studentList.count === 0 && (
          <>
            <ListText>구성팀 확인</ListText>
            <NoBox>
              <NoImg>
                <img
                  src={require("../../../images/no_student.png").default}
                  alt="학생없음이미지"
                />
              </NoImg>
              <NoText>
                아직 수업에 학생이 없습니다. <br />
                <Link
                  to={`/professor/class/${code}/enrol`}
                  style={{ textDecoration: "none", color: "blue" }}
                >
                  수강생 관리
                </Link>{" "}
                에서 학생을 추가해보세요.
              </NoText>
            </NoBox>
          </>
        )}
        {studentList.count > 0 && (
          <>
            <TitleBox>
              <ListText>구성팀 확인</ListText>
              <LinkButton onClick={ModalOpen}>자동 편성</LinkButton>
            </TitleBox>
            <TeamsBox>
              {teamList.results.map((item) => {
                return (
                  <div>
                    <Text>Team{item.name}</Text>
                    <Buttons>
                      <Link
                        to={`/professor/class/${code}/assign`}
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        <ModifyButton>수정 | </ModifyButton>
                      </Link>
                      <DeleteButton
                        onClick={() => {
                          deleteHandler(item.id);
                        }}
                      >
                        삭제
                      </DeleteButton>
                    </Buttons>
                    <Box>
                      <StudentBox students={item.team}></StudentBox>
                    </Box>
                  </div>
                );
              })}
              <CreateBox
                onClick={() => {
                  createHandler();
                }}
              >
                <img
                  src={require("../../../images/plus_team.png").default}
                  alt="팀 추가"
                />
              </CreateBox>
              <Assign open={Modal} close={ModalClose}></Assign>
            </TeamsBox>
          </>
        )}
      </WrapBox>
    </>
  );
};

export default P05_04;
