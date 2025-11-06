import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import StudentAttendancePage from "./StudentAttendancePage";
import ProfessorAttendancePage from "./ProfessorAttendancePage";

const AttendanceRolePage = () => {
  const { role } = useAuth();

  if (role === "STUDENT") {
    return <StudentAttendancePage />;
  }

  if (role === "PROFESSOR") {
    return <ProfessorAttendancePage />;
  }

  return <Navigate to="/" replace />;
};

export default AttendanceRolePage;
