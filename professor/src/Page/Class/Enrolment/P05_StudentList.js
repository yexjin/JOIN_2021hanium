import React from "react";
import styled from "styled-components";
import { CopyToClipboard } from "react-copy-to-clipboard";

import refuse from "../../../images/x.png";

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

const Text = styled.div`
  width: 150px;

  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;

  color: #3d3d3d;
  padding: 20px 0px 20px 0px;
`;

const Img = styled.img`
  width: 100px;
  height: 100px;
  margin-right: 20px;
`;

const CopyButton = styled.button`
  background: #426589;
  color: white;
  border: none;
  width: 120px;
  height: 30px;
`;

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

const Delete = styled.img`
  width: 25px;
  height: 25px;
  cursor: pointer;
  margin-bottom: 10px;
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

const Header = styled.div`
  display: flex;
  width: 1032px;
  justify-content: space-between;
  align-items: baseline;
`;

const P05_StudentDetail = ({ student, removeHandler }) => {
  return (
    <StudentBox>
      <div>
        <Name>{student.name}</Name>
        <div>
          ({student.studentID}/{student.grade}학년)
        </div>
      </div>
      <ButtonBox>
        <Delete onClick={() => removeHandler(student)} src={refuse} />
      </ButtonBox>
    </StudentBox>
  );
};

const P05_StudentList = ({ code, studentList, removeHandler }) => {
  return (
    <>
      <Header>
        <Text>수강생 목록</Text>
        <div>총 수강생 : {studentList.count}명</div>
      </Header>
      {studentList.count === 0 && (
        <Box color="#426589">
          <Img src="https://cdn-icons-png.flaticon.com/512/1387/1387940.png"></Img>
          <div>
            <p>수업에 학생들을 초대하세요.</p>
            <CopyToClipboard text={code}>
              <CopyButton>코드 복사하기</CopyButton>
            </CopyToClipboard>
          </div>
        </Box>
      )}
      {studentList.count > 0 && (
        <Box2 color="#426589">
          {studentList.results.map((item) => (
            <P05_StudentDetail
              key={item.name}
              student={item}
              removeHandler={removeHandler}
            ></P05_StudentDetail>
          ))}
        </Box2>
      )}
    </>
  );
};

export default P05_StudentList;
