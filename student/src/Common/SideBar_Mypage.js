import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Nav = styled.div`
  background-color: #E5E5E5;
  color: black;
  text-decoration: none;
  width: 229px;
  height: 785px;
  margin: 0px 38px 28px 53px;
`

const Page = styled.div`
font-family: Roboto;
font-style: normal;
font-weight: bold;
font-size: 20px;
color: #6F91B5;
margin-top: 27px;
margin-bottom: 15px;
text-align: center;
`

const BarHr = styled.hr`
border: 2px solid #C4C4C4;
margin: 0 auto;
height: 0px;
width: 198px;
`


const Menus = styled.div`
  margin-top: 18px;
  text-align: center;
  list-style: none;
  a:link { font-family: Roboto;
    color: #7C7979;
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    text-decoration: none; }
  a:visited { font-family: Roboto;
    color: #7C7979;
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    text-decoration: none;}
  a:hover { font-family: Roboto;
    color: #000;
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    text-decoration: none;}
  li {
      margin: 18px 0px;
  }
`

const defaultList = [
  {
    title: "개인 정보",
    url: "/student/mypage/myinfo",
  },
  {
    title: "수강 과목",
    url: "/student/mypage/class",
  },
  {
    title: "과제 제출함",
    url: "/student/mypage/assignment",
  },
  {
    title: "개인 정보 수정",
    url: "/student/mypage/modify",
  },
];

const SideBar = () => {
  return (
    <Nav>
      <Page>
        마이페이지
      </Page>
      <BarHr />
      <Menus>
        {defaultList.map((item) => (
          <li>
            <Link 
              to={item.url} 
              aria-current="page">
              <span data-feather="home" />
              {item.title}
            </Link>
          </li>
        ))}
      </Menus>
    </Nav>
  )
}

export default SideBar;
