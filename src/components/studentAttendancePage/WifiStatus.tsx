import styled from "@emotion/styled";

interface WifiStatusProps {
  connected: boolean;
}

const WifiStatus = ({ connected }: WifiStatusProps) => {
  return (
    <Wrapper>
      <Item>
        <WifiConnected connected={connected} />
        <ConnectedText connected={connected}>Wifi 활성화</ConnectedText>
      </Item>
      <Item>
        <WifiDisconnected connected={connected} />
        <DisconnectedText connected={connected}>Wifi 비활성화</DisconnectedText>
      </Item>
    </Wrapper>
  );
};

export default WifiStatus;

const Wrapper = styled.div`
  display: flex;
  gap: 1.5rem;
`;
const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
`;
const WifiConnected = styled.div<{ connected: boolean }>`
  width: 0.3rem;
  height: 0.3rem;
  border-radius: 50%;
  background-color: ${(props) => (props.connected ? "#00FF11" : "#B6B6B6")};
  box-shadow: ${(props) =>
    props.connected
      ? "0 0 0.2rem 0.08rem #00FF11"
      : "0 0 0.2rem 0.08rem #B6B6B6"};
`;
const ConnectedText = styled.span<{ connected: boolean }>`
  font-size: 0.9rem;
  color: ${(props) => (props.connected ? "inherit" : "#B6B6B6")};
`;
const WifiDisconnected = styled.div<{ connected: boolean }>`
  width: 0.3rem;
  height: 0.3rem;
  border-radius: 50%;
  background-color: ${(props) => (props.connected ? "#B6B6B6" : "#FF3A3A")};
  box-shadow: ${(props) =>
    props.connected
      ? "0 0 0.2rem 0.08rem #B6B6B6"
      : "0 0 0.2rem 0.08rem #FF3A3A"};
`;
const DisconnectedText = styled.span<{ connected: boolean }>`
  font-size: 0.9rem;
  color: ${(props) => (props.connected ? "#B6B6B6" : "inherit")};
`;
