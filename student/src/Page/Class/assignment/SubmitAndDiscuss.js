import React from "react";
import { TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";
import styled from "styled-components";

import classnames from "classnames";
import Submit from "./Submit";
import Discuss from "./Discuss";
import Modal from "./Modal";

import useSubmitAndDiscuss from "./useSubmitAndDiscuss";

const AssignmentTitle = styled.div`
  width: 152px;
  height: 23px;

  font-family: Roboto;
  font-weight: bold;
  font-size: 20px;
  // line-height: 23px;
  padding: 6px 0px 20px 0px;
  
  color: #3d3d3d;
`;

const TitleBox = styled.div`
  width: 1100px;
  display: flex;
  justify-content: space-between;
`;

const Box = styled.div`
  width: 80%;
`;

const Title = styled.div`
  width: 70px;
  text-align: center;
  font-family: Roboto;
  font-weight: bold;
  font-size: 15px;
  line-height: 23px;
  color: #3d3d3d;
`;

const SubmitAndDiscuss = () => {
  const {
    activeTab,
    loading,
    CTLoading,
    assignmentOne,
    assignmentTeamOne,
    toggle,
  } = useSubmitAndDiscuss();

  return loading ? (
    <CTLoading />
  ) : (
    <Box>
      <div className="d-flex pt-3 pb-2 mb-3">
        <TitleBox>
          <AssignmentTitle>{assignmentOne.name}</AssignmentTitle>
          <Modal assignmentTeamId={assignmentTeamOne.id}>팀 커뮤니티 창</Modal>
        </TitleBox>
      </div>
      <Nav tabs style={{ width: "1100px" }}>
        <NavItem>
          <NavLink
            style={
              activeTab
                ? { border: "none", borderBottom: "5px solid #EF8F88" }
                : { border: "none" }
            }
            className={classnames({ active: activeTab === true })}
            onClick={() => {
              toggle(true);
            }}
          >
            <Title>과제제출</Title>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            style={
              activeTab
                ? { border: "none" }
                : { border: "none", borderBottom: "5px solid #EF8F88" }
            }
            className={classnames({ active: activeTab === false })}
            onClick={() => {
              toggle(false);
            }}
          >
            <Title>토론하기</Title>
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId={true}>
          <Submit />
        </TabPane>
        <TabPane tabId={false}>
          <Discuss />
        </TabPane>
      </TabContent>
    </Box>
  );
};

export default SubmitAndDiscuss;
