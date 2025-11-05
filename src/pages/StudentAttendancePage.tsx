import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "@emotion/styled";
import fetchWithAuth from "../utils/fetchWithAuth";
import WifiStatus from "../components/studentAttendancePage/WifiStatus";
import type { AttendanceData, SeatingStatus } from "../types/seat";

const StudentAttendancePage = () => {
  const { lectureId } = useParams();
  const [connected, setConnected] = useState<boolean>(false);
  const [layout, setLayout] = useState<string[][] | null>(null);
  const [attendanceData, setAttendanceData] = useState<AttendanceData | null>(
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
    const fetchSeatingStatus = async () => {
      try {
        const response = await fetchWithAuth(
          `/api/lectures/${lectureId}/attendance/status`,
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

        const data: SeatingStatus = await response.json();
        setLayout(data.layout);
        setAttendanceData(data.attendanceData);
      } catch (error) {
        console.error("Get Failed: ", error);
        throw error;
      }
    };
    fetchSeatingStatus();
  }, [lectureId]);

  return (
    <ContentWrap>
      <Header>출석</Header>
      <WifiStatus connected={connected} />
    </ContentWrap>
  );
};

export default StudentAttendancePage;

const ContentWrap = styled.article`
  display: flex;
  flex-direction: column;
  padding-top: 2rem;
`;
const Header = styled.header`
  font-size: 1.5rem;
  margin-bottom: 1.3rem;
`;
