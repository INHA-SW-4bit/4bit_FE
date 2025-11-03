import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import fetchWithAuth from "../utils/FetchWithAuth";

type Lecture = {
  lectureId: number;
  lectureName: string;
  professorName: string;
};

export default function LectureListPage() {
  const [lectures, setLectures] = useState<Lecture[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchToken = async () => {
    try {
      setLoading(true);

      const response = await fetchWithAuth("/api/lectures/list", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`강의 목록 요청 실패 (HTTP${response.status})`);
      }

      const data = await response.json();
      //응답 예: {lectures: [{lectureId,lectureName,professorName},...]}
      setLectures(data.lectures || []);
    } catch (error) {
      console.error("강의 목록 요청 실패:", error);
      setError("강좌 목록을 불러오지 못했습니다");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchToken();
  }, []);

  return (
    <PageWrapper>
      <InnerContainer>
        <HeaderWrapper>
          <TitleText>교과 과정</TitleText>
          <DropdownButton aria-label="과정 변경">▾</DropdownButton>
          <SettingButton aria-label="설정">⚙️</SettingButton>
        </HeaderWrapper>

        <ListWrapper>
          {loading && <p style={{ padding: 12 }}>불러오는 중...</p>}
          {error && <p style={{ padding: 12, color: "crimson" }}>{error}</p>}

          {!loading &&
            !error &&
            lectures.map((lecture) => (
              <Card key={lecture.lectureId}>
                {/* `/${lecture.lectureId}/qna` */}
                <Avatar />
                <ContentArea>
                  <LectureTitle>
                    {lecture.lectureName}[{lecture.lectureId}]
                  </LectureTitle>
                  <ProfessorName>{lecture.professorName}</ProfessorName>
                </ContentArea>
              </Card>
            ))}
          {!loading && !error && lectures.length === 0 && (
            <p style={{ padding: 12 }}>강좌가 없습니다.</p>
          )}
        </ListWrapper>
      </InnerContainer>
    </PageWrapper>
  );
}

/* ================= styled components ================= */

const PageWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  background: #f4f6f7;
  display: flex;
  justify-content: center;
  padding: 40px 0;
`;
const InnerContainer = styled.div`
  width: 100%;
  max-width: 900px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 32px 36px 48px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
`;

const HeaderWrapper = styled.header`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 20px;
  position: relative;
`;

const TitleText = styled.h1`
  font-size: 28px;
  font-weight: 700;
  color: #101010;
`;

const DropdownButton = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
  padding: 4px;
  font-size: 16px;
  color: #777;
`;

const SettingButton = styled.button`
  margin-left: auto;
  width: 44px;
  height: 44px;
  border: 1px solid #ddd;
  background: #fff;
  border-radius: 4px;
  cursor: pointer;
  font-size: 20px;
  display: grid;
  place-items: center;

  &:hover {
    background: #f2f4f5;
  }
`;

const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Card = styled.article`
  display: flex;
  align-items: center;
  gap: 16px;
  background: #ffffff;
  border: 1px solid #dcdcdc;
  border-radius: 6px;
  padding: 20px 28px;
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.02);
  cursor: pointer;
  transition: border-color 0.2s ease, background 0.2s ease;
  &:hover {
    border-color: #bfbfbf;
    background: #fafafa;
  }
`;

const Avatar = styled.div`
  width: 68px;
  height: 68px;
  background: radial-gradient(circle, #f6f6f6 0%, #dcdcdc 60%, #f6f6f6 100%);
  border-radius: 50%;
  flex-shrink: 0;
`;

const ContentArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const BadgeRow = styled.div`
  display: flex;
  align-items: flex-end;
`;

const TypeBadge = styled.div`
  background: #4c9fa6;
  color: #ffffff;
  font-weight: 600;
  padding: 7px 22px 6px;
  border-top-left-radius: 2px;
  border-top-right-radius: 2px;
  font-size: 14px;
`;

const LevelBadge = styled.div`
  border: 2px solid #4c9fa6;
  color: #208393;
  padding: 5px 28px 6px;
  font-weight: 600;
  background: #ffffff;
  font-size: 14px;
  margin-top: -1px;
`;

const LectureTitle = styled.h2`
  font-size: 18px;
  font-weight: 700;
  color: #000;
  line-height: 1.3;
  display: flex;
  align-items: center;
  gap: 8px;
`;
const NewBadge = styled.span`
  color: red;
  font-size: 13px;
  font-weight: 700;
`;
const ProfessorName = styled.p`
  font-size: 14px;
  color: #999;
`;
