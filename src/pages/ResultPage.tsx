import { useState } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

const PageContainer = styled.div`
  min-height: 100vh;
  background-color: #f9fafb;
  padding: 2.5rem 2rem;
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

export default function ResultPage() {
  const AttendanceData = [
    {
      major: "컴퓨터공학과",
      grade: 4,
      studentNo: "1222****",
      name: "손하은",
      engName: "Son Ha Eun",
    },
    {
      major: "컴퓨터공학과",
      grade: 2,
      studentNo: "1224****",
      name: "민채원",
      engName: "Min Chae Won",
    },
    {
      major: "컴퓨터공학과",
      grade: 1,
      studentNo: "1225****",
      name: "개똥이",
      engName: "Gae Ddong e",
    },
    {
      major: "컴퓨터공학과",
      grade: 3,
      studentNo: "1226****",
      name: "밀플랜비",
      engName: "Meal Plan B",
    },
    {
      major: "컴퓨터공학과",
      grade: 4,
      studentNo: "1227****",
      name: "자고싶다",
      engName: "Ja Go Sip Da",
    },
    {
      major: "컴퓨터공학과",
      grade: 1,
      studentNo: "1228****",
      name: "홍길동",
      engName: "Hong Gil Dong",
    },
  ];

  const absenceData = [
    {
      major: "컴퓨터공학과",
      grade: 3,
      studentNo: "1222****",
      name: "김영신",
      engName: "Kim Yeong Sin",
    },
    {
      major: "컴퓨터공학과",
      grade: 2,
      studentNo: "1222****",
      name: "오민기",
      engName: "Oh Min Gi",
    },
    {
      major: "컴퓨터공학과",
      grade: 2,
      studentNo: "1224****",
      name: "땅울림",
      engName: "Landvibe",
    },
    {
      major: "컴퓨터공학과",
      grade: 2,
      studentNo: "1222****",
      name: "ㅇㅇㅇ",
      engName: "OOO",
    },
  ];

  const [activeTab, setActiveTab] = useState<"attend" | "absent">("absent");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const data = activeTab === "attend" ? AttendanceData : absenceData;
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const endIdx = startIdx + itemsPerPage;
  const currentData = data.slice(startIdx, endIdx);

  const handleTabChange = (tab: "attend" | "absent") => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  return (
    <PageContainer>
      <PageTitle>출석 결과</PageTitle>

      <TabContainer>
        <TabButton
          onClick={() => handleTabChange("attend")}
          isActive={activeTab === "attend"}
        >
          출석자 ({AttendanceData.length})
        </TabButton>
        <TabButton
          onClick={() => handleTabChange("absent")}
          isActive={activeTab === "absent"}
        >
          결석자 ({absenceData.length})
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
            {currentData.length > 0 ? (
              currentData.map((row, idx) => (
                <TableRow key={idx}>
                  <TableDataCell>{row.major}</TableDataCell>
                  <TableDataCell>{row.grade}</TableDataCell>
                  <StudentNoCell>{row.studentNo}</StudentNoCell>{" "}
                  <NameCell>
                    {" "}
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
