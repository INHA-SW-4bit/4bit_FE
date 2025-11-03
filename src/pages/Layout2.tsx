import { useState } from "react";
import { Outlet } from "react-router-dom";
import styled from "@emotion/styled";

import profileImg from "../assets/images/profile.png";
import top_menu1 from "../assets/images/top_menu.png";
import top_menu2 from "../assets/images/top_menu2.png";
import top_menu3 from "../assets/images/top_menu3.png";
import left_menu1 from "../assets/images/left_menu1.png";
import left_menu2 from "../assets/images/left_menu2.png";
import left_menu3 from "../assets/images/left_menu3.png";
import left_menu4 from "../assets/images/left_menu4.png";
import left_menu5 from "../assets/images/left_menu5.png";
import left_menu6 from "../assets/images/left_menu6.png";
import courseHome from "../assets/images/courseHome.png";
import rightarrow from "../assets/images/rightarrow.png";
import header from "../assets/images/header.png";

const Layout2 = () => {
  const [isOpen, setISOpen] = useState(4);
  const [click, setClick] = useState("attendance");

  const menuOpen = (menuNum: number) => {
    if (isOpen === menuNum) {
      setISOpen(0);
    } else {
      setISOpen(menuNum);
    }
  };
  const attendanceClick = () => {
    if (click === "attendance") return;
    setClick("attendance");
  };
  const qnaClick = () => {
    if (click === "qna") return;
    setClick("qna");
  };

  return (
    <>
      <Header>
        <HeaderLeft>
          <Img src={header} />
        </HeaderLeft>
        <HeaderRight>
          <Profile>
            <p>학생</p>
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
      <Page>
        <SideMenu>
          <li>
            <CourseHome>
              <p>강의실 홈</p>
              <img
                src="https://learn.inha.ac.kr/theme/image.php/coursemosv2/core/1761209265/t/switch_minus"
                style={{ width: "14px", height: "14px" }}
              />
            </CourseHome>
            <CourseHomeMenu>
              <SubMenu isOpen={isOpen} menuNum={1}>
                <div onClick={() => menuOpen(1)}>
                  강의정보
                  {isOpen === 1 ? <TriangleUp /> : <TriangleDown />}
                </div>
                <SubList isOpen={isOpen} menuNum={1}>
                  <SubItem>강의계획서</SubItem>
                  <SubItem>참여자목록</SubItem>
                </SubList>
              </SubMenu>
              <SubMenu isOpen={isOpen} menuNum={2}>
                <div onClick={() => menuOpen(2)}>
                  성적/출석관리
                  {isOpen === 2 ? <TriangleUp /> : <TriangleDown />}
                </div>
                <SubList isOpen={isOpen} menuNum={2}>
                  <SubItem>온라인출석부</SubItem>
                  <SubItem>오프라인출석부</SubItem>
                  <SubItem>성적부</SubItem>
                </SubList>
              </SubMenu>
              <SubMenu isOpen={isOpen} menuNum={3}>
                <div onClick={() => menuOpen(3)}>
                  강의정보
                  {isOpen === 3 ? <TriangleUp /> : <TriangleDown />}
                </div>
                <SubList isOpen={isOpen} menuNum={3}>
                  <SubItem>쪽지 보내기</SubItem>
                </SubList>
              </SubMenu>
              <SubMenu isOpen={isOpen} menuNum={4}>
                <div onClick={() => menuOpen(4)}>
                  스마트 강의
                  {isOpen === 4 ? <TriangleUp /> : <TriangleDown />}
                </div>
                <SubList isOpen={isOpen} menuNum={4}>
                  <ActiveSubItem
                    click={click}
                    menuName="attendance"
                    onClick={attendanceClick}
                  >
                    출석
                  </ActiveSubItem>
                  <ActiveSubItem
                    click={click}
                    menuName="qna"
                    onClick={qnaClick}
                  >
                    실시간 Q&A
                  </ActiveSubItem>
                </SubList>
              </SubMenu>
              <SubMenu isOpen={isOpen} menuNum={5}>
                <div onClick={() => menuOpen(5)}>
                  기타 관리
                  {isOpen === 5 ? <TriangleUp /> : <TriangleDown />}
                </div>
                <SubList isOpen={isOpen} menuNum={5}>
                  <SubItem>팀원</SubItem>
                </SubList>
              </SubMenu>
            </CourseHomeMenu>
          </li>
          <QuickMode>
            <p>학습활동</p>
            <img
              src="https://learn.inha.ac.kr/theme/image.php/coursemosv2/core/1761209265/t/switch_plus"
              style={{ width: "14px", height: "14px" }}
            />
          </QuickMode>
        </SideMenu>

        <Main>
          <MainHeader>
            <img src={courseHome} />
            <img src={rightarrow} />
            <p>4bit</p>
            <img src={rightarrow} />
            <p>
              {click === "attendance"
                ? "출석"
                : click === "qna"
                ? "실시간 Q&A"
                : "none"}
            </p>
          </MainHeader>
          <Outlet />
        </Main>
      </Page>
    </>
  );
};

export default Layout2;

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
const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 2.3rem;
  color: white;
  font-size: 1.1rem;
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

const Page = styled.div`
  display: flex;
  margin-top: 4.3rem;
  margin-left: 3.7rem;
  background-color: #f7f9fa;
  height: 100dvh;
`;
const SideMenu = styled.ul`
  width: 13.6rem;
  background-color: #f7f9fa;
  border-right: 1px solid #dbdbdb;
`;
const CourseHome = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1.3rem 1.2rem;
  background-color: #ffffff;
  border-bottom: 1px solid #dbdbdb;
  p {
    font-size: 0.9rem;
    font-family: "NanumGothicBold";
  }
`;
const CourseHomeMenu = styled.ul`
  background-color: #ffffff;
  border-bottom: 1px solid #dbdbdb;
`;
const QuickMode = styled(CourseHome)`
  background-color: #e9ebeb;
`;
const TriangleUp = styled.span`
  display: inline-block;
  width: 0;
  height: 0;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-bottom: 4px solid #666;
  margin-left: 0.3rem;
  margin-bottom: 0.2rem;
`;
const TriangleDown = styled.span`
  display: inline-block;
  width: 0;
  height: 0;
  border-top: 4px solid #666;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  margin-left: 0.3rem;
  margin-bottom: 0.2rem;
`;
const SubMenu = styled.li<{ isOpen: number; menuNum: number }>`
  padding: 0.7rem 1.2rem;
  background-color: ${(props) =>
    props.isOpen === props.menuNum ? "#F2F3F2" : "#FFFFFF"};
  cursor: pointer;
  div {
    font-family: ${(props) =>
      props.isOpen === props.menuNum ? "NanumGothicBold" : "inherit"};
    font-size: 0.9rem;
  }
`;
const SubList = styled.ul<{ isOpen: number; menuNum: number }>`
  display: ${(props) => (props.isOpen === props.menuNum ? "flex" : "none")};
  flex-direction: column;
  gap: 0.5rem;
  list-style: none;
  padding-top: 0.7rem;
`;
const SubItem = styled.li`
  display: flex;
  align-items: center;
  font-size: 0.8rem;
  list-style: inside;
  &::before {
    content: "•";
    font-size: 0.5rem;
    color: #666;
    margin-right: 0.3rem;
  }
`;
const ActiveSubItem = styled(SubItem)<{ click: string; menuName: string }>`
  font-family: ${(props) =>
    props.click === props.menuName ? "NanumGothicBold" : "inherit"};
`;
const Main = styled.main`
  display: flex;
  flex-direction: column;
  padding: 0 2.5rem;
  width: 100%;
`;
const MainHeader = styled.header`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  padding: 1.5rem 0;
  border-bottom: 1px solid #dbdbdb;
  img:first-of-type {
    width: 0.9rem;
    height: 0.9rem;
  }
  img:not(:first-of-type) {
    width: 0.5rem;
    height: 0.5rem;
  }
  p:not(:first-of-type) {
    font-size: 0.8rem;
    font-family: "NanumGothicBold";
  }
  p:first-of-type {
    font-size: 0.8rem;
    color: #666;
  }
`;
