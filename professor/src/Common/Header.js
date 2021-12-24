import React, { useState } from "react";
import styled from "styled-components";
import {
  Dropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
} from "reactstrap";
import Logo from "./Logo";
import { Link, useHistory } from "react-router-dom";
import { removeDataFromStorage } from "../utils/storage";

const HeaderBar = styled.div`
  width: 100%;
  height: 85px;
  padding: 20px 50px 0px 50px;
`;

const Box = styled.div`
  width: 100%;
  display: inline-flex;
  justify-content: space-between;
`;

const MyPage = styled.img`
  width: 40px;
  height: 40px;
  margin-top: 8px;
`;

function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevSate) => !prevSate);

  const history = useHistory();

  const logoutHandler = () => {
    removeDataFromStorage();
    history.push(`/login`);
  };

  return (
    <HeaderBar>
      <Box>
        <Logo />
        <Dropdown
          className="ms-auto link-light"
          isOpen={dropdownOpen}
          toggle={toggle}
        >
          <DropdownToggle caret color="white" tag="span">
            <MyPage
              src={require("../images/person_default.png").default}
              alt="mypage"
            ></MyPage>
          </DropdownToggle>
          <DropdownMenu right>
            <Link
              to="/professor/mypage/myinfo"
              style={{ textDecoration: "none", color: "black" }}
            >
              <DropdownItem>마이페이지</DropdownItem>
            </Link>
            <DropdownItem onClick={logoutHandler}>로그아웃</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </Box>
    </HeaderBar>
  );
}

export default Header;
