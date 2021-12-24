import React from "react";
import styled from "styled-components";

const Text = styled.div`
  font-family: "Nanum Gothic", sans-serif;
  font-size: 20px;
  font-weight: 900;
  width: 40px;
  padding-top: 20px;
  padding-bottom: 20px;
`;

const AssignmentBox = styled.div`
  display: flex;
  width: 1032px;
  height: 80px;
  margin-bottom: 20px;
  background: rgba(229, 229, 229, 0.6);
  padding: 25px 30px 25px 30px;
  justify-content: space-between;
  cursor: pointer;
`;

const EndAssignmentBox = styled.div`
  display: flex;
  width: 1032px;
  height: 80px;
  margin-bottom: 20px;
  background: rgba(188, 188, 188, 0.67);
  padding: 25px 30px 25px 30px;
  justify-content: space-between;
  cursor: pointer;
`;

const AssignmentName = styled.div`
font-family: Roboto;
font-style: normal;
font-weight: bold;
font-size: 18px;
`

const EndAssignmentName = styled.div`
font-family: Roboto;
font-style: normal;
font-weight: bold;
font-size: 18px;


color: rgba(0, 0, 0, 0.51);
`;

const SubmitBox = styled.div`
  display: flex;
  width: 300px;
  justify-content: space-between;

  font-family: Roboto;
font-style: normal;
font-weight: bold;
font-size: 18px;
/* identical to box height */

color: #6F91B5;
`;

const EndSubmitBox = styled.div`
  display: flex;
  width: 300px;
  justify-content: space-between;

  font-family: Roboto;
font-style: normal;
font-weight: bold;
font-size: 18px;
/* identical to box height */

color: rgba(111, 145, 181, 0.48);

`;

const UnSubmitBox = styled.div`
  display: flex;
  width: 300px;
  justify-content: space-between;

  font-family: Roboto;
font-style: normal;
font-weight: bold;
font-size: 18px;
/* identical to box height */

color: #EF8F88;
`;

const EndUnSubmitBox = styled.div`
  display: flex;
  width: 300px;
  justify-content: space-between;

  font-family: Roboto;
font-style: normal;
font-weight: bold;
font-size: 18px;
/* identical to box height */

color: rgba(239, 143, 136, 0.56);
`;

const Page = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
`;
const Button = styled.button`
  background-color: transparent;
  border-color: transparent;
`;

const NoAssign = styled.div`
  text-align: center;
  margin-top: 70px;
  div{
    margin-top: 30px;
    font-family: Roboto;
font-style: normal;
font-weight: bold;
font-size: 18px;
line-height: 18px;
  }
`

const Cover = styled.div`
  display: flex;
  width: 1032px;
  height: 80px;
  margin-bottom: 20px;
  background: rgba(150, 150, 150, 0.67);
  justify-content: space-between;
  z-index: 100;
  `

const AssignmentDetail = ({ assignment, clickHandler, DateChange }) => {

  const now = new Date();

  return(
    <>
  {new Date(assignment.endDate) > now ? (
    <AssignmentBox
      onClick={() => {clickHandler(assignment.id);}}>
      <AssignmentName>{assignment.name}</AssignmentName>
      {assignment.isCheck === 1 ? (
        <SubmitBox>
        <div>{DateChange(assignment.endDate)}</div>
        <div>제출</div>
      </SubmitBox>
      ) : (
      <UnSubmitBox>
        <div>{DateChange(assignment.endDate)}</div>
        <div>미제출</div>
      </UnSubmitBox>
      )}    
    </AssignmentBox>
  ) : (
    <EndAssignmentBox
      onClick={() => {clickHandler(assignment.id);}}>
      <EndAssignmentName>{assignment.name}</EndAssignmentName>
      {assignment.isCheck === 1 ? (
        <EndSubmitBox>
        <div>{DateChange(assignment.endDate)}</div>
        <div>제출</div>
      </EndSubmitBox>
      ) : (
      <EndUnSubmitBox>
        <div>{DateChange(assignment.endDate)}</div>
        <div>미제출</div>
      </EndUnSubmitBox>
      )}
    </EndAssignmentBox>
  )}
  </>
  )
  
};

const S05_Assignment = ({ List, DateChange, clickHandler, setData, array }) => {
  return (
    <div>
      <Text>과제</Text>
      {List.count === 0 ? (<>
      <NoAssign>
        <img src={require("../../../images/no_assignments.png").default} alt="과제없음 이미지" />
        <div>
          아직 과제가 없어요!
        </div>
        </NoAssign>
      </>) : (
        <>
        {List.results.map((item) => (
          <AssignmentDetail
            key={item.id}
            assignment={item}
            DateChange={DateChange}
            clickHandler={clickHandler}
          />
        ))}
        <Page>
          {array.map((idx) => {
            return (
              <Button
                onClick={() => {
                  setData(idx);
                }}
              >
                {idx}
              </Button>
            );
          })}
        </Page>
        </>
      )}
      
    </div>
  );
};

export default S05_Assignment;
