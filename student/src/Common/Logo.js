import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const LogoCircle = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 75px;
  background-color: #ef8f88;
`;

const CircleText = styled.div`
  margin: 0 auto;
  width: 16.15px;

  font-family: Monoton;
  font-size: 30px;
  line-height: 50px;

  color: #ffffff;
`;

const LogoText = styled.div`
  width: 71px;
  height: 40px;

  font-family: Roboto;
  font-weight: bold;
  font-size: 30px;
  line-height: 50px;

  padding-left: 15px;
`;

const LogoWrap = styled.div`
  display: inline-flex;
`;

const Logo = () => {
  return (
    <>
      <style>
        @import
        url('https://fonts.googleapis.com/css2?family=Monoton&display=swap');
      </style>
      <Link
        to="/student/main"
        style={{ textDecoration: "none", color: "black" }}
      >
        <LogoWrap>
          <LogoCircle>
            <CircleText>J</CircleText>
          </LogoCircle>
          <LogoText>Join</LogoText>
        </LogoWrap>
      </Link>
    </>
  );
};

export default Logo;
