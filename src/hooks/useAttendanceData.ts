import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import fetchWithAuth from "../utils/fetchWithAuth";
import type { AttendanceData, SeatingStatus } from "../types/seat";

export const useAttendanceData = () => {
  const { lectureId } = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [layout, setLayout] = useState<string[][]>([]);
  const [attendanceData, setAttendanceData] = useState<AttendanceData[]>([]);

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
        console.log("attendanceDataFetch", data.attendanceData);
        setAttendanceData(data.attendanceData);
      } catch (error) {
        console.error("Get Failed: ", error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    };
    fetchSeatingStatus();
  }, [lectureId]);

  return { layout, attendanceData, isLoading };
}