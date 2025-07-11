import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { toggleAnimation } from 'widgets/ui/NavBar/styled';
import { NavBarSizeProps } from 'widgets/ui/NavBar/type';

import { TrackListProps } from '.';

export const TrackListContainer = styled.div<TrackListProps>`
  display: flex;
  height: 256px;
  overflow: hidden;
  max-height: ${({ open }) => (open ? '256px' : '0')}; // 아이템 최대 3개 높이
  transition: max-height 0.3s ease-in-out;
  ${toggleAnimation}
  ${({ size, open }) =>
    size === 'small' &&
    css`
      max-height: ${open ? '238px' : '0'}; // 아이템 최대 3개 높이
    `};
`;

const ScrollableContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  scroll-behavior: smooth; // 스크롤 시 부드러운 애니메이션

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

export const TrackListScrollableContainer = styled(ScrollableContainer)`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 20px;
`;

export const Track = styled.div<NavBarSizeProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  border-radius: 16px;

  &:hover {
    background: ${({ theme }) => theme.colors[500]};
  }

  ${({ size }) =>
    size === 'small' &&
    css`
      justify-content: center;
    `};
`;

export const NoMusicText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
  color: ${({ theme }) => theme.colors[200]};
  ${({ theme }) => theme.fonts.wantedSans.B6};
  text-align: center;
`;
