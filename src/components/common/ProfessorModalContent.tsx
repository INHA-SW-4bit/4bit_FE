import styled from "@emotion/styled";
import type { ModalContentProps } from "../../types/seatModal";
import profileImg from "../../assets/images/profile.png";

const ProfessorModalContent = ({ info, onClose }: ModalContentProps) => {
  if (info.student === undefined) return;

  return (
    <Wrapper>
      <SeatNum>{info.seatNumber}번</SeatNum>
      <DepartmentAndGrade>
        {info.student.department} {info.student.grade}학년
      </DepartmentAndGrade>
      <StudentId>({info.student.studentId})</StudentId>
      <ProfileImg src={profileImg} />
      <StudentName>{info.student.name}</StudentName>
      <Button type="button" onClick={onClose}>
        닫기
      </Button>
    </Wrapper>
  );
};

export default ProfessorModalContent;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const SeatNum = styled.header`
  font-size: 1.5rem;
  color: #325694;
  font-family: "NanumGothicBold";
  margin-bottom: 1.5rem;
`;
const DepartmentAndGrade = styled.p`
  font-size: 1.3rem;
  color: #325694;
  font-family: "NanumGothicBold";
  margin-bottom: 0.4rem;
`;
const StudentId = styled.p`
  font-size: 1rem;
  color: #325694;
  margin-bottom: 1rem;
`;
const ProfileImg = styled.img`
  width: 6rem;
  height: 6rem;
  margin-bottom: 0.6rem;
`;
const StudentName = styled.p`
  font-size: 0.9rem;
  color: #333333;
  margin-bottom: 1.5rem;
`;
const Button = styled.button`
  padding: 0.5rem 1rem;
  background-color: #325694;
  border: none;
  border-radius: 0.3rem;
  font-size: 1rem;
  color: white;
`;
