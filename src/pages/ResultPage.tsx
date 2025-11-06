import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { useParams } from "react-router-dom";
import fetchWithAuth from "../utils/fetchWithAuth";

import { useAttendanceData } from "../hooks/useAttendanceData";
import SeatLayout from "../components/common/SeatLayout";
import { useAuth } from "../contexts/AuthContext";

const PageContainer = styled.div`
  min-height: 100vh;
  background-color: #f9fafb;
  padding-top: 2.5rem;
`;

const PageTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 1.5rem;
`;

const TabContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 3rem;
  margin-bottom: 1rem;
  border-bottom: 1px solid #d1d5db;
`;

const BaseTabButton = styled.button`
  padding: 0.5rem 1.5rem;
  font-weight: 500;
  border-top-left-radius: 0.375rem;
  border-top-right-radius: 0.375rem;
  cursor: pointer;
  border: none;
  background: none;

  position: relative;
  bottom: -1px;
`;

const TabButton = styled(BaseTabButton)<{ isActive: boolean }>`
  ${(props) =>
    props.isActive
      ? css`
          background-color: #325694;
          color: white;
          border-bottom: 2px solid #325694;
        `
      : css`
          background-color: #f3f4f6;
          color: #374151;
          border-bottom: 1px solid #d1d5db;

          &:hover {
            background-color: #e5e7eb;
          }
        `}
`;

const TableContainer = styled.div`
  background-color: white;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  border-radius: 0.375rem;
  overflow: hidden;
`;

const TableTopBar = styled.div`
  height: 3px;
  background-color: #111827;
`;

const ResultTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  border: 1px solid #e5e7eb;
  font-size: 0.875rem;
`;

const TableHeader = styled.thead`
  background-color: #f3f4f6;
  color: #325694;
`;

const TableHeaderCell = styled.th<{ width?: string }>`
  padding: 0.75rem 1rem;
  text-align: center;
  border: 1px solid #e5e7eb;
  ${(props) => props.width && `width: ${props.width};`}
`;

const TableRow = styled.tr`
  border-bottom: 1px solid #e5e7eb;
  transition: background-color 0.15s ease-in-out;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: #f9fafb;
  }
`;

const TableDataCell = styled.td`
  padding: 0.75rem 1rem;
  font-size: 0.875rem;
  text-align: center;
  color: #1f2937;
  border: 1px solid #e5e7eb;
`;

const NameCell = styled(TableDataCell)`
  & > span {
    color: #325694;
    font-weight: 500;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const StudentNoCell = styled(TableDataCell)`
  font-family: monospace;
`;

const NoDataCell = styled.td`
  padding: 1.5rem 0;
  text-align: center;
  color: #9ca3af;
  font-size: 0.875rem;
  border: 1px solid #e5e7eb;
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.25rem;
  margin-top: 1.5rem;
`;

const BasePaginationButton = styled.button`
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  border: 1px solid #d1d5db;
  cursor: pointer;
  background-color: white;
  transition: all 0.15s ease-in-out;
`;

const PageButton = styled(BasePaginationButton)<{ isCurrent: boolean }>`
  border-radius: 0;

  ${(props) =>
    props.isCurrent
      ? css`
          background-color: #325694;
          color: white;
          border-color: #325694;
          z-index: 1;
        `
      : css`
          color: #374151;

          &:hover {
            background-color: #f3f4f6;
          }
        `}
`;

const NavButton = styled(BasePaginationButton)<{ isDisabled: boolean }>`
  ${(props) =>
    props.isDisabled
      ? css`
          background-color: #f3f4f6;
          color: #9ca3af;
          cursor: not-allowed;
        `
      : css`
          color: #374151;

          &:hover {
            background-color: #f3f4f6;
          }
        `}

  &:first-of-type {
    border-top-left-radius: 0.25rem;
    border-bottom-left-radius: 0.25rem;
  }

  &:last-of-type {
    border-top-right-radius: 0.25rem;
    border-bottom-right-radius: 0.25rem;
  }
`;

//타입&유틸 (표시형 변환만)
type Seat = { row: number; col: number };

type SeatStudentDetailDto = {
  id?: string;
  name: string;
  grade: string;
  studentId: string;
  department: string;
  profileImgUrl?: string;
};

type ApiAttendanceItem = {
  seat: Seat;
  student?: SeatStudentDetailDto;
};

type SeatingStatusResponse = {
  layout: ("seat" | "aisle" | "X")[][];
  attendanceData: ApiAttendanceItem[];
};

//출석자 dto
type RowShape = {
  major: string;
  grade: number;
  studentNo: string;
  name: string;
  engName: string;
};

//결석자 dto
type AbsenteeDto = {
  department: string;
  grade: number;
  studentNumber: string;
  name: string;
  englishName?: string;
};

//"12223757"->"1222****"
const maskStudentId = (id: string) =>
  id && id.length >= 4 ? `${id.slice(0, 4)}****` : id;

//"4학년" -> 4
const toGradeNumber = (g: string) => {
  const n = parseInt(g.replace(/\D/g, ""), 10);
  return Number.isNaN(n) ? 0 : n;
};

export default function ResultPage() {
  const { lectureId } = useParams<{ lectureId: string }>();
  const { role } = useAuth();

  const [activeTab, setActiveTab] = useState<"attend" | "absent">("absent");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  //서버에서 받은 출석/결석 데이터(표시형)
  const [attendRows, setAttendRows] = useState<RowShape[]>([]);
  const [absentRows, setAbsentRows] = useState<RowShape[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  //탭 변경
  const handleTabChange = (tab: "attend" | "absent") => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  //api 연동
  useEffect(() => {
    if (!lectureId) return;

    (async () => {
      try {
        setLoading(true);
        setErrorMsg(null);

        const res = await fetchWithAuth(
          `/api/lectures/${lectureId}/seating-status`,
          { method: "GET", headers: { "Content-Type": "application/json" } }
        );

        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const data: SeatingStatusResponse = await res.json();

        //출석자: attendanceData 중 student가 존재하는 항목만 표시형으로 변환
        const present: RowShape[] = (data.attendanceData || [])
          .filter((a) => a.student) //교수면 student 있음, 학생이면 seat만 올 수 있도록
          .map((a) => {
            const s = a.student!;
            return {
              major: s.department || "",
              grade: toGradeNumber(s.grade || ""),
              studentNo: maskStudentId(s.studentId || ""),
              name: s.name || "",
              engName: "", //영문명은 백엔드 스펙에 없으므로 일단 비워둠
            };
          });

        setAttendRows(present);

        const absRes = await fetchWithAuth(
          `/api/lectures/${lectureId}/attendance/absentees`,
          { method: "GET", headers: { "Content-Type": "application/json" } }
        );

        if (!absRes.ok) throw new Error(`Absentees HTTP ${absRes.status}`);

        const absentees: AbsenteeDto[] = await absRes.json();

        const absentRowsMapped: RowShape[] = (absentees || []).map((a) => ({
          major: a.department,
          grade: a.grade,
          studentNo: maskStudentId(a.studentNumber),
          name: a.name,
          engName: a.englishName ?? "",
        }));

        setAbsentRows(absentRowsMapped);
      } catch (err) {
        console.error(err);
        setErrorMsg("출석 현황을 불러오지 못했습니다.");
        //둘 중 하나라도 실패하면 빈 배열 유지
        setAttendRows((prev) => prev || []);
        setAbsentRows((prev) => prev || []);
      } finally {
        setLoading(false);
      }
    })();
  }, [lectureId]);

  //표에 넣을 데이터
  const data = activeTab === "attend" ? attendRows : absentRows;
  const totalPages = Math.max(1, Math.ceil(data.length / itemsPerPage));
  const startIdx = (currentPage - 1) * itemsPerPage;
  const endIdx = startIdx + itemsPerPage;
  const currentData = data.slice(startIdx, endIdx);
  const { layout, attendanceData, isLoading } = useAttendanceData();

  if (isLoading) return <></>;
  if (role === "STUDENT")
    return (
      <div style={{ marginTop: "1rem", color: "#333" }}>
        접근 권한이 없습니다.
      </div>
    );

  return (
    <PageContainer>
      <PageTitle>출석 결과</PageTitle>

      <SeatLayout
        seatingStatus={{ layout: layout, attendanceData: attendanceData }}
      />

      <TabContainer>
        <TabButton
          onClick={() => handleTabChange("attend")}
          isActive={activeTab === "attend"}
        >
          출석자 ({attendRows.length})
        </TabButton>
        <TabButton
          onClick={() => handleTabChange("absent")}
          isActive={activeTab === "absent"}
        >
          결석자 ({absentRows.length})
        </TabButton>
      </TabContainer>

      <TableContainer>
        <TableTopBar />

        <ResultTable>
          <TableHeader>
            <TableRow>
              <TableHeaderCell width="20%">학과(전공)</TableHeaderCell>
              <TableHeaderCell width="4rem">학년</TableHeaderCell>
              <TableHeaderCell width="8rem">학번</TableHeaderCell>
              <TableHeaderCell width="8rem">이름</TableHeaderCell>
              <TableHeaderCell width="8rem">영문명</TableHeaderCell>
            </TableRow>
          </TableHeader>

          <tbody>
            {loading ? (
              <TableRow>
                <NoDataCell colSpan={5}>불러오는 중...</NoDataCell>
              </TableRow>
            ) : errorMsg ? (
              <TableRow>
                <NoDataCell colSpan={5}>{errorMsg}</NoDataCell>
              </TableRow>
            ) : currentData.length > 0 ? (
              currentData.map((row, idx) => (
                <TableRow key={idx}>
                  <TableDataCell>{row.major}</TableDataCell>
                  <TableDataCell>{row.grade}</TableDataCell>
                  <StudentNoCell>{row.studentNo}</StudentNoCell>
                  <NameCell>
                    <span>{row.name}</span>
                  </NameCell>
                  <TableDataCell>{row.engName}</TableDataCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <NoDataCell colSpan={5}>표시할 데이터가 없습니다</NoDataCell>
              </TableRow>
            )}
          </tbody>
        </ResultTable>
      </TableContainer>

      <PaginationContainer>
        <NavButton
          onClick={() => currentPage > 1 && setCurrentPage((p) => p - 1)}
          isDisabled={currentPage === 1}
        >
          이전으로
        </NavButton>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <PageButton
            key={page}
            onClick={() => setCurrentPage(page)}
            isCurrent={currentPage === page}
          >
            {page}
          </PageButton>
        ))}

        <NavButton
          onClick={() =>
            currentPage < totalPages && setCurrentPage((p) => p + 1)
          }
          isDisabled={currentPage === totalPages}
        >
          다음
        </NavButton>
      </PaginationContainer>
    </PageContainer>
  );
}
