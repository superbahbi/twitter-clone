import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { authContext } from "../Contexts/AuthContext";

// NPM components
import { Container, Row, Col } from "react-bootstrap";
import { useMediaQuery } from "react-responsive";
import styled from "styled-components";
import formurlencoded from "form-urlencoded";
import { ObjectID } from "bson";

// Local components
// import Search from ".././Components/Search";
import Navbar from ".././Components/Navbar";
import Button from "../Components/Button";
import Chat from ".././Components/Chat";
import Modal from ".././Components/Modal";
import SearchWithList from "../Components/SearchWithList";
// Local helper functions
// import { fetchDB } from "../Helper/fetch";
import socketIOClient from "socket.io-client";
const ENDPOINT = process.env.REACT_APP_API_URL;

const MessageContainer = styled(Container)``;
const MessageCol = styled(Col)`
  height: 100vh;
  border: 1px solid rgb(239, 243, 244);
`;
const MessageHeaderText = styled.span`
  font-size: 25px;
`;
const NewMessageButton = styled(Button)`
  float: right;
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
  const history = useHistory();
  const { auth } = useContext(authContext);
  const user = auth.data.user;
  const [allUser, setAllUser] = useState([]);
  const [chatRoom, setChatRoom] = useState([]);
  const [selectUser, setSelectUser] = useState({});
  const [filterUsers, setFilterUsers] = useState([]);
  const [dmUsers, setDmUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [searchChatRoom, setSearchChatRoom] = useState("");
  const [show, setShow] = useState({ status: false, id: "" });
  const [channel, setChannel] = useState("");
  const [socket, setSocket] = useState(null);
  const [messagesHistory, setMessagesHistory] = useState([]);

  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-device-width: 1224px)",
  });
  useEffect(() => {
    const newSocket = socketIOClient(ENDPOINT);
    setSocket(newSocket);
    newSocket.on("onMessage", (msg) => {
      setMessagesHistory((prev) => [...prev, msg]);
    });
    return () => newSocket.disconnect();
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const request = async (id = 100) => {
      const url = `${process.env.REACT_APP_API_URL}/api/getCurrentUserChatRoom/${user._id}`;
      fetch(
        url,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: "Bearer " + auth.data.token,
          },
        },
        { signal }
      )
        .then((results) => results.json())
        .then((data) => {
          setChatRoom(data);
          if (data.length > 0) {
            setDmUsers(data);
            setSelectUser(data[0]);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };
    request();
    return function () {
      console.log("Chat room data unmounting...");
      controller.abort();
    };
  }, []);
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    let url = process.env.REACT_APP_API_URL;
    fetch(`${url}/api/getAllUser`, { signal })
      .then((results) => results.json())
      .then((data) => {
        setAllUser(data);
        setFilterUsers(data);
      })
      .catch((error) => {
        console.log(error);
      });
    return function () {
      console.log("Messages data unmounting...");
      controller.abort();
    };
  }, []);
  useEffect(() => {
    let temp = [];
    allUser.map((user) => {
      if (
        String(user.profile.name).toLowerCase().includes(search.toLowerCase())
      ) {
        temp.push(user);
      }
      return;
    });
    setFilterUsers(temp);
  }, [search]);
  useEffect(() => {
    let temp = [];
    chatRoom.map((user) => {
      if (
        String(user.name).toLowerCase().includes(searchChatRoom.toLowerCase())
      ) {
        temp.push(user);
      }
    });
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
    const url = process.env.REACT_APP_API_URL + "/api/createChatRoom";
    const id = user._id + "-" + receiverData._id;
    let split = id.split("-"); // ['user_id1', 'user_id2']
    let unique = [...new Set(split)].sort((a, b) => (a < b ? -1 : 1)); // ['username1', 'username2']
    let updatedRoomName = `${unique[0]}-${unique[1]}`; // 'username1--with--username2'
    const data = {
      _id: updatedRoomName,
      sender: user,
      receiver: receiverData,
    };
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Bearer " + auth.data.token,
      },
      body: formurlencoded(data),
    });

    const updateChatData = {
      _id: updatedRoomName,
      sender: user._id,
      receiver: receiverData._id,
      avatar: receiverData.profile.avatar.filename,
      name: receiverData.profile.name,
    };
    onHandleModalClose();
    setSelectUser(receiverData);
    setChannel(updatedRoomName);
    setDmUsers([...dmUsers, updateChatData]);
    setChatRoom((prev) => [...prev, updateChatData]);
    socket.emit("join", data);
    history.push("/messages/" + updatedRoomName);
    console.log("Chat room created");
  };
  const onHandleRoomClick = (room) => {
    let url = process.env.REACT_APP_API_URL;
    setMessagesHistory([]);
    fetch(`${url}/api/getMessages/${room._id}`, {
      headers: {
        Accept: "application/x-www-form-urlencoded",
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Bearer " + auth.data.token,
      },
    })
      .then((results) => results.json())
      .then((data) => {
        setMessagesHistory(data);
      });

    setChannel(room._id);
    setSelectUser(room);
    socket.emit("join", { _id: room._id });
    history.push("/messages/" + room._id);
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
    <MessageContainer>
      <Row>
        {isDesktopOrLaptop && (
          <Col md={3}>
            <Navbar
              username={auth && auth.data.user.username}
              avatar={auth && auth.data.user.profile.avatar.filename}
            />
          </Col>
        )}
        <MessageCol md={3}>
          <Col className="p-0">
            <div className="row justify-content-between">
              <div className="col-6">
                <MessageHeaderText>Messages</MessageHeaderText>
              </div>
              <div className="col-2 p-0">
                <NewMessageButton
                  btnStyle="input-tweet-icon"
                  icon="envelope"
                  handleClick={() => {
                    onHandleModal();
                  }}
                />
              </div>
            </div>
            <div className="row">
              <SearchWithList
                placeholder="Search Direct Messages"
                filterUsers={dmUsers}
                selectUser={selectUser}
                onHandleChange={(e) => setSearchChatRoom(e.target.value)}
                onHandleSearchClick={onHandleRoomClick}
              />
            </div>

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
          </Col>
        </MessageCol>
        <MessageCol md={6} className="p-0">
          <MessagesBox>
            {channel ? (
              <Chat
                socket={socket}
                user={user}
                receiverData={selectUser}
                channel={channel}
                messagesHistory={messagesHistory}
                onUpdateMessageSubmit={onUpdateMessageSubmit}
              />
            ) : (
              <SelectMessage>
                <Col>
                  <h2>Select a message</h2>
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
                </Col>
              </SelectMessage>
            )}
          </MessagesBox>
        </MessageCol>
      </Row>
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
    </MessageContainer>
  );
}
export default Messages;
