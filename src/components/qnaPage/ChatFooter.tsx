import type { FormEvent, ChangeEvent } from "react";
import styled from "@emotion/styled";

import send from "../../assets/images/send.png";

interface ChatFooterProps {
  input: string;
  connected: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

const ChatFooter = ({
  input,
  connected,
  onChange,
  onSubmit,
}: ChatFooterProps) => {
  return (
    <Wrapper onSubmit={onSubmit}>
      <ChatInput
        type="text"
        placeholder={connected ? "메세지 입력" : "연결 중..."}
        value={input}
        onChange={onChange}
        disabled={!connected}
      />
      <Button type="submit" disabled={!connected}>
        <img src={send} style={{ width: "2rem", height: "2rem" }} />
      </Button>
    </Wrapper>
  );
};

export default ChatFooter;

const Wrapper = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.4rem;
  position: absolute;
  bottom: 1.5rem;
  left: 1.5rem;
  right: 1.5rem;
`;
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
`;
const Button = styled.button`
  width: 3rem;
  height: 3rem;
  background-color: #325694;
  border: none;
  border-radius: 0.9rem;
`;
