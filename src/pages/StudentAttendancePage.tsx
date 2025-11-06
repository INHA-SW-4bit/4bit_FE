import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "@emotion/styled";
import { useAttendanceData } from "../hooks/useAttendanceData";
import fetchWithAuth from "../utils/fetchWithAuth";
import WifiStatus from "../components/studentAttendancePage/WifiStatus";
import SeatLayout from "../components/common/SeatLayout";
import type { SessionStatus } from "../types/session";

const StudentAttendancePage = () => {
  const { lectureId } = useParams();
  const { layout, attendanceData, isLoading } = useAttendanceData();
  const [connected, setConnected] = useState<boolean>(false);
  const [sessionStatus, setSessionStatus] = useState<SessionStatus | null>(
    null
  );

  useEffect(() => {
    const fetchWifiStatus = async () => {
      try {
        const response = await fetchWithAuth(
          `/api/lectures/${lectureId}/attendance/wifi/verify`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setConnected(data.valid);
      } catch (error) {
        console.error("Get Failed: ", error);
        throw error;
      }
    };
    fetchWifiStatus();
  }, [lectureId]);

  useEffect(() => {
    const fetchSessionStatus = async () => {
      try {
        const response = await fetchWithAuth(
          `/api/lectures/${lectureId}/attendance/session/status`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: SessionStatus = await response.json();
        setSessionStatus(data);
      } catch (error) {
        console.error("Get Failed: ", error);
        throw error;
      }
    };
    fetchSessionStatus();
  }, [lectureId]);

  if (isLoading) return <></>;
  if (sessionStatus === null || sessionStatus.status === "CLOSED")
    return (
      <div style={{ marginTop: "1rem", color: "#333" }}>
        출석 기간이 아닙니다.
      </div>
    );
  // if (success) {
  //   return (
  //     <div style={{ marginTop: "1rem", color: "#333" }}>
  //       출석이 완료되었습니다.
  //     </div>
  //   );
  // }

  return (
    <ContentWrap>
      <Header>출석</Header>
      <WifiStatus connected={connected} />
      <SeatLayout
        connected={connected}
        seatingStatus={{ layout: layout, attendanceData: attendanceData }}
        sessionStatus={sessionStatus}
      />
    </ContentWrap>
  );
};

export default StudentAttendancePage;

const ContentWrap = styled.article`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-top: 2rem;
  width: 100%;
`;
const Header = styled.header`
  font-size: 1.5rem;
  margin-bottom: 0.3rem;
`;
