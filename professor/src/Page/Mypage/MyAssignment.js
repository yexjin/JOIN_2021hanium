import React, { useEffect } from "react";
import { Table } from "reactstrap";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import { useAssignments } from "../../components";
import { getDataFromStorage } from "../../utils/storage";
import {DateChange} from "../../utils/dateChange";
import { useLoading, CTLoading } from "../../components";

const Box = styled.div`
`;

const Page = styled.div`
  color: #3d3d3d;
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  margin-top: 27px;
`;

const Hr = styled.hr`
width: 1032px;
height: 0px;
border: 4px solid #C4C4C4;
`

const IntroText = styled.div`
  padding-left: 30px;
  color: #ef8f88;

  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
`;

const Assignment = styled.div`

overflow-y: auto;
overflow-x: hidden;

  table {
    border-color: #ef8f88;
  }

  thead th {
    font-family: Roboto;
    font-style: normal;
    font-weight: bold;
    font-size: 17px;
    line-height: 20px;
    padding-bottom: 10px;
    color: #686868;
    text-align: center;
  }

  tbody th {
    font-family: Roboto;
    font-style: normal;
    font-weight: bold;
    font-size: 17px;
    line-height: 20px;
    padding-bottom: 10px;
    color: #ef8f88;
    padding-top: 11px;
    text-align: center;
  }

  td {
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 17px;
    line-height: 20px;
    padding-top: 11px;
    color: #000000;
    text-align: center;
  }
`;

const MyAssignment = () => {

  const { loading, setLoading } = useLoading(true);

  const { code } = useParams();

  const { assignmentsTotal, ListTotalAssignments } = useAssignments();

  useEffect(() => {
    const fetch = async () => {
      try {
        const professor = getDataFromStorage();
        await ListTotalAssignments(professor.id);
      } catch(err){
        console.log(err);
      }finally{
        setLoading(false);
      }
    };
    fetch();
  }, []);
  return loading ? (
    <CTLoading />
  ) : (
    <Box>
      <Page>등록한 과제</Page>
      <Hr />
      <IntroText>과제명을 클릭하면 해당페이지로 이동합니다.</IntroText> <br />
      <Assignment>
      <Table size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>과목</th>
            <th>과제명</th> 
            <th>과제 등록일</th>
            <th>과제 마감일</th>
          </tr>
        </thead>
        <tbody>
          {assignmentsTotal.count === 0 && (
            <>

            </>
          )}
          {assignmentsTotal.results.map((item,index) => {
              return (
                <tr key={index}>
                  <td>{index+1}</td>
                  <td>{item.className}</td>
                  <td>
                  <Link
                    to={`/professor/class/${item.classCode}/assignment/${item.id}`}
                    style={{ textDecoration: "inherit", color: "inherit" }}
                    >
                    {item.assignmentName}
                  </Link>
                  </td>
                  <td>{DateChange(item.startDate)}</td>
                  <td>{DateChange(item.endDate)}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Assignment>
    </Box>
  );
};

export default MyAssignment;
