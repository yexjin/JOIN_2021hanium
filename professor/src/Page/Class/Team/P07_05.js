import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import { useTeams } from "../../../components/Use";
import P07_TeamList from "./P07_TeamList";
import P07_StudentList from "./P07_StudentList";
import { useLoading, CTLoading } from "../../../components";

const Text = styled.div`
font-family: Roboto;
font-style: normal;
font-weight: bold;
font-size: 20px;
line-height: 23px;

color: #3D3D3D;
padding-top: 20px;
`;
const Select = styled.select`
  width: 100px;
  height: 30px;
  float: right;
  margin-right: 118px;
  margin-bottom: 6px;
  margin-bottom: 12px;
`;

const LinkButton = styled.div`
  margin-top: 20px;
  width: 100px;
  height: 32px;
  border: 2px solid #426589;
  box-sizing: border-box;
  border-radius: 50px;
  color: #426589;
  font-size: 18px;
  text-align: center;
  margin-left: 865px;
  cursor: pointer;
  :hover{
    background-color: #426589;
    color: white;
  }
`;
const Box = styled.div`
  justify-content: space-between;
`
const Head = styled.div`
display: flex;
margin-bottom: 30px; 
`
const Cont = styled.div`
display: flex;
`
const Student = styled.div`
width: 561px;
`
const Team = styled.div`
width: 561px;
padding-left: 42px;

`
const ListText = styled.span`
font-family: Roboto;
font-style: normal;
font-weight: bold;
font-size: 20px;
line-height: 23px;

color: #3D3D3D;
margin-top: 42px;
`


function P07_05() {
  const { loading, setLoading } = useLoading(true);
  const { code } = useParams();
  const { studentsNoTeam, teamList, listAllTeams } = useTeams();


  const fetch = async() => {
    try{
      await studentsNoTeam(code);
      await listAllTeams(code);

    } catch (e) {
      alert(e);
    } finally{
      setLoading(false);
    }
  }

  const [students, setStudents] = useState(teamList.results[0]);
  const [currentTeam, setcurrentTeams] = useState(0);

  useEffect(() => {
    setStudents(teamList.results[currentTeam])
  }, [teamList.results])


  const teamClick = (e) => {
    const target = e.target.value;
    setStudents(teamList.results[Number(target)-1]);
    setcurrentTeams(target-1);
  }


  useEffect(()=> {
    fetch();
  },[])
  

  return loading ? (
    <CTLoading />
  ) : (
    <Box>
      <Head>
        <Text>팀편성</Text>
        <LinkButton>
        <Link
          to={`/professor/class/${code}/team`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <div>돌아가기</div>
        </Link>
        </LinkButton>
      </Head>

      <Cont>
        <Student>
          <ListText>학생목록</ListText>
          <P07_StudentList students={students}/>
        </Student>

   
        <Team>
          <div >
            <ListText>팀목록</ListText>
            <Select onChange={teamClick}  name="team" id="team" >
              {teamList.results.map((data) => {
                return ( 
                <option 
                value={data.name}
                >
                  TEAM {data.name}
                  </option>  
                )})}
            </Select> 
          </div>
               <P07_TeamList students={students}/>

        </Team>
      </Cont>
    </Box>
  );
}

export default P07_05;
