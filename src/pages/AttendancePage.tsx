import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import styled from "@emotion/styled";

const PageContainer = styled.div`
  min-height: 100vh;
  background-color: #f9fafb;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
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
  max-width: 48rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2rem;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  border-radius: 0.375rem;
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

export default function AttendancePage() {
  const [minute, setMinute] = useState("0");
  const [seconds, setSeconds] = useState("0");
  const navigate = useNavigate();

  const [code, setCode] = useState("");
  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  const generateRandomCode = () => {
    const newCode = Math.floor(Math.random() * 1000)
      .toString()
      .padStart(3, "0");
    setCode(newCode);
  };

  const handleGenerateCode = () => {
    if (!minute || !seconds) {
      alert("분과 초를 모두 선택해주세요.");
      return;
    }

    const totalSeconds = Number(minute) * 60 + Number(seconds);
    setTimeLeft(totalSeconds);
    generateRandomCode();

    alert(`출석 코드 생성: ${minute}분 ${seconds}초`);
  };

  const handleStopAutoAttendance = () => {
    setTimeLeft(null);
    setCode("");

    navigate("/result", { state: { code } });
  };

  useEffect(() => {
    if (timeLeft === null) return;
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev !== null ? prev - 1 : prev));
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  useEffect(() => {
    if (timeLeft === 0) {
      const resetTimer = setTimeout(() => {
        setTimeLeft(null);
        setCode("");

        navigate("/result", { state: { code } });
      }, 1000);
      return () => clearTimeout(resetTimer);
    }
  }, [timeLeft, navigate, code]);

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
