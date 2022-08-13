import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context as AuthContext } from "../Contexts/AuthContext";
import { Context as UserContext } from "../Contexts/UserContext";
// Local use hooks
import useGetMessages from "../Hooks/useGetMessages";
// NPM components
import { ObjectID } from "bson";
// import formurlencoded from "form-urlencoded";
import { Col } from "react-bootstrap";
import styled from "styled-components";
// Local components
import Chat from "../Components/Chat";
import Modal from "../Components/Modal";
import Button from "../Components/Button";
import Header from "../Components/Header";
import SearchWithList from "../Components/SearchWithList";
import { Mail } from "../Assets/Icon";
// Local helper functions
// import { fetchDB } from "../Helper/fetch";
import socketIOClient, { io, Socket } from "socket.io-client";
import api from "../Helper/api";
import {
  ClientToServerEvents,
  IMessageHistoryProps,
  IMessageSentProps,
  // IMessageSocketProps,
  ISelectUserProps,
  ServerToClientEvents,
} from "../Helper/interface";

const Container = styled.div`
  display: grid;
  grid-template-areas: "user chat";
  grid-template-columns: 388px 600px;
`;

const UserContainer = styled.div`
  grid-area: user;
  border-right: 1px solid ${(props) => props.theme.color.border};
  border-left: 1px solid ${(props) => props.theme.color.border};
  padding-bottom: 53px;
  height: 100vh;
`;
const ChatContainer = styled.div`
  grid-area: chat;
  border-right: 1px solid ${(props) => props.theme.color.border};
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
  color: ${(props) => props.theme.color.text};
`;
const SelectMessage = styled.div`
  display: flex;
  height: 100vh;
  align-items: center;
  padding-left: 50px;
  padding-right: 60px;
`;

const Messages: React.FC<{}> = ({}) => {
  const navigate = useNavigate();
  const { state: authState } = useContext(AuthContext);
  const { state: userState, getAllUser } = useContext(UserContext);
  const [messages] = useGetMessages();

  // const [allUser, setAllUser] = useState([]);
  const [chatRoom, setChatRoom] = useState<ISelectUserProps[]>();
  const [dmUsers, setDmUsers] = useState<ISelectUserProps[]>();
  const [, setFilterUsers] = useState<ISelectUserProps[]>();
  const [selectUser, setSelectUser] = useState<ISelectUserProps>();
  const [search] = useState<string>("");
  const [searchChatRoom, setSearchChatRoom] = useState("");
  const [show, setShow] = useState<boolean>(false);
  const [channel, setChannel] = useState<string>("");
  const [socket, setSocket] =
    useState<Socket<ServerToClientEvents, ClientToServerEvents>>(io);
  const [messagesHistory, setMessagesHistory] = useState<
    IMessageHistoryProps[]
  >([]);

  useEffect((): (() => void) => {
    const newSocket = socketIOClient(process.env.REACT_APP_API_URL as string);
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
    let temp: ISelectUserProps[] = [];
    if (userState.allUser) {
      userState.allUser.map((user: ISelectUserProps) =>
        String(user.name).toLowerCase().includes(search.toLowerCase())
          ? temp.push(user)
          : null
      );
    }
    setFilterUsers(temp);
  }, [search]);
  useEffect(() => {
    let temp: ISelectUserProps[] = [];
    if (chatRoom) {
      chatRoom.map((user: ISelectUserProps) =>
        String(user.name).toLowerCase().includes(searchChatRoom.toLowerCase())
          ? temp.push(user)
          : null
      );
    }
    setDmUsers(temp);
  }, [searchChatRoom]);
  function onHandleModal() {
    setShow(!show);
  }

  // const onHandleSearchClick = async (receiverData: IUserProps) => {
  //   const id = authState.user._id + "-" + receiverData._id;
  //   let split = id.split("-"); // ['user_id1', 'user_id2']
  //   let unique = [...new Set(split)].sort((a, b) => (a < b ? -1 : 1)); // ['username1', 'username2']
  //   let updatedRoomName = `${unique[0]}-${unique[1]}`; // 'username1--with--username2'
  //   const data: IMessageSocketProps = {
  //     _id: updatedRoomName,
  //     sender: authState.user,
  //     receiver: receiverData,
  //   };
  //   await api.post("/api/createChatRoom", formurlencoded(data));

  //   // const updateChatData: ISelectUserProps = {
  //   //   _id: updatedRoomName,
  //   //   sender: authState.user._id,
  //   //   receiver: receiverData._id,
  //   //   avatar: receiverData.profile.avatar.filename,
  //   //   name: receiverData.profile.name,
  //   // };
  //   onHandleModal();
  //   setSelectUser(receiverData);
  //   setChannel(updatedRoomName);
  //   // setDmUsers([...dmUsers, updateChatData]);
  //   // setChatRoom([...chatRoom, updateChatData]);
  //   socket.emit("join", data);
  //   navigate("/messages/" + updatedRoomName);
  // };
  const onHandleRoomClick = async (room: ISelectUserProps) => {
    setMessagesHistory([]);
    socket.emit("join", { _id: room._id });
    messages(room._id);
    setChannel(room._id);
    // setSelectUser(room);
    let msg = await api.get("/api/getMessages/" + room._id);
    if (msg.data) {
      setMessagesHistory(msg.data);
      navigate("/messages/" + room._id);
    }
  };
  const onUpdateMessageSubmit = (data: IMessageSentProps) => {
    if (!data) return;
    if (!selectUser) return;
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

        {chatRoom && chatRoom.length === 0 ? (
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
                  label="Write a message"
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
            onHandleChange={(e: React.SyntheticEvent) =>
              setSearchChatRoom((e.target as HTMLInputElement).value)
            }
            onHandleSearchClick={onHandleRoomClick}
          />
        )}
      </UserContainer>
      <ChatContainer>
        <MessagesBox>
          {channel && messagesHistory ? (
            <Chat
              receiverData={selectUser!}
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
          // <SearchWithList
          //   placeholder="Search People"
          //   filterUsers={filterUsers}
          //   onHandleChange={(e: React.SyntheticEvent) =>
          //     setSearch((e.target as HTMLInputElement).value)
          //   }
          //   onHandleSearchClick={onHandleSearchClick}
          // />
          <></>
        }
      />
    </Container>
  );
};
export default Messages;
