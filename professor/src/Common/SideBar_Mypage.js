import React, {useState} from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import PwModal from "../Page/Mypage/PwModal";

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

const Modify = styled.div`
  font-weight: bold;
  cursor: pointer;
  color : #7c7979;
  :hover {
    color: #000;
  }
`



const defaultList = [
  {
    title: "개인 정보",
    url: "/professor/mypage/myinfo",
  },
  {
    title: "강의 과목",
    url: "/professor/mypage/class",
  },
  {
    title: "등록한 과제",
    url: "/professor/mypage/assignment",
  },
  {
    title: "개인 정보 수정",
    url: "/professor/mypage/modify",
  },
];

const SideBar = () => {
  const [Modal, setModalOpen] = useState(false);

  const ModalOpen = () => {
      setModalOpen(true);
  }

  const ModalClose = () => {
      setModalOpen(false);
  }
  return (
    <Nav>
      <Page>마이페이지</Page>
      <BarHr />
      <Menus>
        {defaultList.map((item) => (
          <li key={item.title}>
            {item.title === "개인 정보 수정" ? (
              <>
              <span data-feather="home" />
              <Modify onClick={ModalOpen}>
             {item.title} 
             </Modify>
             </>
            ): (
              <Link to={item.url} aria-current="page"
              >
               <span data-feather="home" />
               {item.title}
             </Link>
            )}

          
          </li>
          
        ))}
      </Menus>
      <PwModal open={Modal} close={ModalClose}></PwModal>
    </Nav>
  );
};

export default SideBar;
