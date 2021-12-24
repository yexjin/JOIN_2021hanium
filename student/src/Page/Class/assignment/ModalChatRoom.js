import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import io from "socket.io-client";
import styled from "styled-components";
import { useChats, useAssignments } from "../../../components/Use";
import { getDataFromStorage } from "../../../utils/storage";
import { concatChat } from "../../../store/reducer/chats";
import Draggable from "react-draggable";
import { useParams } from "react-router-dom";

const Box = styled.div`
  width: 400px;
  height: 600px;
  background-color: white;
  border: 1px solid #89c0b7;
  overflow-y: auto;
  flex-direction: column-reverse;
`;

const Top = styled.div`
  width: 400px;
  height: 50px;
  color: white;
  font-size: 20px;
  font-weight: bold;
  display: flex;
  justify-content: space-between;

  div {
    /* margin-left: 170px; */
    margin-top: 10px;
  }
  button {
    position: absolute;
    top:0;
    right:0;
    font-weight: bold;
    background-color: transparent;
    color: #ffffff;
    border: 0;
    border-radius: 10px;
    height: 35px;
    width: 60px;
    margin-right: 10px;
    font-size: 30px;
  }
`;

const Name = styled.span`
  float: left;
  font-family: Roboto;
  font-weight: 500;
  font-size: 12px;
  line-height: 14px;
  padding-right: 15px;
  margin-bottom: 7px;
  color: #000000;
`;

const Profile = styled.div`
  img {
    width: 40px;
    height: 40px;
    float: left;
    margin-left: 7px;
    margin-right: 10px;
  }
`;

const Bottom = styled.div`
  width: 400px;
  height: 50px;
  display: flex;
  justify-content: space-between;

  button {
    font-weight: bold;
    background-color: white;
    color: #89c0b7;
    border: 0;
    border-radius: 10px;
    height: 35px;
    width: 60px;
    margin-top: 5px;
    margin-right: 15px;
    font-size: 15px;
  }

  input {
    border: 0;
    width: 300px;
    height: 30px;
    background-color: #89c0b7;
    margin-left: 20px;
    margin-top: 5px;
    outline: 2px solid #89c0b7;
  }
`;

const LeftBox = styled.div`
  font-family: Roboto;
  position: relative;
  height: fit-content;
  background-color: #ebe7e7;
  font-weight: bold;
  width: fit-content;
  padding: 0.84rem;
  max-width: 70%;
  margin-left: 3.5rem;
  margin-top: 20px;
  border-radius: 10px;
  margin-bottom: 10px;
`;

const AssignmentName = styled.div`
  width: 400px;
  text-align: center;
`;

const RightBox = styled.div`
  font-family: Roboto;
  height: fit-content;
  width: fit-content;
  max-width: 70%;
  text-align: right;
  background-color: #89c0b7;
  font-weight: bold;
  position: relative;
  padding: 0.84rem;
  margin: 15px 1rem 0 auto;
  border-radius: 10px;
`;

const ModalBox = styled.div`
  z-index: 99;
  width: 400px;
  height: 700px;
  background-color: #89c0b7;
  animation: modal-bg-show 0.3s;
  position: fixed;
  left: 50%;
  top: 15%;
  border-radius: 30px;
  box-shadow: 6px 6px 10px -3px rgba(0, 0, 0, 0.25);
  @keyframes modal-show {
    from {
      opacity: "0";
      margin-top: -50px;
    }
    to {
      opacity: 1;
      margin-top: 0;
    }
  }
  @keyframes modal-bg-show {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

let socket;
const ModalChatRoom = ({ match, setOpen }) => {
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [data, setData] = useState({ name: "", message: "", open: false });
  const { id } = useParams();
  const studentInfo = getDataFromStorage();
  const dispatch = useDispatch();
  const scrollRef = useRef();

  const { createChatApi, chatList, listAllChats } = useChats();
  const { assignmentOne, getAssignment } = useAssignments();

  const fetch = async () => {
    socket = io.connect(`http://localhost:3000/${match.assignmentTeamId}`, {
      path: "/socket.io",
      rejectUnauthorized: false,
    });
    await listAllChats(match.assignmentTeamId);
    await getAssignment(id);
    scrollToBottom();
  };

  useEffect(() => {
    fetch();
  }, []);

  useEffect(() => {
    socket.on("message", (message) => {
      if (message) {
        dispatch(concatChat(message[0]));
      }
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  const scrollToBottom = () => {
    scrollRef.current.scrollIntoView();
  };

  const trackPos = (data) => {
    setPosition({ x: data.x, y: data.y });
  };

  const onTextChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const sendMessage = async () => {
    try {
      const msg = data.message.replace(/\s/gi, "");
      if (msg === "") {
        throw "";
      }
      const body = {
        assignmentTeamId: match.assignmentTeamId,
        memberId: studentInfo.id,
        contents: data.message,
      };

      await createChatApi(body);

      setData({
        ...data,
        message: "",
      });
      scrollToBottom();
    } catch (e) {
      alert(e);
    }
  };
  return (
    <Draggable onDrag={(data) => trackPos(data)}>
      <ModalBox>
        <Top>
          <AssignmentName>{assignmentOne.name}</AssignmentName>
          <button
            onClick={() => {
              setOpen(false);
            }}
          >
            x
          </button>
        </Top>
        <Box>
          {chatList.results.map((chat, i) => {
            if (chat.id === studentInfo.id) {
              return (
                <>
                  <RightBox>{chat.contents}</RightBox>
                </>
              );
            } else {
              return (
                <>
                  {i > 0 &&
                  chatList.results[i].id === chatList.results[i - 1].id ? (
                    <LeftBox>{chat.contents}</LeftBox>
                  ) : (
                    <>
                      <div>
                        <Profile>
                          <img
                            src={
                              chat.profileImg === null
                                ? require("../../../images/person_default.png")
                                    .default
                                : `/${chat.profileImg}`
                            }
                            alt="이미지"
                          />
                        </Profile>
                        <Name>{chat.name}</Name>
                      </div>
                      <LeftBox>{chat.contents}</LeftBox>
                    </>
                  )}
                </>
              );
            }
          })}
          <div ref={scrollRef} style={{ padding: "5px" }} />
        </Box>
        <Bottom>
          <input name="message" value={data.message} onChange={onTextChange} />
          <button onClick={sendMessage}>전송</button>
        </Bottom>
      </ModalBox>
    </Draggable>
  );
};

export default ModalChatRoom;
