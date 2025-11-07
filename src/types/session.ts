export interface SessionStatus {
  status: "ACTIVE" | "CLOSED";
  endTime: string;
  attendanceStatus: "ABSENT" | "ATTENDED";
}