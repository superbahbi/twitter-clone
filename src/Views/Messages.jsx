import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context as AuthContext } from "../Contexts/AuthContext";
import { Context as UserContext } from "../Contexts/UserContext";
// Local use hooks
import useGetMessages from "../Hooks/useGetMessages";
// NPM components
import { Row, Col } from "react-bootstrap";
import styled from "styled-components";
import { ObjectID } from "bson";

// Local components
import Button from "../Components/Button";
import Chat from ".././Components/Chat";
import Modal from ".././Components/Modal";
import Header from "../Components/Header";
import SearchWithList from "../Components/SearchWithList";
// Local helper functions
// import { fetchDB } from "../Helper/fetch";
import socketIOClient from "socket.io-client";
const ENDPOINT = process.env.REACT_APP_API_URL;

const MessageCol = styled(Col)`
  height: 100vh;
  border: 1px solid rgb(239, 243, 244);
`;
const MessagesBox = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 20px;
`;
const MessageButton = styled.div`
    display: flex;
    padding
    margin-top: 20px;
    margin-bottom: 20px;
`;
const MessageH1 = styled.h1`
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
  const { state: userState, getAllUser } = useContext(UserContext);
  const [messages] = useGetMessages();

  // const [allUser, setAllUser] = useState([]);
  const [chatRoom, setChatRoom] = useState([]);
  const [selectUser, setSelectUser] = useState({});
  const [filterUsers, setFilterUsers] = useState();
  const [dmUsers, setDmUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [searchChatRoom, setSearchChatRoom] = useState("");
  const [show, setShow] = useState({ status: false, id: "" });
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
    setShow({
      ...show,
      status: true,
      // id: id
    });
  }
  function onHandleModalClose() {
    setShow({
      ...show,
      status: false,
    });
  }
  const onHandleSearchClick = (receiverData) => {
    // const url = process.env.REACT_APP_API_URL + "/api/createChatRoom";
    // const id = user._id + "-" + receiverData._id;
    // let split = id.split("-"); // ['user_id1', 'user_id2']
    // let unique = [...new Set(split)].sort((a, b) => (a < b ? -1 : 1)); // ['username1', 'username2']
    // let updatedRoomName = `${unique[0]}-${unique[1]}`; // 'username1--with--username2'
    // const data = {
    //   _id: updatedRoomName,
    //   sender: user,
    //   receiver: receiverData,
    // };
    // fetch(url, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/x-www-form-urlencoded",
    //     Authorization: "Bearer " + state.token,
    //   },
    //   body: formurlencoded(data),
    // });

    // const updateChatData = {
    //   _id: updatedRoomName,
    //   sender: user._id,
    //   receiver: receiverData._id,
    //   avatar: receiverData.profile.avatar.filename,
    //   name: receiverData.profile.name,
    // };
    // onHandleModalClose();
    // setSelectUser(receiverData);
    // setChannel(updatedRoomName);
    // setDmUsers([...dmUsers, updateChatData]);
    // setChatRoom((prev) => [...prev, updateChatData]);
    // socket.emit("join", data);
    // Navigate("/messages/" + updatedRoomName);
    console.log("Chat room created");
  };
  const onHandleRoomClick = (room) => {
    setMessagesHistory([]);
    messages(room._id);

    socket.emit("join", { _id: room._id });
    setChannel(room._id);
    setSelectUser(room);
    setMessagesHistory(userState.messages);
    navigate("/messages/" + room._id);
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
    <>
      <MessageCol lg={3} className="p-0">
        <Header
          name="Messages"
          iconRight="ion-ios-email-outline"
          onHandleIconRightButton={() => {
            onHandleModal();
          }}
        />
        <SearchWithList
          placeholder="Search Direct Messages"
          filterUsers={dmUsers}
          selectUser={selectUser}
          onHandleChange={(e) => setSearchChatRoom(e.target.value)}
          onHandleSearchClick={onHandleRoomClick}
        />
        {chatRoom.length === 0 ? (
          <MessagesBox>
            <MessageH1>Welcome to your inbox!</MessageH1>
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
          </MessagesBox>
        ) : null}
      </MessageCol>
      <MessageCol xs={12} md={8} lg={6}>
        <Row>
          <MessageCol className="p-0">
            <MessagesBox>
              {channel && messagesHistory ? (
                <Chat
                  socket={socket}
                  user={userState}
                  receiverData={selectUser}
                  channel={channel}
                  messagesHistory={userState.messages}
                  onUpdateMessageSubmit={onUpdateMessageSubmit}
                />
              ) : (
                <SelectMessage>
                  <Col>
                    <h2>Select a message</h2>
                    <MessageP>
                      Choose from your existing conversations, start a new one,
                      or just keep swimming.
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
                  </Col>
                </SelectMessage>
              )}
            </MessagesBox>
          </MessageCol>
        </Row>
      </MessageCol>
      <Modal
        show={show.status}
        onHide={onHandleModalClose}
        body={
          <SearchWithList
            placeholder="Search People"
            filterUsers={filterUsers}
            onHandleChange={(e) => setSearch(e.target.value)}
            onHandleSearchClick={onHandleSearchClick}
          />
        }
        setShow={setShow}
        title="New Message"
      />
    </>
  );
}
export default Messages;
