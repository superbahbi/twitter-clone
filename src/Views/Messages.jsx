import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context as AuthContext } from "../Contexts/AuthContext";
import { Context as UserContext } from "../Contexts/UserContext";
// Local use hooks
import useGetMessages from "../Hooks/useGetMessages";
// NPM components
import { ObjectID } from "bson";
import formurlencoded from "form-urlencoded";
import { Col } from "react-bootstrap";
import styled from "styled-components";
// Local components
import Chat from ".././Components/Chat";
import Modal from ".././Components/Modal";
import Button from "../Components/Button";
import Header from "../Components/Header";
import SearchWithList from "../Components/SearchWithList";
import { Mail } from "../Assets/Icon";
// Local helper functions
// import { fetchDB } from "../Helper/fetch";
import socketIOClient from "socket.io-client";
import api from "../Helper/api";
const ENDPOINT = process.env.REACT_APP_API_URL;

const Container = styled.div`
  display: grid;
  grid-template-areas: "user chat";
  grid-template-columns: 388px 600px;
`;

const UserContainer = styled.div`
  grid-area: user;
  border-right: 1px solid rgb(239, 243, 244);
  padding-bottom: 53px;
  height: 100vh;
`;
const ChatContainer = styled.div`
  grid-area: chat;
  border-right: 1px solid rgb(239, 243, 244);
  @media (max-width: 1080px) {
    display: none;
  }
`;
const MessagesBox = styled.div`
  display: flex;
  flex-direction: column;
`;
const MessageButton = styled.div`
  display: flex;

  margin-top: 20px;
  margin-bottom: 20px;
`;
const MessageLeftGroup = styled.div`
  margin: 32px 0px;
  padding: 0px 32px;
`;

const MessageRightGroup = styled.div`
  width: 336px;
  margin: 0 auto;
`;
const MessageH = styled.h1`
  font-size: 30px;
  font-weight: 800;
`;
const MessageP = styled.p`
  font-size: 15px;
  color: #657786;
`;
const SelectMessage = styled.div`
  display: flex;
  height: 100vh;
  align-items: center;
  padding-left: 50px;
  padding-right: 60px;
`;

function Messages() {
  const navigate = useNavigate();
  const { state: authState } = useContext(AuthContext);
  const {
    state: userState,
    getAllUser,
    getUserMessage,
  } = useContext(UserContext);
  const [messages] = useGetMessages();

  // const [allUser, setAllUser] = useState([]);
  const [chatRoom, setChatRoom] = useState([]);
  const [selectUser, setSelectUser] = useState({});
  const [filterUsers, setFilterUsers] = useState();
  const [dmUsers, setDmUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [searchChatRoom, setSearchChatRoom] = useState("");
  const [show, setShow] = useState(false);
  const [channel, setChannel] = useState("");
  const [socket, setSocket] = useState(null);
  const [messagesHistory, setMessagesHistory] = useState([]);

  useEffect(() => {
    const newSocket = socketIOClient(ENDPOINT);
    setSocket(newSocket);
    newSocket.on("onMessage", (msg) => {
      setMessagesHistory((prev) => [...prev, msg]);
    });
    return () => newSocket.disconnect();
  }, []);
  useEffect(() => {
    getAllUser();
    setChatRoom(authState.user.chatroom);
    if (authState.user.chatroom.length > 0) {
      setDmUsers(authState.user.chatroom);
      setSelectUser(authState.user.chatroom[0]);
    }
  }, [chatRoom]);
  useEffect(() => {
    let temp = [];
    if (userState.allUser) {
      userState.allUser.map((user) =>
        String(user.profile.name).toLowerCase().includes(search.toLowerCase())
          ? temp.push(user)
          : null
      );
    }
    setFilterUsers(temp);
  }, [search]);
  useEffect(() => {
    let temp = [];
    chatRoom.map((user) =>
      String(user.name).toLowerCase().includes(searchChatRoom.toLowerCase())
        ? temp.push(user)
        : null
    );
    setDmUsers(temp);
  }, [searchChatRoom]);
  function onHandleModal() {
    setShow(!show);
  }

  const onHandleSearchClick = (receiverData) => {
    const id = authState.user._id + "-" + receiverData._id;
    let split = id.split("-"); // ['user_id1', 'user_id2']
    let unique = [...new Set(split)].sort((a, b) => (a < b ? -1 : 1)); // ['username1', 'username2']
    let updatedRoomName = `${unique[0]}-${unique[1]}`; // 'username1--with--username2'
    const data = {
      _id: updatedRoomName,
      sender: authState.user,
      receiver: receiverData,
    };
    api.post("/api/createChatRoom", formurlencoded(data));

    const updateChatData = {
      _id: updatedRoomName,
      sender: authState.user._id,
      receiver: receiverData._id,
      avatar: receiverData.profile.avatar.filename,
      name: receiverData.profile.name,
    };
    onHandleModal();
    setSelectUser(receiverData);
    setChannel(updatedRoomName);
    setDmUsers([...dmUsers, updateChatData]);
    setChatRoom([...chatRoom, updateChatData]);
    socket.emit("join", data);
    navigate("/messages/" + updatedRoomName);
  };
  const onHandleRoomClick = async (room) => {
    setMessagesHistory([]);
    socket.emit("join", { _id: room._id });
    messages(room._id);
    setChannel(room._id);
    setSelectUser(room);
    let msg = await api.get("/api/getMessages/" + room._id);
    if (msg.data) {
      setMessagesHistory(msg.data);
      navigate("/messages/" + room._id);
    }
  };
  const onUpdateMessageSubmit = (data, e) => {
    if (!data) return;
    const msg = {
      _id: new ObjectID().toString(),
      user: selectUser.name,
      body: data.message,
      createdAt: Date.now(),
    };
    socket.emit("emitMessage", msg);
    setMessagesHistory((prev) => [...prev, msg]);
  };
  return (
    <Container>
      <UserContainer>
        <Header
          name="Messages"
          iconRightComponent={<Mail />}
          onHandleIconRightButton={() => {
            onHandleModal();
          }}
        />

        {chatRoom.length === 0 ? (
          <MessagesBox>
            <MessageLeftGroup>
              <MessageH>Welcome to your inbox!</MessageH>
              <MessageP>
                Drop a line, share Tweets and more with private conversations
                between you and others on Twitter.
              </MessageP>
              <MessageButton>
                <Button
                  large
                  className=""
                  id="tweets"
                  name="button"
                  type="submit"
                  btnStyle="large-btn"
                  label="Write a message"
                  footer={false}
                  handleClick={() => {
                    onHandleModal();
                  }}
                />
              </MessageButton>
            </MessageLeftGroup>
          </MessagesBox>
        ) : (
          <SearchWithList
            placeholder="Search Direct Messages"
            filterUsers={dmUsers}
            selectUser={selectUser}
            onHandleChange={(e) => setSearchChatRoom(e.target.value)}
            onHandleSearchClick={onHandleRoomClick}
          />
        )}
      </UserContainer>
      <ChatContainer>
        <MessagesBox>
          {channel && messagesHistory ? (
            <Chat
              socket={socket}
              user={userState}
              receiverData={selectUser}
              channel={channel}
              messagesHistory={messagesHistory}
              onUpdateMessageSubmit={onUpdateMessageSubmit}
            />
          ) : (
            <SelectMessage>
              <Col>
                <MessageRightGroup>
                  <MessageH>Select a message</MessageH>
                  <MessageP>
                    Choose from your existing conversations, start a new one, or
                    just keep swimming.
                  </MessageP>
                  <MessageButton>
                    <Button
                      large
                      id="tweets"
                      name="button"
                      type="submit"
                      label="New message"
                      footer={false}
                      handleClick={() => {
                        onHandleModal();
                      }}
                    />
                  </MessageButton>
                </MessageRightGroup>
              </Col>
            </SelectMessage>
          )}
        </MessagesBox>
      </ChatContainer>
      <Modal
        show={show}
        onHide={onHandleModal}
        onHandleModal={onHandleModal}
        body={
          <SearchWithList
            placeholder="Search People"
            filterUsers={filterUsers}
            onHandleChange={(e) => setSearch(e.target.value)}
            onHandleSearchClick={onHandleSearchClick}
          />
        }
        setShow={setShow}
      />
    </Container>
  );
}
export default Messages;
