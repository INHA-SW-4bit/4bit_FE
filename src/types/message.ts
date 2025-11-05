export interface Message {
  // lectureId: number;
  messageId: string;
  senderName: string;
  senderLoginId: string;
  // role: string;
  content: string;
  createdAt: string;
  mine: boolean;
}

export interface PrevMessages {
  lecutreId: string;
  messages: Message[];
}