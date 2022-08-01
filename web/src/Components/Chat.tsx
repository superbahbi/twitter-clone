import React, { useState, useEffect, useRef } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import IconButton from "../Components/IconButton";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import Form from "react-bootstrap/Form";
import moment from "moment";
import { Send } from "../Assets/Icon";
import { IMessageBubbleProps, IChatProps } from "../Helper/interface";
const MessageContainer = styled.div``;
const MessageHeader = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 12px;
  line-height: 16px;
  padding: 10px 10px 10px 10px;
`;
// Chat display
const ChatBox = styled.div`
  display: flex;
  position: absolute;

  float: left;
  width: 100%;
  max-width: 600px;
  max-height: calc(100vh - 58px);
  bottom: 0;

  ::-webkit-scrollbar {
    width: 0px;
  }
`;
const ChatHistory = styled.div`
  width: 100%;
  overflow-y: auto;
  margin-bottom: 53px;
  padding: 0px 8px;
`;
// Message bubble
const Message = styled.p<IMessageBubbleProps>`
  float: right;
  padding: 10px 20px 10px 20px;
  margin-bottom: 0px;
  ${(props) =>
    props.right
      ? "border-radius: 9999px 0px 0px 9999px; background-color: #71c9f8;"
      : "border-radius: 0px 9999px 9999px 0px; background-color: #eff3f4;"}
`;
// Time
const Time = styled.span`
  font-size: 12px;
  float: right;
  padding-bottom: 2px;
`;
const IncomingMsg = styled.div``;
const OutgoingMsg = styled.div`
  overflow: hidden;
`;
const SentMsg = styled.div`
  display: flex;
  flex-direction: column;
  float: right;
  margin-left: 250px;
`;
const ReceivedMsg = styled.div`
  display: inline-flex;
  flex-direction: column;
  padding: 0
  vertical-align: top;
  margin-right: 250px;
`;

// Form for sending messages
const MessageForm = styled(Form)`
  position: absolute;
  bottom: 0;
  max-width: 600px;
  background-color: #fff;
  border-right: 1px solid rgb(239, 243, 244);
`;

const FormRow = styled(Row)`
  display: flex;
  flex-wrap: nowrap;
  margin: 10px;
  width: 600px;
`;
const FormCol = styled(Col)`
  display: flex;
  align-items: center;
  height: 38px;
`;
const FormGroup = styled(Form.Group)`
  margin-bottom: 0px;
  width: 100%;
`;
const StyledFormControl = styled(Form.Control)`
  border-radius: 9999px;
  border-color: rgb(239, 243, 244);
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;
  :hover {
    border-color: #71c9f8;
    color: none;
  }
  :focus {
    outline: none !important;
    border-color: #719ece !important;
  }
`;
const SendIconButton = styled(IconButton)`
  display: flex;
  align-items: center;
  font-size: 15px;
  color: #1da1f2;
  padding: 0.5em;
`;

const Chat: React.FC<IChatProps> = ({
  receiverData,
  messagesHistory,
  onUpdateMessageSubmit,
}) => {
  const { register, handleSubmit } = useForm(); // initialise the hook
  const messagesRef = useRef<null | HTMLDivElement>(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    messagesRef.current && messagesRef.current.scrollIntoView(true);
  });
  return (
    <MessageContainer>
      <MessageHeader>
        <h5>{receiverData.name}</h5>
      </MessageHeader>
      <ChatBox>
        <ChatHistory>
          {messagesHistory.map((data, key) =>
            receiverData.name === data.user ? (
              <OutgoingMsg key={key}>
                <SentMsg>
                  <Message right>{data.body}</Message>
                </SentMsg>
                <SentMsg>
                  <Time>{moment(data.createdAt).fromNow()}</Time>
                </SentMsg>
              </OutgoingMsg>
            ) : (
              <IncomingMsg key={key}>
                <ReceivedMsg>
                  <Message>{data.body}</Message>
                </ReceivedMsg>
                <ReceivedMsg>
                  <Time>{moment(data.createdAt).fromNow()}</Time>
                </ReceivedMsg>
              </IncomingMsg>
            )
          )}
          <div ref={messagesRef} />
        </ChatHistory>
      </ChatBox>
      <MessageForm
        onSubmit={handleSubmit((data) => {
          onUpdateMessageSubmit(data);
          setMessage("");
        })}
      >
        <FormRow>
          <FormCol sm={10}>
            <FormGroup>
              <StyledFormControl
                type="text"
                id="inputMessage"
                autoComplete="off"
                placeholder="Start a message"
                name="message"
                ref={register({
                  required: true,
                })}
                onChange={(event: React.SyntheticEvent) => {
                  const target = event.target as HTMLInputElement;
                  if (!target.value) return;
                  setMessage(target.value);
                }}
                value={message}
              />
            </FormGroup>
          </FormCol>
          <FormCol>
            <SendIconButton
              type="submit"
              iconComponent={<Send />}
              color="#1da1f2"
              hoverColor="fff"
              hoverColorBackground="#fff"
            />
          </FormCol>
        </FormRow>
      </MessageForm>
    </MessageContainer>
  );
};

export default Chat;
