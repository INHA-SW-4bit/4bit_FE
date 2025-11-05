import formatTime from "./foramtTime";
import type { Message } from "../types/message";
import type { Role } from "../contexts/AuthContext";

export const displayTime = (curIdx: number, messages: Message[]): boolean => {
  const curSender = messages[curIdx].senderLoginId;
  const curSendAt = formatTime(messages[curIdx].createdAt);
  let display = true;

  if (curIdx !== messages.length - 1) {
    const nextSender = messages[curIdx + 1].senderLoginId;
    const nextSendAt = formatTime(messages[curIdx + 1].createdAt);

    if (nextSender === curSender && nextSendAt === curSendAt) {
      display = false;
    }
  }

  return display;
}

export const displayName = (curIdx: number, messages: Message[], role: Role | null): boolean => {
  if (role === "PROFESSOR" && messages[curIdx].mine) {
    return false;
  }

  const curSender = messages[curIdx].senderLoginId;
  const curSendAt = formatTime(messages[curIdx].createdAt);
  let display = true;

  if (curIdx > 0) {
    const prevSender = messages[curIdx - 1].senderLoginId;
    const prevSendAt = formatTime(messages[curIdx - 1].createdAt);

    if (prevSender === curSender && curSendAt === prevSendAt) {
      display = false;
    }
  }

  return display;
}