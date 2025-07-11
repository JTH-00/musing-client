import styled from '@emotion/styled';
import { Outlet } from 'react-router-dom';

import { HEADER_HEIGHT } from 'widgets/config/headerHeight';
import { NAV_BAR_WIDTH } from 'widgets/config/navBarWidth';
import { Footer } from 'widgets/ui/Footer';
import { Header } from 'widgets/ui/Header';
import { NavBar } from 'widgets/ui/NavBar';

import { useErrorModalStore } from 'shared/store/errorModalStore';
import { useUserInfoStore } from 'shared/store/userInfo';
import { ErrorModal } from 'shared/ui/Modal';

export const MainLayout = () => {
  const { isOpen, message, closeModal } = useErrorModalStore();
  const { isLogin } = useUserInfoStore();

  return (
    <PageLayout>
      <Header isLoggedIn={isLogin()} />
      <LeftContainer>
        <NavBar />
      </LeftContainer>
      <RightContainer>
        <ScrollableMainContainer>
          <ErrorModal open={isOpen} onClose={closeModal}>
            {message}
          </ErrorModal>
          <ContentsContainer>
            <Outlet />
          </ContentsContainer>
          <Footer></Footer>
        </ScrollableMainContainer>
      </RightContainer>
    </PageLayout>
  );
};

const PageLayout = styled.div`
  display: flex;
  height: 100svh;
`;

const LeftContainer = styled.div`
  width: ${NAV_BAR_WIDTH}px;
  background: ${({ theme }) => theme.colors[900]};
  display: flex;
`;

const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1; // 화면의 남은 공간을 채운다.
  background: ${({ theme }) => theme.colors[900]};
`;

export const ScrollableContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  scroll-behavior: smooth;

  /* 스크롤바 스타일 */
  &::-webkit-scrollbar {
    width: 12px;
  }

  /* 스크롤바 썸(잡는 부분) */
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors[500]};
    border-radius: 4px;
    &:hover {
      background: ${({ theme }) => theme.colors[300]};
    }
  }

  /* 스크롤바 트랙 (배경) */
  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors[800]};
    border-radius: 4px;
  }
`;
const ScrollableMainContainer = styled(ScrollableContainer)`
  display: flex;
  flex-direction: column;
  min-height: 100svh;
  padding-top: ${HEADER_HEIGHT}px;
  overflow-y: auto;
`;

// 컨텐츠 width는 1280px로 고정
const ContentsContainer = styled.div`
  margin: 0 auto;
  min-width: 1280px;
  width: 1280px;
  flex: 1;
  scroll-behavior: smooth;
  display: flex;
  flex-direction: column;
`;
