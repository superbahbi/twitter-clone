import React, { useState, useEffect, useRef } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "../Components/Button";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import Form from "react-bootstrap/Form";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import socketIOClient from "socket.io-client";
const ENDPOINT = process.env.REACT_APP_API_URL;

const MessageHeader = styled.div`
    display: flex;
    flex-direction: row;
    font-size: 12px;
    line-height: 16px;
    padding: 10px 10px 10px 10px;
    `;
const MessageArea = styled.div`
    padding-left: 30px;
`;
// Chat display
const ChatBox = styled.div`
    float: left;
    width: 100%
`;
const ChatHistory = styled.div`
    max-height: 90vh;
    overflow-y: scroll;
`;
// Message bubble
const Message = styled.p`
    padding: 10px 20px 10px 20px;
    margin-bottom: 0px;
    ${props => props.right ? "border-radius: 9999px 9999px 0px 9999px; background-color: #71c9f8;" : "border-radius: 9999px 9999px 9999px 0px; background-color: #eff3f4;"}
`;
const IncomingMsg = styled.div`
`;
const OutgoingMsg = styled.div`
    overflow:hidden; 
`;
const SentMsg = styled.div`
    float: right;
    margin-left: 20px
`;
const ReceivedMsg = styled.div`
    display: inline-block;
    padding: 0 0 0 0;
    vertical-align: top;
    // width: 92%;
`;
// Time
const Time = styled.span`
font-size: 12px;
`;
// Form for sending messages
const MessageForm = styled(Form)`
    position: absolute;
    bottom: 0;
    width: 100%;
`;

const FormRow = styled(Row)`
    display: flex;
    flex-wrap: nowrap;
    margin: 10px;
`;
const FormCol = styled(Col)`
    padding-top: 10px;;
`;
const FormGroup = styled(Form.Group)`
    margin-bottom: 0px;
`;
const StyledFormControl = styled(Form.Control)`
    border-radius: 9999px;
    border-color: rgb(239, 243, 244);
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    box-shadow: none;
    align-items: center;
    :hover {
        border-color: #71c9f8;
        color: none;
      }
    :focus {
        outline: none !important;
        border-color: #719ECE !important;
    
    }
`;
const Chat = ({ user, receiverData }) => {
    const { register, handleSubmit } = useForm(); // initialise the hook
    const messagesRef = useRef(null)
    const [response, setResponse] = useState("");
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const socket = socketIOClient(ENDPOINT);

    const scrollToBottom = () => {
        messagesRef.current.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "start"
        });
    }
    const onSubmit = (msg, e) => {
        // if (!message) return;
        e.preventDefault();
        const data = {
            id: uuidv4(),
            channel: "channel1",
            user: receiverData.name,
            body: msg.message,
            time: Date.now(),
        };
        // setMessages((messages) => [...messages, data]);
        socket.emit('chat', data);
        setMessage("");

    };
    useEffect(() => {

        socket.on("FromAPI", data => {
            setResponse(data);
        });
        socket.on('updatechat', function (msg) {

            setMessages(messages => [...messages, msg]);
            scrollToBottom();
        });

        return () => socket.disconnect();
    }, [response, messages]);
    useEffect(() => {
        scrollToBottom();
    }, [])
    return (
        <>
            <MessageArea>
                <MessageHeader>
                    <h5>{receiverData.name}</h5>
                    <p><time dateTime={response}>{response}</time></p>
                </MessageHeader>
                <ChatBox>
                    <ChatHistory>
                        {messages.map((data, key) => (
                            receiverData.name === data.user ?
                                <OutgoingMsg key={key}>
                                    <SentMsg>
                                        <Message right>{data.body}</Message>
                                        <Time>{moment(data.time).fromNow()}</Time>
                                    </SentMsg>
                                </OutgoingMsg> :
                                <IncomingMsg key={key}>
                                    <ReceivedMsg>
                                        <Message>{data.body}</Message>
                                        <Time>{moment(data.time).fromNow()}</Time>
                                    </ReceivedMsg>
                                </IncomingMsg>
                        ))}
                        <div ref={messagesRef} />
                    </ChatHistory>
                </ChatBox>
            </MessageArea>
            <MessageForm onSubmit={handleSubmit(onSubmit)}>
                <FormRow>
                    <FormCol sm={10}>
                        <FormGroup>
                            <StyledFormControl
                                type="text"
                                id="inputMessage"
                                placeholder="Start a message"
                                name="message"
                                ref={register({
                                    required: true
                                })}
                                onChange={event => setMessage(event.target.value)}
                                value={message}
                            />
                        </FormGroup>
                    </FormCol>
                    <FormCol sm={2}>
                        <Button
                            btnStyle="input-tweet-icon"
                            icon="paper-plane"
                            type="submit"
                        />
                    </FormCol>
                </FormRow>
            </MessageForm>
        </>
    );
}

export default Chat;