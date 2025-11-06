import styled from "@emotion/styled";
import { useAuth } from "../../contexts/AuthContext";

import profileImg from "../../assets/images/profile.png";
import top_menu1 from "../../assets/images/top_menu.png";
import top_menu2 from "../../assets/images/top_menu2.png";
import top_menu3 from "../../assets/images/top_menu3.png";
import left_menu1 from "../../assets/images/left_menu1.png";
import left_menu2 from "../../assets/images/left_menu2.png";
import left_menu3 from "../../assets/images/left_menu3.png";
import left_menu4 from "../../assets/images/left_menu4.png";
import left_menu5 from "../../assets/images/left_menu5.png";
import left_menu6 from "../../assets/images/left_menu6.png";
import header from "../../assets/images/header.png";

const HeaderAndLnb = () => {
  const { role } = useAuth();

  return (
    <>
      <Header>
        <HeaderLeft src={header} />
        <HeaderRight>
          <Profile>
            <p>{role === "PROFESSOR" ? "교수" : "학생"}</p>
            <ProfileImg src={profileImg} />
          </Profile>
          <Img src={top_menu1} />
          <Img src={top_menu2} />
          <Img src={top_menu3} />
          <Button type="button">로그아웃</Button>
        </HeaderRight>
      </Header>
      <Lnb>
        <Img src={left_menu1} />
        <Img src={left_menu2} />
        <Img src={left_menu3} />
        <Img src={left_menu4} />
        <Img src={left_menu5} />
        <Img src={left_menu6} />
      </Lnb>
    </>
  );
};

export default HeaderAndLnb;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  top: 0;
  width: 100dvw;
  height: 4.3rem;
  padding: 0 1.2rem;
  background-color: #325694;
`;
const HeaderLeft = styled.img`
  height: 3.8rem;
`;
const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;
const Img = styled.img`
  width: 1.3rem;
  height: 1.3rem;
  cursor: pointer;
`;
const Profile = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #efefefba;
  font-size: 0.8rem;
`;
const ProfileImg = styled.img`
  width: 2rem;
  height: 2rem;
`;
const Button = styled.button`
  padding: 0.7rem;
  border: none;
  background-color: #223c66;
  color: white;
`;

const Lnb = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2.6rem;
  position: absolute;
  top: 4.3rem;
  left: 0;
  width: 3.7rem;
  height: 100dvh;
  padding: 1.3rem 0;
  background-color: #2f3033;
`;
