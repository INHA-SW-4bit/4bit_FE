import styled from "@emotion/styled";

import send from "../../assets/images/send.png";

const Wrapper = styled.section`
  position: relative;
  width: 100%;
  height: 70dvh;
  padding: 1.5rem;
  background-color: #FFFFFF;
`
const ChatBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  height: 85%;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`
const Message = styled.article<{ isMe: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  align-items: ${(props) => props.isMe ? "end" : "start"};
`
// const Name = styled.p<{ isMe: boolean }>`
//   display: ${(props) => props.isMe ? "none" : "inherit"};
//   font-size: 0.9rem;
// `
const Name = styled.p` 
  font-size: 0.8rem;
  color: #333;
`
const MessageBody = styled.div<{ isMe: boolean }>`
  display: flex;
  flex-direction: ${(props) => props.isMe ? "row-reverse" : "row"};
  align-items: end;
  gap: 0.2rem;
`
const SpeechBubble = styled.div<{ isMe: boolean }>`
  max-width: 80%;
  padding: 0.6rem 0.7rem;
  background-color: ${(props) => props.isMe ? "#325694" : "#EFEFEF"};
  border-radius: 1rem;
  font-size: 0.8rem;
  color: ${(props) => props.isMe ? "#FFFFFF" : "#333"};
  word-break: break-all;
`
const SendTime = styled.span`
  font-size: 0.5rem;
  color: #333;
`


const ChatFooter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.4rem;
  position: absolute;
  bottom: 1.5rem;
  left: 1.5rem;
  right: 1.5rem;
`
const ChatInput = styled.input`
  width: 60%;
  height: 3rem;
  padding: 0.8rem;
  border: 1px solid #325694;
  border-radius: 0.9rem;

  &:focus {
    outline: none;
  }
  &::placeholder {
    color: #a5a5a5;
  }
`
const Button = styled.button`
  width: 3rem;
  height: 3rem;
  background-color: #325694;
  border: none;
  border-radius: 0.9rem;
`

const Chat = () => {
  return (
    <Wrapper>
      <ChatBody>
        <Message isMe={false}>
          <Name>익명1</Name>
          <MessageBody isMe={false}>
            <SpeechBubble isMe={false}>으아아</SpeechBubble>
            <SendTime>오후 3:17</SendTime>
          </MessageBody>
        </Message>

        <Message isMe={false}>
          <Name>익명1</Name>
          <MessageBody isMe={false}>
            <SpeechBubble isMe={false}>으아아</SpeechBubble>
            <SendTime>오후 3:17</SendTime>
          </MessageBody>
        </Message>

        <Message isMe={true}>
          <Name>익명2</Name>
          <MessageBody isMe={true}>
            <SpeechBubble isMe={true}>으아아</SpeechBubble>
            <SendTime>오후 3:17</SendTime>
          </MessageBody>
        </Message>
        <Message isMe={true}>
          <Name>익명2</Name>
          <MessageBody isMe={true}>
            <SpeechBubble isMe={true}>으아아</SpeechBubble>
            <SendTime>오후 3:17</SendTime>
          </MessageBody>
        </Message>
        <Message isMe={true}>
          <Name>익명2</Name>
          <MessageBody isMe={true}>
            <SpeechBubble isMe={true}>으아아</SpeechBubble>
            <SendTime>오후 3:17</SendTime>
          </MessageBody>
        </Message>
        <Message isMe={true}>
          <Name>익명2</Name>
          <MessageBody isMe={true}>
            <SpeechBubble isMe={true}>으아아</SpeechBubble>
            <SendTime>오후 3:17</SendTime>
          </MessageBody>
        </Message>
        <Message isMe={true}>
          <Name>익명2</Name>
          <MessageBody isMe={true}>
            <SpeechBubble isMe={true}>으아아</SpeechBubble>
            <SendTime>오후 3:17</SendTime>
          </MessageBody>
        </Message>
        <Message isMe={true}>
          <Name>익명2</Name>
          <MessageBody isMe={true}>
            <SpeechBubble isMe={true}>으아아</SpeechBubble>
            <SendTime>오후 3:17</SendTime>
          </MessageBody>
        </Message>
      </ChatBody>

      <ChatFooter>
        <ChatInput type="text" placeholder="메세지 입력" />
        <Button type="button">
          <img src={send} style={{ width: "2rem", height: "2rem" }} />
        </Button>
      </ChatFooter>
    </Wrapper>
  );
};

export default Chat;