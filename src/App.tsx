import { BrowserRouter, Routes, Route } from "react-router-dom";
import AttendancePage from "./pages/AttendancePage";
import LoginPage from "./pages/LoginPage";
import ResultPage from "./pages/ResultPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/attendance" element={<AttendancePage />} />
        <Route path="/result" element={<ResultPage />} />
      </Routes>
    </BrowserRouter>
  );
}
