interface Seat {
  row: number;
  col: number;
}

export interface Student {
  name: string;
  studentId: string;
  grade: number;
  profileImageUrl: string;
  department: string;
}

export interface AttendanceData {
  seat: Seat;
  student: Student;
}

export interface SeatingStatus {
  layout: string[][];
  attendanceData: AttendanceData[];
}