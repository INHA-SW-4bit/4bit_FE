interface Seat {
  row: number;
  col: number;
}

interface Student {
  name: string;
  studentId: string;
  department: string;
  grade: number;
  profileImageUrl: string;
}

export interface AttendanceData {
  seat: Seat;
  student: Student;
}

export interface SeatingStatus {
  layout: string[][];
  attendanceData: AttendanceData[];
}