import styled from "@emotion/styled";

interface SeatLayoutProps {
  layout: string[][];
}

const SeatLayout = ({ layout }: SeatLayoutProps) => {
  let setNumber = 1;

  return (
    <Wrapper>
      <Desk>교탁</Desk>
      <LayoutWrapper>
        {layout &&
          layout.map((row, rowIdx) => (
            <Row key={rowIdx}>
              {row.map((seatType, seatIdx) => {
                const key = `${rowIdx}-${seatIdx}`;

                if (seatType === "seat") {
                  return <Seat key={key}>{setNumber++}</Seat>;
                }
                if (seatType === "aisle") {
                  return <Aisle key={key} />;
                }
                if (seatType === "X") {
                  return <NotSeat key={key} />;
                }
              })}
            </Row>
          ))}
      </LayoutWrapper>
    </Wrapper>
  );
};

export default SeatLayout;

const Wrapper = styled.article`
  display: flex;
  flex-direction: column;
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
  text-align: center;
  line-height: 3.8rem;
`;
const LayoutWrapper = styled.div`
  display: block;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  width: 100%;
  height: 100%;
  overflow: scroll;
`;
const Row = styled.div`
  display: flex;
  margin: 0 auto;
`;
const Seat = styled.div`
  flex-shrink: 0;
  width: 3.5rem;
  height: 3.5rem;
  font-size: 0.9rem;
  background-color: #d9d9d9;
  text-align: center;
  line-height: 3.5rem;
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
