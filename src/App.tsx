import Layout from "./pages/Layout";
import LoginPage from "./pages/LoginPage";
import QnAPage from "./pages/QnAPage";
// import StudentAttendancePage from "./pages/StudentAttendancePage";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
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
        {/* <Route path="/home" element={<LectureListPage />} /> */}
        <Route element={<Layout />}>
          <Route path="/:lectureId/qna" element={<QnAPage />} />
          {/* <Route path="/:lectureId/attendance" element={<StudentAttendancePage />} /> */}
          <Route path="/:lectureId/attendance/result" element={<QnAPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App
