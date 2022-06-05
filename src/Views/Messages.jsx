import React, { useContext, useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { authContext } from "../Contexts/AuthContext";

// NPM components
import {
    Container,
    Row,
    Col,
    ListGroup,
    ListGroupItem,
} from "react-bootstrap";
import { useMediaQuery } from "react-responsive";
import styled from "styled-components";
import Select from 'react-select';
import formurlencoded from "form-urlencoded";
import { ObjectID } from "bson";

// Local components
// import Search from ".././Components/Search";
import Navbar from ".././Components/Navbar";
import Button from "../Components/Button";
import Chat from ".././Components/Chat";
import Modal from ".././Components/Modal";
import SearchWithList from "../Components/SearchWithList";
import Avatar from "../Components/Avatar";
// Local helper functions
// import { fetchDB } from "../Helper/fetch";
import socketIOClient from "socket.io-client";
const ENDPOINT = process.env.REACT_APP_API_URL;

const MessageContainer = styled(Container)`
`;
const MessageCol = styled(Col)`
    height: 100vh;
    border: 1px solid rgb(239, 243, 244);

`;
const MessageHeader = styled.div`
    display: flex;
    flex-direction: row;
    font-size: 12px;
    line-height: 16px;
    padding: 10px 10px 10px 10px;
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
    padding-top: 20px 
`;
// const MessageArea = styled.div`
//     padding-left: 30px;
// `;
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
// const ProfileBox = styled.div`
//   display: flex !important;
//   flex-direction: column !important;
//   padding-left: 20px;
//   padding: 0.5em;
// `;
const SearchBox = styled(Select)`
    // border-radius: 999px;
    // border: 1px solid rgb(239, 243, 244);
    width: 100%;
`;
const SelectMessage = styled.div`
display: flex;
    height: 100vh;
    align-items: center;
    padding-left: 50px;
    padding-right: 60px;
`;
const ListGroupMessageRow = styled(Row)`
    padding-left: 0px;
`;
const ListGroupMessage = styled(ListGroup)`
    padding: 0px;
    width: 100%;
`;
const ListGroupItemMessage = styled(ListGroupItem)`
    // padding: 0px;
    border: none;
    cursor: pointer;
    :first-child {
        border-top-left-radius: 0px;
        border-top-right-radius: 0px;
    }
    :last-child {
        border-top-left-radius: 0px;
        border-top-right-radius: 0px;
    }
    :hover{
        background-color: #eff3f4;
        border-radius: 0px;
        border-right: 3px solid #71c9f8;
    }
    &.active{
        color: #212529;
        background-color: #fff;
        border-radius: 0px;
        border-right: 3px solid #71c9f8;
    }
    
`;
const ListGroupItemMessageActive = styled(ListGroupItem)`
    border: none;
    cursor: pointer;
    color: #212529;
    background-color: #fff;
    border-radius: 0px;
    border-right: 3px solid #71c9f8;
`;

function Messages() {

    const history = useHistory();
    const { roomid } = useParams();
    const { auth } = useContext(authContext);
    const user = auth.data.user;
    const [loading, setLoading] = useState(false);
    const [allUser, setAllUser] = useState([]);
    const [chatRoom, setChatRoom] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null);
    const [selectUser, setSelectUser] = useState({});
    const [filterUsers, setFilterUsers] = useState([]);
    const [dmUsers, setDmUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [show, setShow] = useState({ status: false, id: "" });
    const [channel, setChannel] = useState("");
    const [socket, setSocket] = useState(null)
    const [messagesHistory, setMessagesHistory] = useState([]);

    const isDesktopOrLaptop = useMediaQuery({
        query: "(min-device-width: 1224px)"
    });
    useEffect(() => {
        const newSocket = socketIOClient(ENDPOINT);
        setSocket(newSocket);
        newSocket.on("onMessage", msg => {
            setMessagesHistory(prev => [...prev, msg])
        });
        return () => newSocket.disconnect();
    }, []);

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        const request = async (id = 100) => {
            const url = `${process.env.REACT_APP_API_URL}/api/getCurrentUserChatRoom/${user._id}`
            fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    Authorization: "Bearer " + auth.data.token
                }
            }, { signal })
                .then(results => results.json())
                .then(data => {
                    setChatRoom(data)
                    if (data.length > 0) {
                        setDmUsers(data)
                        setSelectUser(data[0])
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        }
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
            .then(results => results.json())
            .then(data => {
                setAllUser(data)
                setFilterUsers(data)
            }
            )
            .catch(error => {
                console.log(error);
            });
        return function () {
            console.log("Messages data unmounting...");
            controller.abort();
        };
    }, []);
    useEffect(() => {
        let temp = [];
        allUser.map(user => {
            if (String(user.profile.name).toLowerCase().includes(search.toLowerCase())) {
                temp.push(user);
            }
        })
        setFilterUsers(temp);
    }, [search]);
    useEffect(() => {
        let temp = [];
        chatRoom.map(user => {
            if (String(user.name).toLowerCase().includes(search.toLowerCase())) {
                temp.push(user);
            }
        })
        setDmUsers(temp);
    }, [search]);
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
            status: false
        });
    }
    const onHandleSearchClick = (receiverData) => {
        const url = process.env.REACT_APP_API_URL + "/api/createChatRoom";
        const id = user._id + "-" + receiverData._id;
        let split = id.split('-'); // ['user_id1', 'user_id2']
        let unique = [...new Set(split)].sort((a, b) => (a < b ? -1 : 1)); // ['username1', 'username2']
        let updatedRoomName = `${unique[0]}-${unique[1]}`; // 'username1--with--username2'
        const data = {
            _id: updatedRoomName,
            sender: user,
            receiver: receiverData,
        }
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: "Bearer " + auth.data.token
            },
            body: formurlencoded(data)
        });

        const updateChatData = {
            _id: updatedRoomName,
            sender: user._id,
            receiver: receiverData._id,
            avatar: receiverData.profile.avatar.filename,
            name: receiverData.profile.name,
        };
        onHandleModalClose();
        setSelectUser(receiverData)
        setChannel(updatedRoomName);
        setDmUsers([...dmUsers, updateChatData]);
        setChatRoom(prev => [...prev, updateChatData])
        socket.emit("join", data);
        history.push("/messages/" + updatedRoomName);
        console.log("Chat room created");
    }
    const onHandleRoomClick = (room) => {
        let url = process.env.REACT_APP_API_URL;
        setMessagesHistory([]);
        fetch(`${url}/api/getMessages/${room._id}`, {
            headers: {
                Accept: "application/x-www-form-urlencoded",
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: "Bearer " + auth.data.token
            }
        })
            .then(results => results.json())
            .then(data => {
                setMessagesHistory(data)
            })

        setChannel(room._id);
        setSelectUser(room)
        socket.emit("join", { _id: room._id });
        history.push("/messages/" + room._id);
    }
    const onUpdateMessageSubmit = (data, e) => {
        if (!data) return;
        const msg = {
            _id: new ObjectID().toString(),
            user: selectUser.name,
            body: data.message,
            createdAt: Date.now(),
        };
        socket.emit("emitMessage", msg);
        setMessagesHistory(prev => [...prev, msg])
    }
    return (
        <MessageContainer>
            <Row >
                {isDesktopOrLaptop && (
                    <Col md={3} >
                        <Navbar
                            username={auth && auth.data.user.username}
                            avatar={auth && auth.data.user.profile.avatar.filename}
                        />
                    </Col>
                )}
                <MessageCol md={3}>
                    <Col className="p-0">
                        <div class="row justify-content-between">
                            <div class="col-6">
                                <MessageHeaderText>Messages</MessageHeaderText>

                            </div>
                            <div class="col-2 p-0">
                                <NewMessageButton
                                    btnStyle="input-tweet-icon"
                                    icon="envelope"
                                    handleClick={() => {
                                        onHandleModal();
                                    }}
                                />
                            </div>
                        </div>
                        <div class="row">
                            {/* <SearchBox
                                placeholder="Search Direct Messages"
                                className="basic-single"
                                classNamePrefix="select"
                                isSearchable={true}
                                name="color"
                                defaultValue={selectedOption}
                                onChange={setSelectedOption}
                                options={
                                    chatRoom.map(user => {
                                        return ({ value: user._id, label: user.name, avatar: user.avatar })
                                    })}
                            /> */}
                            <SearchWithList
                                placeholder="Search Direct Messages"
                                filterUsers={dmUsers}
                                onHandleChange={e => setSearch(e.target.value)}
                                onHandleSearchClick={onHandleRoomClick} />
                        </div>

                        {chatRoom.length === 0 ?
                            <MessagesBox>
                                <MessageH1>Welcome to your inbox!</MessageH1>
                                <MessageP>Drop a line, share Tweets and more with private conversations between you and others on Twitter.</MessageP>
                                <MessageButton>
                                    <Button
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
                            : null}
                    </Col>
                </MessageCol>
                <MessageCol md={5} className='p-0'>
                    <MessagesBox>
                        {channel ?
                            <Chat
                                socket={socket}
                                user={user}
                                receiverData={selectUser}
                                channel={channel}
                                messagesHistory={messagesHistory}
                                onUpdateMessageSubmit={onUpdateMessageSubmit}
                            />
                            :
                            <SelectMessage>
                                <Col>
                                    <h2>Select a message</h2>
                                    <MessageP>Choose from your existing conversations, start a new one, or just keep swimming.</MessageP>
                                    <MessageButton>
                                        <Button
                                            className=""
                                            id="tweets"
                                            name="button"
                                            type="submit"
                                            btnStyle="large-btn"
                                            label="New message"
                                            footer={false}
                                            handleClick={() => {
                                                onHandleModal();
                                            }}
                                        />
                                    </MessageButton>
                                </Col>
                            </SelectMessage>
                        }
                    </MessagesBox>
                </MessageCol>
            </Row>
            <Modal
                show={show.status}
                onHide={onHandleModalClose}
                body={<SearchWithList
                    placeholder="Search People"
                    filterUsers={filterUsers}
                    onHandleChange={e => setSearch(e.target.value)}
                    onHandleSearchClick={onHandleSearchClick} />}
                setShow={setShow}
                title="New Message"
            />
        </MessageContainer >

    );
}
export default Messages;
