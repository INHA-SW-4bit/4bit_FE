import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthProvider from "./providers/AuthProvider";
import Layout from "./pages/Layout";
import LoginPage from "./pages/LoginPage";
import LectureListPage from "./pages/LectureListPage";
import QnAPage from "./pages/QnAPage";
import AttendanceRolePage from "./pages/AttendanceRolePage";
import ResultPage from "./pages/ResultPage";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={<LectureListPage />} />
          <Route element={<Layout />}>
            <Route path="/:lectureId/qna" element={<QnAPage />} />
            <Route
              path="/:lectureId/attendance"
              element={<AttendanceRolePage />}
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
