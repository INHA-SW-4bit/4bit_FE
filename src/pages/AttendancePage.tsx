import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "@emotion/styled";
import fetchWithAuth from "../utils/FetchWithAuth";

export default function AttendancePage() {
  const { lectureId } = useParams<{ lectureId: string }>();
  const [minute, setMinute] = useState("0");
  const [seconds, setSeconds] = useState("0");
  const navigate = useNavigate();

  const [code, setCode] = useState("");
  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  const isEndingRef = useRef(false);

  //출석코드 생성 (CodeCreateRequestDto)
  const handleGenerateCode = async () => {
    if (!lectureId) {
      alert("lectureId가 없습니다. 강의 페이지에서 다시 시도해주세요.");
      return;
    }
    if (!minute && !seconds) {
      alert("시간을 입력해주세요.");
      return;
    }

    const totalSeconds = Number(minute) * 60 + Number(seconds);
    if (totalSeconds <= 0) {
      alert("시간은 1초 이상이어야 합니다.");
      return;
    }

    // 초 → 분 단위로 변환 (올림)
    const durationMinutes = Math.ceil(totalSeconds / 60);

    try {
      const response = await fetchWithAuth(
        `/api/lectures/${lectureId}/attendance/start`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            lectureId: Number(lectureId),
            durationMinutes: durationMinutes,
          }),
        }
      );
      if (!response.ok) {
        throw new Error(`출석 시작 실패 (HTTP ${response.status})`);
      }

      const data = await response.json();

      setCode(data.attendanceCode);
      setTimeLeft(totalSeconds);
      isEndingRef.current = false;

      alert(`출석 코드 생성 완료:${data.attendanceCode}`);
    } catch (err) {
      console.error(err);
      alert("출석 시작에 실패했습니다. 다시 시도해주세요");
    }
  };

  //출석 종료
  const handleStopAutoAttendance = async () => {
    if (!lectureId) return;
    try {
      if (isEndingRef.current) return;
      isEndingRef.current = true;

      const response = await fetchWithAuth(
        `/api/lectures/${lectureId}/attendance/end`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ lectureId: Number(lectureId) }),
        }
      );

      if (!response.ok) {
        throw new Error(`출석 종료 실패 (HTTP ${response.status})`);
      }

      const data = await response.json();
      console.log("출석 종료 응답: ", data); //{lectureId,status,endTime}

      alert(`출석 종료되었습니다 (상태 ${data.status})`);
    } catch (err) {
      console.error(err);
    } finally {
      setTimeLeft(null);
      navigate(`/${lectureId}/attendance/result`, { state: { code } });
    }
  };

  //타이머
  useEffect(() => {
    if (timeLeft === null) return;
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev !== null ? prev - 1 : prev));
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  //자동 종료
  useEffect(() => {
    if (timeLeft === 0) {
      (async () => {
        try {
          if (lectureId && !isEndingRef.current) {
            isEndingRef.current = true;
            await fetchWithAuth(`/api/lectures/${lectureId}/attendance/end`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ lectureId: Number(lectureId) }),
            });
          }
        } catch (err) {
          console.error(err);
        } finally {
          setTimeLeft(null);
          navigate(`/${lectureId}/attendance/result`, { state: { code } });
        }
      })();
    }
  }, [timeLeft, navigate, code, lectureId]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const isRunning = timeLeft !== null && timeLeft > 0;

  return (
    <PageContainer>
      <Title>출석</Title>

      <ContentBox>
        {isRunning ? (
          <CodeInfoContainer>
            <CodeDetail>
              <CodeLabel>남은시간:</CodeLabel>
              <TimeLeftValue>
                {timeLeft !== null ? formatTime(timeLeft) : "00:00"}
              </TimeLeftValue>
            </CodeDetail>

            <CodeDetail>
              <CodeLabel>인증번호:</CodeLabel>
              <CodeValue>{code}</CodeValue>
            </CodeDetail>
          </CodeInfoContainer>
        ) : (
          <InputGroup>
            <label htmlFor="minute" className="font-semibold">
              시간
            </label>
            <TimeInput
              id="minute"
              type="number"
              min="0"
              max="59"
              value={minute}
              onChange={(e) => setMinute(e.target.value)}
            />
            <span className="font-semibold">분</span>
            <TimeInput
              id="seconds"
              type="number"
              min="0"
              max="59"
              value={seconds}
              onChange={(e) => setSeconds(e.target.value)}
            />
            <span className="font-semibold">초</span>
          </InputGroup>
        )}

        {isRunning ? (
          <StopButton onClick={handleStopAutoAttendance}>
            자동 출결 종료
          </StopButton>
        ) : (
          <GenerateButton onClick={handleGenerateCode}>
            코드 생성
          </GenerateButton>
        )}
      </ContentBox>
    </PageContainer>
  );
}

const PageContainer = styled.div`
  min-height: 100vh;
  background-color: #f9fafb;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 2rem 1.5rem 0 1.5rem;
`;

const Title = styled.h1`
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 2rem;
  align-self: flex-start;
`;

const ContentBox = styled.div`
  background-color: white;
  width: 100%;
  max-width: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2rem;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  border-radius: 0.375rem;
  margin-left: 0;
`;

const CodeInfoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 2.5rem;
`;

const CodeDetail = styled.div`
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
`;

const CodeLabel = styled.span`
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
`;

const TimeLeftValue = styled.span`
  font-size: 1.25rem;
  font-weight: 600;
  color: #284876;
  font-variant-numeric: tabular-nums;
`;

const CodeValue = styled.span`
  font-size: 1.5rem;
  font-weight: 600;
  color: #8b392b;
  letter-spacing: 0.1em;
`;

const InputGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #374151;
  font-size: 1.125rem;
`;

const TimeInput = styled.input`
  width: 5rem;
  border: 1px solid #93c5fd;
  outline: none;
  border-radius: 0.375rem;
  padding: 0.25rem 0.5rem;
  text-align: center;

  &:focus {
    border-color: #2563eb;
  }
`;

const BaseButton = styled.button`
  color: white;
  padding: 0.5rem 1.5rem;
  border-radius: 0.125rem;
  font-weight: 500;
  transition: all 0.2s;
  cursor: pointer;
  border: none;

  &:active {
    transform: scale(0.98);
  }
`;

const StopButton = styled(BaseButton)`
  background-color: #c65a46;

  &:hover {
    background-color: #b14e3c;
  }
`;

const GenerateButton = styled(BaseButton)`
  background-color: #325694;

  &:hover {
    background-color: #284876;
  }
`;
