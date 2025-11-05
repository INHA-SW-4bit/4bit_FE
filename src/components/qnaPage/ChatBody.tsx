import { useEffect, useLayoutEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import styled from "@emotion/styled";
import formatTime from "../../utils/foramtTime";
import { displayTime, displayName } from "../../utils/chatutils";
import type { Message } from "../../types/message";

interface ChatBodyProps {
  hasMore: boolean;
  messages: Message[];
  fetchPrevMessages: (value: string) => void;
}

const ChatBody = ({ hasMore, messages, fetchPrevMessages }: ChatBodyProps) => {
  const endRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const prevScrollHeightRef = useRef<number>(0);
  const [topRef, inView] = useInView();

  useLayoutEffect(() => {
    if (bodyRef.current && prevScrollHeightRef.current > 0) {
      bodyRef.current.scrollTop =
        bodyRef.current.scrollHeight - prevScrollHeightRef.current;
      prevScrollHeightRef.current = 0;
    } else {
      endRef.current?.scrollIntoView({ behavior: "auto" });
    }
  }, [messages]);

  useEffect(() => {
    if (inView && hasMore && messages.length > 0) {
      if (bodyRef.current) {
        prevScrollHeightRef.current = bodyRef.current.scrollHeight;
      }
      const time = messages[0].createdAt;
      fetchPrevMessages(time);
    }
  }, [inView]);

  return (
    <Wrapper ref={bodyRef}>
      <div ref={topRef} />
      {messages.map((message, idx) => {
        return (
          <MessageContainer key={message.messageId} isMe={message.mine}>
            <Name isVisible={displayName(idx, messages)}>
              {message.senderName}
            </Name>
            <MessageBody isMe={message.mine}>
              <SpeechBubble isMe={message.mine}>{message.content}</SpeechBubble>
              <SendTime isVisible={displayTime(idx, messages)}>
                {formatTime(message.createdAt)}
              </SendTime>
            </MessageBody>
          </MessageContainer>
        );
      })}
      <div ref={endRef} />
    </Wrapper>
  );
};

export default ChatBody;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  height: 85%;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;
const MessageContainer = styled.article<{ isMe: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  align-items: ${(props) => (props.isMe ? "end" : "start")};
`;
const Name = styled.p<{ isVisible: boolean }>`
  display: ${(props) => (props.isVisible ? "inherit" : "none")};
  font-size: 0.8rem;
  color: #333;
`;
const MessageBody = styled.div<{ isMe: boolean }>`
  display: flex;
  flex-direction: ${(props) => (props.isMe ? "row-reverse" : "row")};
  align-items: end;
  gap: 0.2rem;
`;
const SpeechBubble = styled.div<{ isMe: boolean }>`
  max-width: 80%;
  padding: 0.6rem 0.7rem;
  background-color: ${(props) => (props.isMe ? "#325694" : "#EFEFEF")};
  border-radius: 1rem;
  font-size: 0.8rem;
  color: ${(props) => (props.isMe ? "#FFFFFF" : "#333")};
  word-break: break-all;
`;
const SendTime = styled.span<{ isVisible: boolean }>`
  visibility: ${(props) => (props.isVisible ? "visible" : "hidden")};
  font-size: 0.5rem;
  color: #333;
`;
