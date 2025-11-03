import styled from "@emotion/styled";
import Chat from "../components/qnaPage/Chat";

const ContentWrap = styled.article`
  display: flex;
  flex-direction: column;
  padding-top: 2rem;
`
const Header = styled.header`
  font-size: 1.5rem;
  margin-bottom: 1.3rem;
`

const QnAPage = () => {
  return (
    <ContentWrap>
      <Header>실시간 Q&A</Header>
      <Chat />
    </ContentWrap>
  );
}

export default QnAPage;