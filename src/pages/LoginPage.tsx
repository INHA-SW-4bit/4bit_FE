import { useState, type FormEvent } from "react";
import watermark from "../assets/images/watermark_converted.png";
import styled from "@emotion/styled";

const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
`;

const LoginBox = styled.div`
  position: relative;
  width: 100%;
  max-width: 42rem;
  border: 2px solid rgba(220, 252, 231, 0.7);
  border-radius: 0.5rem;
  padding: 3rem;
  overflow: hidden;

  @media (min-width: 768px) {
    padding: 4rem;
  }
`;

const WatermarkImage = styled.img`
  pointer-events: none;
  user-select: none;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  width: 300px;
  opacity: 0.2;
`;

const TitleContainer = styled.h1`
  position: relative;
  text-align: center;

  font-family: Pretendard, sans-serif;
  font-weight: 800;
  letter-spacing: -0.025em;
  color: #325694;
  opacity: 1;
`;

const MainTitle = styled.span`
  display: block;
  font-size: 72px;
  line-height: 1;
`;

const SubTitle = styled.span`
  display: block;
  font-size: 70px;
  margin-top: 0.5rem;
  line-height: 1;
`;

const LoginForm = styled.form`
  position: relative;
  margin-top: 4rem;

  & > div:not(:last-child) {
    margin-bottom: 2.5rem;
  }
  max-width: 24rem;
  margin-left: auto;
  margin-right: auto;
`;

const InputLabel = styled.label`
  display: block;
  font-size: 1.25rem;
  color: #6b7280;
`;

const InputField = styled.input`
  margin-top: 0.25rem;
  width: 100%;
  background-color: transparent;
  border: none;
  border-bottom: 3px solid #325694;
  outline: none;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;

  &:focus {
    border-bottom-color: #08457e;
  }
`;

const LoginButton = styled.button`
  display: block;
  width: 11rem;
  margin-left: auto;
  margin-right: auto;
  border-radius: 1rem;
  background-color: #325694;
  color: white;
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
  font-weight: 500;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  transition: all 0.2s;
  cursor: pointer;
  border: none;

  &:hover {
    background-color: #08457e;
  }

  &:active {
    transform: scale(0.99);
  }
`;

export default function LoginPage() {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!id.trim()) {
      alert("[사용자 아이디] 반드시 입력(선택)하셔야 합니다.");
      return;
    }

    if (!pw.trim()) {
      alert("[비밀번호] 반드시 입력(선택)하셔야 합니다.");
      return;
    }

    console.log("로그인 시도: ", { id, pw });
  };

  return (
    <PageContainer>
      <LoginBox>
        <WatermarkImage src={watermark} alt="워터마크 배경" aria-hidden />

        <TitleContainer>
          <MainTitle>INHA SW</MainTitle>

          <SubTitle>4bit</SubTitle>
        </TitleContainer>

        <LoginForm onSubmit={onSubmit}>
          <div>
            <InputLabel>ID</InputLabel>

            <InputField
              type="text"
              value={id}
              onChange={(e) => setId(e.target.value)}
              placeholder=""
            />
          </div>
          <div>
            <InputLabel>PW</InputLabel>
            <InputField
              type="password"
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              placeholder=""
            />
          </div>

          <LoginButton type="submit">로그인</LoginButton>
        </LoginForm>
      </LoginBox>
    </PageContainer>
  );
}
