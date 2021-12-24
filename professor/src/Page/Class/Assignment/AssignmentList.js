import React, { useEffect, useState } from "react";
import { Button, Table } from "reactstrap";
import { Link, useHistory, useParams } from "react-router-dom";
import { useAssignments } from "../../../components/Use";
import { endDateChange, DateChange } from "../../../utils/dateChange";
import styled from "styled-components";

const ListText = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  // line-height: 23px;
  padding: 20px 0px 20px 0px;

  color: #3d3d3d;
`;
const Top = styled.div`
  display: flex;
  justify-content: space-between;
  button {
    background: #ffffff;
    border: 2px solid #426589;
    box-sizing: border-box;
    justify-content: flex-end;

    float: right;
    margin-top: 20px;
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 17px;
    line-height: 23px;
    text-align: center;

    color: #426589;

    width: 60px;
    height: 30px;
    :hover {
      background-color: #426589;
      color: white;
    }
  }
`;
const Box = styled.div`
  width: 1032px;
`;

const Assignment = styled.div`
  table {
    border-color: #c4c4c4;
  }

  thead th {
    padding-top: 6px;
    background-color: #426589;
    padding-bottom: 6px;
    text-align: center;

    font-family: Roboto;
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 23px;

    color: #ffffff;
  }

  tbody th {
    cursor: pointer;
    height: 50px;
    font-family: Roboto;
    font-style: normal;
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 17px;
    line-height: 23px;

    color: #000000;
    padding-top: 13px;
    text-align: center;
  }

  td {
    cursor: pointer;
    padding-top: 10px;
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 17px;
    line-height: 20px;

    color: #000000;
  }
`;

const assignmentList = () => {
  const history = useHistory();
  const { code } = useParams();
  const { assignmentsList, listAllByClassCode } = useAssignments();

  useEffect(() => {
    const fetch = async () => {
      try {
        await listAllByClassCode(code);
      } catch (e) {
        alert(e);
      }
    };
    fetch();
  }, []);

  const handler = async (id) => {
    try {
      history.push(`/professor/class/${code}/assignment/${id}`);
    } catch (e) {
      alert(e);
    }
  };

  const addHandler = () => {
    history.push(`/professor/class/${code}/addAssignment`);
  };

  return (
    <Box>
      <Top>
        <ListText>등록된 과제 확인</ListText>
        <button size="sm" onClick={addHandler}>
          추가
        </button>
      </Top>
      <Assignment>
        <Table size="sm">
          <thead>
            <tr>
              <th>번호</th>
              <th>과제명</th>
              <th>진행</th>
              <th>배점</th>
              <th>마감일</th>
            </tr>
          </thead>
          <tbody>
            {assignmentsList.results.map((assignment, index) => {
              return (
                <tr>
                  <th>{index + 1}</th>
                  <th
                    onClick={() => {
                      handler(assignment.id);
                    }}
                  >
                    {assignment.name}
                  </th>
                  <th>
                    {new Date(assignment.endDate) > new Date(Date.now())
                      ? "진행 중"
                      : "마감"}
                  </th>
                  <th>{assignment.point}</th>
                  <th>{endDateChange(assignment.endDate)}</th>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Assignment>
    </Box>
  );
};

export default assignmentList;
