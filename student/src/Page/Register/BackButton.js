import React from "react";
import styled from "styled-components";
import {Link} from "react-router-dom";

const Wrapper = styled.button`
display: block;
text-align: center;
margin: 0 auto;
  padding-top: 9px;
  padding-bottom: 6px;
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
color: #FFFFFF;
    background: #89C0B7;
  }
`;

const RegisterButton = ({ children, ...rest }) => (
    <Link
    to="/register/terms"
    style={{ textDecoration: "none", color: "black" }}
  ><Wrapper {...rest}>{children}</Wrapper></Link>
);

export default RegisterButton;
