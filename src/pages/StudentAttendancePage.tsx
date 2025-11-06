import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "@emotion/styled";
import { useAttendanceData } from "../hooks/useAttendanceData";
import fetchWithAuth from "../utils/fetchWithAuth";
import WifiStatus from "../components/studentAttendancePage/WifiStatus";
import SeatLayout from "../components/common/SeatLayout";

const StudentAttendancePage = () => {
  const { lectureId } = useParams();
  const { layout, attendanceData, isLoading } = useAttendanceData();
  const [connected, setConnected] = useState<boolean>(false);

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
    console.log("layout", layout);
  }, [layout]);
  useEffect(() => {
    console.log("attendanceData", attendanceData);
  }, [attendanceData]);

  if (isLoading) return <></>;

  return (
    <ContentWrap>
      <Header>출석</Header>
      <WifiStatus connected={connected} />
      <SeatLayout
        seatingStatus={{ layout: layout, attendanceData: attendanceData }}
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
