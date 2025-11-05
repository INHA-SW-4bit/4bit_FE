import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "@emotion/styled";
import fetchWithAuth from "../utils/fetchWithAuth";
import WifiStatus from "../components/studentAttendancePage/WifiStatus";
import SeatLayout from "../components/common/SeatLayout";
import type { AttendanceData, SeatingStatus } from "../types/seat";

const StudentAttendancePage = () => {
  const { lectureId } = useParams();
  const [connected, setConnected] = useState<boolean>(false);
  const [layout, setLayout] = useState<string[][] | null>(null);
  const [attendanceData, setAttendanceData] = useState<AttendanceData[] | null>(
    null
  );

  const tmpData = [
    {
      seat: {
        row: 1,
        col: 1,
      },
      student: {
        name: "손하은",
        studentId: "12223749",
        department: "컴퓨터공학과",
        grade: 4,
        profileImageUrl: "",
      },
    },
    {
      seat: {
        row: 3,
        col: 11,
      },
      student: {
        name: "장항준",
        studentId: "12203827",
        department: "기계공학과",
        grade: 4,
        profileImageUrl: "",
      },
    },
    {
      seat: {
        row: 0,
        col: 5,
      },
      student: {
        name: "한채림",
        studentId: "12243822",
        department: "데이터사이언스학과",
        grade: 2,
        profileImageUrl: "",
      },
    },
    {
      seat: {
        row: 2,
        col: 3,
      },
      student: {
        name: "이용준",
        studentId: "12252903",
        department: "사회인프라공학과",
        grade: 1,
        profileImageUrl: "",
      },
    },
  ];

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
        // setAttendanceData(data.attendanceData);
        setAttendanceData(tmpData);
      } catch (error) {
        console.error("Get Failed: ", error);
        throw error;
      }
    };
    fetchSeatingStatus();
  }, [lectureId]);

  useEffect(() => {
    console.log("layout", layout);
  }, [layout]);
  useEffect(() => {
    console.log("attendanceData", attendanceData);
  }, [attendanceData]);

  return (
    <ContentWrap>
      <Header>출석</Header>
      <WifiStatus connected={connected} />
      <SeatLayout layout={layout} />
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
