import React from "react";
import styled from "styled-components";

const TeamBox = styled.div`
  width: 120px;
  height: 60px;
  margin-right: 50px;
  padding: 15px;
  border: 0.5px solid #d8d8d8;
  font-weight: 500;
  font-size: 13px;
`;

function P12_Team({ team }) {
  return (
    <TeamBox>
      {team.name}
      <br></br>
      {team.submit}
    </TeamBox>
  );
}

export default P12_Team;
