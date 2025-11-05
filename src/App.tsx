import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthProvider from "./providers/AuthProvider";
import Layout from "./pages/Layout";
import LoginPage from "./pages/LoginPage";
import LectureListPage from "./pages/LectureListPage";
import QnAPage from "./pages/QnAPage";
import AttendancePage from "./pages/AttendancePage";
import ResultPage from "./pages/ResultPage";

// import StudentAttendancePage from "./pages/StudentAttendancePage";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/*
          / -> login
          /home -> 강의 목록
          /:lectureId/attendance -> 강의 출석
          /:lectureId/attendance/result -> 강의 출석 결과
          /:lectureId/qna -> QnA 화면
        */}
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={<LectureListPage />} />
          <Route element={<Layout />}>
            <Route path="/:lectureId/qna" element={<QnAPage />} />
            {/* <Route path="/:lectureId/attendance" element={<StudentAttendancePage />} /> */}
            <Route
              path="/:lectureId/attendance/professor"
              element={<AttendancePage />}
            />
            <Route
              path="/:lectureId/attendance/result"
              element={<ResultPage />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
