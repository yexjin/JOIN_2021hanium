import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { Collapse } from "reactstrap";
import styled from "styled-components";
import { useClasses } from "../components/Use";
import { getDataFromStorage } from "../utils/storage";
const Nav = styled.div`
  background-color: #e5e5e5;
  color: black;
  text-decoration: none;
  width: 229px;
  height: 785px;
  margin: 0px 38px 28px 53px;
`;

const Page = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  color: #6f91b5;
  margin-top: 27px;
  margin-bottom: 15px;
  text-align: center;
`;

const BarHr = styled.hr`
  border: 2px solid #c4c4c4;
  margin: 0 auto;
  height: 0px;
  width: 198px;
`;

const ClassName = styled.div`
  color: #000000;
`;

const Menus = styled.div`
  margin-top: 18px;
  text-align: center;
  list-style: none;
  a:link {
    font-family: Roboto;
    color: #7c7979;
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    text-decoration: none;
  }
  a:visited {
    font-family: Roboto;
    color: #7c7979;
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    text-decoration: none;
  }
  a:hover {
    font-family: Roboto;
    color: #000;
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    text-decoration: none;
  }
  li {
    margin: 18px 0px;
  }
`;

const SideBar = () => {
  const { code } = useParams();
  const history = useHistory();
  const { classesList, listAllClasses } = useClasses();
  useEffect(()=>{
    const fetch = async () =>{
      try{
        const studentInfo = getDataFromStorage();
        await listAllClasses(studentInfo.id);
      } catch (e) {
        alert(e);
      }
    }
    fetch();
  },[]);

  return (
    <Nav>
      <Page>수강 과목</Page>
      <BarHr />
      <Menus>
          {classesList.results.slice(0).reverse().filter((item)=>(item.isAccept)).map((item)=>(
            <li key={item.code}>
              <Link to={`/student/class/${item.code}/main`} aria-current="page">
                <span data-feather="home" />
                {item.code===code ? (<ClassName>{item.className}</ClassName>):(<div>{item.className}</div>)}
              </Link>
            </li>
          ))}
      </Menus>
    </Nav>
  );
};

export default SideBar;
