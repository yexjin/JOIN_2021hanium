import React from "react";
import styled from "styled-components";

const Wrapper = styled.button`
display: block;
text-align: center;
margin: 0 auto;
  padding-top: 9px;
  padding-bottom: 6px;  
  margin-top: 30px;
  border: #89C0B7 2px solid;
  width: 250px;
height: 38px;
font-family: Roboto;
font-style: normal;
font-weight: bold;
font-size: 20px;
line-height: 23px;

  cursor: pointer;
  user-select: none;
  transition: 0.2s all;
  margin-bottom: 1rem;
    background: #FFFFFF;
    color: #89C0B7;

  :hover{
    background: #89C0B7;
    color: #FFFFFF;
  }
`;

const RegisterButton = ({ children, ...rest }) => (
  <Wrapper {...rest}>{children}</Wrapper>
);

export default RegisterButton;
