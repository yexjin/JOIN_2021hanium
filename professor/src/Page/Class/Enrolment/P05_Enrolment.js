import React from "react";
import styled from "styled-components";

import check from "../../../images/check.png";
import refuse from "../../../images/x.png";

const StudentBox = styled.div`
  border: 2px solid #c4c4c4;
  padding: 15px;
  width: 250px;
  height: 90px;
  justify-content: space-between;
  background-color: white;
  margin-bottom: 20px;
  margin-left: 30px;
  display: flex;
`;

const ButtonBox = styled.div`
  width: 30px;
  height: 100%;
`;

const Name = styled.div`
  font-family: Roboto;
  font-size: 16px;
  margin-bottom: 11px;
`;

const Delete = styled.img`
  width: 25px;
  height: 25px;
  cursor: pointer;
  margin-bottom: 10px;
`;

const Text = styled.span`
  width: 150px;

  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;

  color: #3d3d3d;
  padding: 20px 0px 20px 0px;
`;

const Box2 = styled.div`
  width: 1032px;
  height: 300px;
  overflow-y: auto;
  display: flex;
  flex-wrap: wrap;
  padding: 30px 70px 30px;
  border: 2px solid ${(props) => props.color};
  margin-bottom: 20px;
`;

const Box = styled.div`
  width: 1032px;
  height: 300px;
  display: flex;
  flex-wrap: wrap;
  border: 2px solid ${(props) => props.color};
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

const Header = styled.div`
  display: flex;
  width: 1032px;
  justify-content: space-between;
  align-items: baseline;
`;

const EnrolmentDetail = ({ student, AcceptHandler, RefuseHandler }) => {
  return (
    <StudentBox>
      <div>
        <Name>{student.name}</Name>
        <div>
          ({student.studentID}/{student.grade}학년)
        </div>
      </div>
      <ButtonBox>
        <Delete onClick={() => AcceptHandler(student)} src={check} />
        <Delete onClick={RefuseHandler} src={refuse} />
      </ButtonBox>
    </StudentBox>
  );
};

const P05_Enrolment = ({ enrolList, AcceptHandler, RefuseHandler }) => {
  return (
    <>
      <Header>
        <Text>수강신청 목록</Text>
        <div>총 신청 : {enrolList.count}건</div>
      </Header>
      {enrolList.count === 0 && (
        <Box color="#EF8F88">
          <p>새로운 수강 신청이 없습니다.</p>
        </Box>
      )}
      {enrolList.count > 0 && (
        <Box2 color="#EF8F88">
          {enrolList.results.map((item) => {
            return (
              <EnrolmentDetail
                student={item}
                AcceptHandler={AcceptHandler}
                RefuseHandler={RefuseHandler}
              ></EnrolmentDetail>
            );
          })}
        </Box2>
      )}
    </>
  );
};

export default P05_Enrolment;
