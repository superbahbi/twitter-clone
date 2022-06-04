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
const MessagesBox = styled.div`
    display: flex;
    flex-direction: column; 
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
    padding-right: 10px;
`;
const SelectMessage = styled.div`
display: flex;
    height: 100vh;
    align-items: center;
    padding-left: 50px;
    padding-right: 60px;
`;
const ListGroupItemMessage = styled(ListGroupItem)`
    padding; 0px;
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
    const [selectMessage, setSelectMessage] = useState({});
    const [filterUsers, setFilterUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [show, setShow] = useState({ status: false, id: "" });
    const [channel, setChannel] = useState("");
    const [socket, setSocket] = useState(null)

    const isDesktopOrLaptop = useMediaQuery({
        query: "(min-device-width: 1224px)"
    });
    useEffect(() => {
        const newSocket = socketIOClient(ENDPOINT);
        setSocket(newSocket);
        // if (roomid) {
        //     setChannel(roomid);
        //     newSocket.emit("join", roomid);
        // }
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
                        setSelectMessage(data[0])
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
            .then(data => setAllUser(data))
            .catch(error => {
                console.log(error);
            });
        return function () {
            console.log("Messages data unmounting...");
            controller.abort();
        };
    }, []);

    let temp = [];
    useEffect(() => {
        allUser.map(user => {
            if (String(user.profile.name).toLowerCase().includes(search.toLowerCase())) {
                temp.push(user);
            }
        })
        setFilterUsers(temp);
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
            status: false,
            id: null
        });

    }
    const onHandleSearchClick = async (receiverData) => {
        // const url = process.env.REACT_APP_API_URL + "/api/createChatRoom";
        // const data = {
        //     _id: user._id + "-" + receiverData._id,
        //     senderID: user._id,
        //     receiverID: receiverData._id,
        //     name: receiverData.profile.name,
        //     avatar: receiverData.profile.avatar.filename
        // }
        // const createChatRoom = await fetch(url, {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/x-www-form-urlencoded",
        //         Authorization: "Bearer " + auth.data.token
        //     },
        //     body: formurlencoded(data)
        // });
        // await createChatRoom.json();
        // if (createChatRoom.status === 200) {
        //     setSelectMessage(receiverData)
        //     setChatRoom(prev => [...prev, data])
        //     onHandleModalClose()
        //     setChannel(data._id);
        //     socket.emit("join", data._id);
        //     history.push("/messages/" + data._id);
        //     console.log("Chat room created");
        // }

        const data = {
            _id: user._id + "-" + receiverData._id,
            sender: user,
            receiver: receiverData,
        }
        socket.emit("join", data);

        onHandleModalClose()
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
                <MessageCol md={3} className='pr-0'>
                    <Col>
                        <MessageHeader>
                            <h5>Messages</h5>
                        </MessageHeader>
                        {chatRoom.length > 0 ?
                            <>
                                <SearchBox
                                    placeholder="Search Direct Messages"
                                    className="basic-single"
                                    classNamePrefix="select"
                                    isSearchable={true}
                                    name="color"
                                    defaultValue={selectedOption}
                                    onChange={setSelectedOption}
                                // options={
                                //     allUser.map(user => {
                                //         return ({ value: user._id, label: user.profile.name, avatar: user.profile.avatar.filename })
                                //     })}
                                />
                                <ListGroup>
                                    {chatRoom.map((room, key) => {
                                        return <ListGroupItemMessage key={key} style={{ cursor: "pointer" }} onClick={() => {
                                            setChannel(room._id);
                                            socket.emit("join", { _id: room._id });
                                            history.push("/messages/" + room._id);
                                        }}>
                                            <Row name={room._id}>
                                                <Col xs={4} className="p-0">
                                                    <Avatar name={room.name} src={room.avatar} nohref={true} />
                                                </Col>
                                                <Col className="p-0" style={{ "margin": "auto" }}>
                                                    <span className="">
                                                        {room.name}
                                                    </span>
                                                </Col>
                                            </Row>

                                        </ListGroupItemMessage>
                                    })}

                                </ListGroup>
                            </>
                            :
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
                        }
                    </Col>
                </MessageCol>
                <MessageCol md={5} className='p-0'>
                    <MessagesBox>
                        {channel ?
                            <Chat socket={socket} user={user} receiverData={selectMessage} chatData="" />
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
