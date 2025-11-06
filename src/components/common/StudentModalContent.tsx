import styled from "@emotion/styled";
import type { ModalContentProps } from "../../types/seatModal";
import { useState, type ChangeEvent, type FormEvent } from "react";
import fetchWithAuth from "../../utils/fetchWithAuth";
import { useParams } from "react-router-dom";

const StudentModalContent = ({ info, onClose }: ModalContentProps) => {
  const { lecutreId } = useParams();
  const [code, setCode] = useState<string>("");

  const attendanceData = {
    rowNumber: info.row,
    colNumber: info.col,
    attendanceCod: code,
  };

  const fetchCodeSubmit = async () => {
    try {
      const response = await fetchWithAuth(
        `/api/lectures/${lecutreId}/attendance/check`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(attendanceData),
        }
      );

      if (!response.ok) {
        throw new Error("출석 요청 실패");
      }

      const data = await response.json();
      console.log("응답값", data);
    } catch (error) {
      console.error("출석 요청 실패:", error);
    }
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!code.trim()) return;

    const codeNum = Number(code.trim());
    console.log(codeNum);

    fetchCodeSubmit();
    setCode("");
    onClose();
  };
  const inputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setCode(event.target.value);
  };

  return (
    <Wrapper>
      <Header>출석 코드 입력</Header>
      <SeatNum>{info.seatNumber}번</SeatNum>
      <Form onSubmit={onSubmit}>
        <CodeInput
          type="text"
          placeholder="코드 입력"
          value={code}
          onChange={inputChangeHandler}
        />
        <EndTime>01:29</EndTime>
        <Button type="submit">확인</Button>
      </Form>
    </Wrapper>
  );
};

export default StudentModalContent;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Header = styled.header`
  font-size: 1.5rem;
  color: #325694;
  font-family: "NanumGothicBold";
  margin-bottom: 1.5rem;
`;
const SeatNum = styled.p`
  color: #ff4747;
  font-size: 1.2rem;
  font-family: "NanumGothicBold";
  margin-bottom: 1rem;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.6rem;
  width: 100%;
`;
const CodeInput = styled.input`
  width: 70%;
  height: 3rem;
  padding: 0.8rem;
  border: 1px solid #325694;

  &:focus {
    outline: none;
  }
  &::placeholder {
    color: #a5a5a5;
  }
`;
const EndTime = styled.p`
  color: #ff4747;
  font-size: 0.8rem;
  font-family: "NanumGothicBold";
`;
const Button = styled.button`
  padding: 0.5rem 1rem;
  background-color: #325694;
  border: none;
  border-radius: 0.3rem;
  font-size: 1rem;
  color: white;
`;
