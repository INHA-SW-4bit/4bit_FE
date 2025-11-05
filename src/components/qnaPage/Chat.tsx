import {
  useEffect,
  useState,
  useRef,
  type FormEvent,
  type ChangeEvent,
} from "react";
import { useParams } from "react-router-dom";
import styled from "@emotion/styled";

import ChatBody from "./ChatBody";
import ChatFooter from "./ChatFooter";
import fetchWithAuth from "../../utils/fetchWithAuth";
import type { Message, PrevMessages } from "../../types/message";

const Chat = () => {
  const { lectureId } = useParams();

  const [connected, setConnected] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [input, setInput] = useState<string>("");

  const webSocketRef = useRef<WebSocket | null>(null);
  const reconnectAttemptsRef = useRef<number>(0);
  const reconnectTimerRef = useRef<number | null>(null);

  const MAX_RECONNECT_ATTEMPTS = 5;
  const MAX_RECONNECT_INTERVAL = 30000;

  const token = localStorage.getItem("accessToken");

  // 채팅 내역 불러오기
  const fetchPrevMessages = async (value: string) => {
    try {
      const response = await fetchWithAuth(
        value === ""
          ? `/api/lectures/${lectureId}/chat/messages`
          : `/api/lectures/${lectureId}/chat/messages?cursor=${value}&size=20`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: PrevMessages = await response.json();

      if (data.messages.length < 20) {
        setHasMore(false);
      }

      if (value === "") {
        setMessages(data.messages);
      } else {
        setMessages((prev) => [...data.messages, ...prev]);
      }
    } catch (error) {
      console.error("Get Failed: ", error);
      throw error;
    }
  };

  useEffect(() => {
    fetchPrevMessages("");
  }, []);

  // 소켓 연결
  useEffect(() => {
    const connect = () => {
      // 중복 연결 시도 방지
      if (
        webSocketRef.current &&
        webSocketRef.current.readyState === WebSocket.OPEN
      ) {
        return;
      }

      // 토큰 / 강의 id 없을 시 연결 시도 방지
      if (!token || !lectureId) return;

      const webSocket = new WebSocket(
        `ws://localhost:8080/ws/chat?token=${encodeURIComponent(
          token
        )}&lectureId=${lectureId}`
      );
      webSocketRef.current = webSocket;

      webSocket.onopen = () => {
        setConnected(true);

        reconnectAttemptsRef.current = 0; // 재연결 시도 횟수 초기화
        if (reconnectTimerRef.current) {
          clearTimeout(reconnectTimerRef.current);
        }
        reconnectTimerRef.current = null;
      };

      webSocket.onmessage = (event: MessageEvent) => {
        try {
          const data = JSON.parse(event.data) as Message;
          setMessages((prev) => [...prev, data]);
        } catch (error) {
          console.warn("Received non-JSON message: ", event.data, error);
        }
      };

      webSocket.onerror = (error: Event) => {
        console.error("WebSocket Error: ", error);
      };

      webSocket.onclose = (event: CloseEvent) => {
        setConnected(false);

        if (event.code !== 1000) {
          console.warn("WebSocket closed abnormally.");

          if (reconnectAttemptsRef.current < MAX_RECONNECT_ATTEMPTS) {
            reconnectAttemptsRef.current += 1;

            const delay = Math.min(
              1000 * 2 ** reconnectAttemptsRef.current,
              MAX_RECONNECT_INTERVAL
            );

            reconnectTimerRef.current = setTimeout(() => {
              connect();
            }, delay);
          } else {
            console.error("Max reconnection attempts reached.");
          }
        }
      };
    };
    connect();

    return () => {
      if (reconnectTimerRef.current) {
        clearTimeout(reconnectTimerRef.current);
        reconnectTimerRef.current = null;
      }

      if (webSocketRef.current) {
        webSocketRef.current.close(1000);
        webSocketRef.current = null;
      }
    };
  }, [lectureId, token]);

  const inputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const sendMessage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      !input.trim() ||
      !webSocketRef.current ||
      webSocketRef.current.readyState !== WebSocket.OPEN
    )
      return;

    webSocketRef.current.send(JSON.stringify({ lectureId, content: input }));
    setInput("");
  };

  return (
    <Wrapper>
      <ChatBody
        hasMore={hasMore}
        messages={messages}
        fetchPrevMessages={fetchPrevMessages}
      />
      <ChatFooter
        input={input}
        connected={connected}
        onChange={inputChangeHandler}
        onSubmit={sendMessage}
      />
    </Wrapper>
  );
};

export default Chat;

const Wrapper = styled.section`
  position: relative;
  width: 100%;
  height: 70dvh;
  padding: 1.5rem;
  background-color: #ffffff;
`;
