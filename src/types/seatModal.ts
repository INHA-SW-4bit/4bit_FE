import type { Student } from "./seat";

export interface SelectedSeatInfo {
  student?: Student;
  endTime?: string;
  row?: number;
  col?: number;
  seatNumber: number;
}

export interface ModalContentProps {
  info: SelectedSeatInfo;
  onClose: () => void;
}