import React from "react";
import styled from "styled-components";

const Wrapper = styled.button`
text-align: center;
  margin-left: 148px;
  padding-top: 0.6rem;
  padding-bottom: 0.5rem;
  margin-top: 21px;
background: #FFFFFF;
  border: #EF8F88 2px solid;
  width: 434px;
height: 57px;
  font-family: Roboto;
font-style: normal;
font-weight: bold;
font-size: 23px;
line-height: 27px;
/* identical to box height */

color: #EF8F88;
  cursor: pointer;
  user-select: none;
  transition: 0.2s all;
  margin-bottom: 1rem;

  :hover{
    background: #EF8F88;
    color: #FFFFFF;
  }
`;

const FindButton = ({ children, ...rest }) => (
  <Wrapper {...rest}>{children}</Wrapper>
);

export default FindButton;