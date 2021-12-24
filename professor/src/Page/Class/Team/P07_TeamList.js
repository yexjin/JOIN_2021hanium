import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Form, FormGroup, Label, Input } from "reactstrap";
import { useTeams } from "../../../components/Use";
import { useParams } from "react-router-dom";

const Team = styled.div`
display: flex;
width: 561px;
margin-top: 8px;
`;

const TStudentBox = styled.div`
  width: 180px;
  font-size: 18px;
`;

const StudentHr = styled.hr`
width: 300px;
`

const DelArrow = styled.button`
  margin-top: 300px;
  margin-left: -170px;
  margin-right: 43px;
  width: 129px;
  height: 34px;
  background: #FFFFFF;
  border: 1px solid #000000;
  box-sizing: border-box;
  img{
    text-align: center;
    width: 25px;
    height: 25px;
    margin-top: 1px;
    cursor: pointer;
    padding-right: 1px;
  }
  cursor: pointer;
`

const TBox = styled.div`
  background: #FFFFFF;
  border: 2px solid #EF8F88;
  box-sizing: border-box;
  width: 400px;
  height: 658px;
  overflow: auto;
  flex-wrap: wrap;
  padding: 30px 50px 30px;
  position: relative;

`;

function P07_TeamList({ students }) {
  const { code } = useParams();

  const { teamList, listAllTeams, studentsNoTeam, deleteStudentsApi } = useTeams();

  const [studentIn, setStudentIn] = useState(teamList.results[0]);
  const [currentTeam, setcurrentTeams] = useState(0);
  const [stud, setStud] = useState([]);

  useEffect(() => {
    setStudentIn(teamList.results[currentTeam])
  }, [teamList.results])

  const team_studentCheck = (id) => {
    let checked = [];
    checked = stud.filter((data) => data.memberId === id);

    return checked.length === 1;
  }

  const team_checkboxChange = (e) => {
    const {name, checked} = e.target;

    if (checked) {
      setStud([
        ...stud,
        {
          teamId: students.id,
          memberId: name,
        },
      ]);
    } else {
      const newStud = stud.filter((data) => data.memberId !== name);
      setStud(newStud);
    }
  }

  const deleteHandler= async (e) => {
    let members = [];
    stud.map((data)=>{
      members.push(data.memberId); 
    })
    try {
      await deleteStudentsApi(`memberId=${members}&teamId=${students.id}`);
      await listAllTeams(code);
      await studentsNoTeam(code);
    } catch(e){
      alert(e);
    }
  }

  const fetch = async() => {
    try{
      await studentsNoTeam(code);
      await listAllTeams(code);

    } catch (e) {
      alert(e);
    } 
  }

  useEffect(()=> {
    fetch();
  },[])
  
  return (
    <Team>
      <DelArrow style={{ backgroundColor: "white" }} onClick={deleteHandler}> 
        <img
          src={require("../../../images/toLeft.png").default}
          alt="leftArrow"
        ></img>
      </DelArrow>
              <TBox>
      <Form>
      {students && students.team.map((student) => {
             return(
                <TStudentBox>   
                <FormGroup>
                  <Label check>
                  <Input
                        type="checkbox"
                        checked={team_studentCheck(student.member_id)}
                        name={student.member_id}
                        onChange={team_checkboxChange}
                      /> &nbsp;
                      {student.name}({student.grade}학년)
                      <StudentHr />
                  </Label>
                </FormGroup>
              </TStudentBox>
                   )
           })}  
                   </Form>
      </TBox>
    </Team>
  );
}

export default P07_TeamList;
