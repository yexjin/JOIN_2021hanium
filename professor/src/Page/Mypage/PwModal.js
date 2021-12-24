import React,{useState, useEffect} from 'react'
import styled from "styled-components";
import { useMember } from "../../components";
import { getDataFromStorage } from "../../utils/storage";
import {useHistory} from "react-router-dom"


const Block = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 99;
  background: rgb(25, 25, 25, 0.64);
`;


const ModalBlock = styled.div`
  width: 300px;
  background-color: #fff;
  height: 250px;
  border-radius: 15px;
  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background-color: rgba(0, 0, 0, 0.25);
  }
  &::-webkit-scrollbar-button {
    width: 0;
    height: 0;
  }
`;

const Header = styled.div`
  width: 100%;
  height: 71px;
  box-sizing: border-box;
  padding-left: 26px;
  padding-right: 24px;
  margin-bottom: 18px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: Kanit;
  font-size: 18px;
  font-weight: bold;
  line-height: 1.48;
  color: #101010;
  border-bottom: 1px solid #dee2e6;
  .button {
    position: relative;
    width: 25px;
    height: 25px;
    cursor: pointer;
    span {
      position: absolute;
      height: 2px;
      width: 20px;
      border-radius: 7px;
      background-color: #b0b0b0;
      top: 10px;
      right: 5px;
    }
    span:nth-child(1) {
      transform: rotate(-45deg);
    }
    span:nth-child(2) {
      transform: rotate(45deg);
    }
  }
`;


const PwInput = styled.input`
margin-left: 26px;
margin-top: 14px;
margin-bottom: 21px;
width: 243px;
height: 32px;
::placeholder {
  font-family: Roboto Condensed;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 14px;
  
  color: #7C7979;
}
`;

const Buttons = styled.div`
margin-left: 190px;
margin-top: 19px;
`
const SubmitButton = styled.span`
background: none;
border: none;
cursor: pointer;
font-family: Roboto Condensed;
font-style: normal;
font-weight: bold;
font-size: 18px;
line-height: 21px;

color: #EF8F88;
`;

const CloseButton = styled.span`
margin-right: 11px;
  background: none;
  border: none;
  cursor: pointer;
  font-family: Roboto Condensed;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 21px;

  color: #A8A7A7;
`;

const PwModal = ({open, close}) => {

  const [password, setPassword] = useState("");

  const { changePwApi } = useMember();

  const professor = getDataFromStorage();

  const history = useHistory();

  const handleChange = (e) => {
    setPassword(e.target.value);
  };

  const SubButton = async(e) => {
      const body = {
        password: password
      };

      try{
        await changePwApi(professor.access_token,body);
        history.push(`/professor/mypage/modify`)
      } catch (err){
          alert(err);
      }
  }



    return (
        <>
            {open && (
                <Block State={open}>
                    <ModalBlock>
                        <Header>비밀번호를 입력하세요</Header>
                        <PwInput type="password" name="password" value={password} onChange={handleChange} placeholder="비밀번호를 입력하세요."/>
                        <Buttons>
                            <CloseButton onClick={close}>
                                취소
                            </CloseButton>
                            <SubmitButton onClick={()=>{SubButton()}}>
                                확인
                            </SubmitButton>
                        </Buttons>
                    </ModalBlock>
                </Block>
            )}
        </>
    )
}

export default PwModal
