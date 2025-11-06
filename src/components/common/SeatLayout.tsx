import {
  useState,
  useMemo,
  useRef,
  type MouseEventHandler,
  type MouseEvent,
} from "react";
import styled from "@emotion/styled";
import { useAuth } from "../../contexts/AuthContext";
import ProfessorModalContent from "./ProfessorModalContent";
import StudentModalContent from "./StudentModalContent";
import type { SeatingStatus, Student } from "../../types/seat";
import type { SelectedSeatInfo } from "../../types/seatModal";
import type { SessionStatus } from "../../types/session";
interface SeatLayoutProps {
  connected: boolean;
  seatingStatus: SeatingStatus;
  sessionStatus: SessionStatus;
}

const SeatLayout = ({
  connected,
  seatingStatus,
  sessionStatus,
}: SeatLayoutProps) => {
  const { layout, attendanceData } = seatingStatus;
  const { role } = useAuth();
  const isProfessor = role === "PROFESSOR";
  let seatNumber = 1;

  const dialogRef = useRef<HTMLDialogElement>(null);
  const [selectedSeatInfo, setSelectedSeatInfo] =
    useState<SelectedSeatInfo | null>(null);

  const attendanceMap = useMemo(() => {
    const map = new Map<string, Student>();

    attendanceData.forEach((data) => {
      const key = `${data.seat.row}-${data.seat.col}`;
      map.set(key, data.student);
    });

    return map;
  }, [attendanceData]);

  const openModal = (seatInfo: SelectedSeatInfo) => {
    setSelectedSeatInfo(seatInfo);
    dialogRef.current?.showModal();
  };
  const closeModal = () => {
    dialogRef.current?.close();
    setSelectedSeatInfo(null);
  };
  const backdropClosModal = (event: MouseEvent) => {
    if (event.target === event.currentTarget) {
      dialogRef.current?.close();
    }
  };

  return (
    <>
      <Wrapper isProfessor={isProfessor}>
        <Desk>교탁</Desk>
        <LayoutWrapper isProfessor={isProfessor}>
          {layout &&
            layout.map((row, rowIdx) => (
              <Row key={rowIdx} isProfessor={isProfessor}>
                {row.map((seatType, seatIdx) => {
                  const key = `${rowIdx}-${seatIdx}`;

                  if (seatType === "seat") {
                    const student = attendanceMap.get(key);
                    const isActive = !!student;
                    const curSeatNum = seatNumber++;
                    let clickHandler:
                      | MouseEventHandler<HTMLDivElement>
                      | undefined;

                    if (role === "PROFESSOR" && isActive) {
                      clickHandler = () =>
                        openModal({
                          student: student,
                          seatNumber: curSeatNum,
                        });
                    } else if (role === "STUDENT" && connected && !isActive) {
                      clickHandler = () =>
                        openModal({
                          row: rowIdx,
                          col: seatIdx,
                          endTime: sessionStatus.endTime,
                          seatNumber: curSeatNum,
                        });
                    }

                    return (
                      <Seat
                        key={key}
                        isActive={isActive}
                        onClick={clickHandler}
                      >
                        {curSeatNum}
                      </Seat>
                    );
                  }
                  if (seatType === "aisle") {
                    return <Aisle key={key} />;
                  }
                  if (seatType === "X") {
                    return <NotSeat key={key} />;
                  }

                  return null;
                })}
              </Row>
            ))}
        </LayoutWrapper>
      </Wrapper>
      <Dialog ref={dialogRef} onClick={backdropClosModal}>
        {selectedSeatInfo &&
          (role === "PROFESSOR" ? (
            <ProfessorModalContent
              info={selectedSeatInfo}
              onClose={closeModal}
            />
          ) : role === "STUDENT" ? (
            <StudentModalContent info={selectedSeatInfo} onClose={closeModal} />
          ) : null)}
      </Dialog>
    </>
  );
};

export default SeatLayout;

const Wrapper = styled.article<{ isProfessor: boolean }>`
  display: flex;
  flex-direction: ${(props) =>
    props.isProfessor ? "column-reverse" : "column"};
  justify-content: center;
  align-items: center;
  gap: 2rem;
  width: 100%;
  height: auto;
  max-height: 70dvh;
  min-width: 0;
  padding: 1.5rem;
  background-color: #ffffff;
`;
const Desk = styled.div`
  width: 9.3rem;
  height: 3.8rem;
  background-color: #d9d9d9;
  border: 1px solid #bdbdbd;
  text-align: center;
  line-height: 3.8rem;
`;
const LayoutWrapper = styled.div<{ isProfessor: boolean }>`
  display: flex;
  flex-direction: ${(props) =>
    props.isProfessor ? "column-reverse" : "column"};
  align-items: center;
  gap: 1.5rem;
  width: 100%;
  height: 100%;
  overflow: scroll;

  ::-webkit-scrollbar {
    display: none;
  }
`;
const Row = styled.div<{ isProfessor: boolean }>`
  display: flex;
  flex-direction: ${(props) => (props.isProfessor ? "row-reverse" : "row")};
  margin: 0 auto;
`;
const Seat = styled.div<{ isActive: boolean }>`
  flex-shrink: 0;
  width: 3.5rem;
  height: 3.5rem;
  font-size: 0.9rem;
  border: ${(props) =>
    props.isActive ? "1px solid #93dd4d" : "1px solid #bdbdbd"};
  background-color: ${(props) => (props.isActive ? "#B3FF6D" : "#d9d9d9")};
  text-align: center;
  line-height: 3.5rem;
  cursor: ${(props) => (props.onClick ? "pointer" : "default")};

  &:hover {
    opacity: ${(props) => (props.onClick ? 0.8 : 1)};
  }
`;
const Aisle = styled.div`
  flex-shrink: 0;
  visibility: none;
  width: 5.5rem;
  height: 3.5rem;
`;
const NotSeat = styled.div`
  flex-shrink: 0;
  visibility: none;
  width: 3.5rem;
  height: 3.5rem;
`;
const Dialog = styled.dialog`
  width: 20rem;
  padding: 1.7rem;
  margin: auto;
  background-color: #ffffff;
  border: none;
  border-radius: 0.5rem;

  &::backdrop {
    background-color: rgba(0, 0, 0, 0.5);
  }
`;
