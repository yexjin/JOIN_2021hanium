import React from "react";
import styled from "styled-components";

import noTeam from "../../../images/support.png";

const StudentBox = styled.div`
  width: 230px;
  height: 80px;
  margin-right: 50px;
  padding: 15px;
border: 3px solid #C4C4C4;
box-sizing: border-box;
  font-family: "Nanum Gothic Coding", monospace;
  font-weight: 500;
  font-size: 15px;
`;

const MeBox = styled.div`
width: 230px;
height: 80px;
margin-right: 50px;
padding: 15px;

border: 4px solid #B7E1E4;
box-sizing: border-box;
font-family: "Nanum Gothic Coding", monospace;
font-weight: 500;
font-size: 15px;
`;

const Text = styled.div`
  font-family: "Nanum Gothic", sans-serif;
  font-size: 20px;
  font-weight: 900;
  width: 40px;
  padding-top: 20px;
  padding-bottom: 20px;
`;

const TeamBox = styled.div`
  width: 1032px;
  height: 200px;
  display: flex;
  overflow-y: auto;
  border-bottom: 1px solid #c4c4c4;
`;

const NoTeamBox = styled.div`
  width: 1032px;
  padding-bottom: 60px;
  border-bottom: 1px solid #c4c4c4;
  text-align: center;
`;

const SmallBox = styled.div`
  width: 300px;
  margin: 0 auto;
  div{
    margin-top: 10px;
    font-family: Roboto;
font-style: normal;
font-weight: bold;
font-size: 18px;
line-height: 18px;
  }
`;

const Img = styled.img`
  text-align: center;
  width: 100px;
  padding-bottom: 20px;
`;


const S05_Student = ({ List, me }) => {
  console.log(me);
  return (
    <div>
      <Text>팀원</Text>
      {List.count === 0 ? (
        <NoTeamBox>
          <SmallBox>
            <Img src={noTeam} alt="noteam"></Img>
            <div>아직 팀이 맺어지지 않았어요!</div>
          </SmallBox>
        </NoTeamBox>
      ):(
      <TeamBox>
        {List.results.map((item) => {
          return(
            <>
          {item.memberId === me ?  (
            <>
          <MeBox>
            {item.name}({item.grade}학년)<br></br>
            {item.department}
          </MeBox>
            </>
          ):(
          <StudentBox>
            {item.name}({item.grade}학년)<br></br>
            {item.department}
          </StudentBox>
            )
          }</>)
        })
        }
      </TeamBox>
      )}
    </div>
  );
};

export default S05_Student;
