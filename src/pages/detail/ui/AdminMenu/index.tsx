import styled from '@emotion/styled';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { fetchPermitBoardState, fetchRejectBoardState } from 'entities/adminPermit/api/boardList';
import { useDeleteReportedBoard } from 'entities/adminReport/api/deleteReportedBoard.query';
import { community } from 'entities/community/api/community.query';

export const AdminMenu = ({ boardId, isAdmin }: { boardId: number; isAdmin: boolean }) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  // 관리자 권한으로 게시글 승인
  const perMitBoardMutation = useMutation({
    mutationFn: fetchPermitBoardState,
    onSuccess: async () => {
      window.alert('게시글이 승인되었습니다.');
      // detail 페이지 새로고침
      await queryClient.invalidateQueries({
        queryKey: [community.detail(boardId)],
      });
    },
    onError: (error) => {
      window.alert(error.message);
    },
  });

  // 관리자 권한으로 게시글 승인 취소
  const rejectBoardMutation = useMutation({
    mutationFn: fetchRejectBoardState,
    onSuccess: async () => {
      window.alert('게시글 승인이 취소되었습니다.');
      await navigate(-1); // 뒤로가기
    },
    onError: (error) => {
      window.alert(error.message);
    },
  });

  const deleteReportedBoardMutation = useDeleteReportedBoard();

  const reportMenu = [
    {
      text: '삭제',
      onClick: () => {
        if (deleteReportedBoardMutation.isPending) return;
        if (window.confirm('게시글을 삭제하시겠습니까?')) {
          deleteReportedBoardMutation.mutate(boardId);
        }
      },
    },
  ];

  const permitMenu = [
    {
      text: '승인',
      onClick: () => {
        if (rejectBoardMutation.isPending || perMitBoardMutation.isPending) return;
        perMitBoardMutation.mutate({ boardId });
      },
    },
    {
      text: '거절',
      onClick: () => {
        if (rejectBoardMutation.isPending || perMitBoardMutation.isPending) return;
        if (window.confirm('게시글을 삭제하시겠습니까?')) {
          rejectBoardMutation.mutate({ boardId });
        }
      },
    },
  ];

  if (!isAdmin) {
    return null;
  }
  return (
    <AdminMenuLayout>
      <AdminMenuContainer>
        <AdminMenuTitle>신고</AdminMenuTitle>
        <AdminMenuDivider />
        {reportMenu.map((menu, index) => (
          <AdminPermitMenu key={index} onClick={menu.onClick}>
            {menu.text}
          </AdminPermitMenu>
        ))}
      </AdminMenuContainer>
      <AdminMenuContainer>
        <AdminMenuTitle>관리자 확인</AdminMenuTitle>
        <AdminMenuDivider />
        {permitMenu.map((menu, index) => (
          <AdminPermitMenu key={index} onClick={menu.onClick}>
            {menu.text}
          </AdminPermitMenu>
        ))}
      </AdminMenuContainer>
    </AdminMenuLayout>
  );
};
const AdminMenuLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const AdminMenuContainer = styled.div`
  display: flex;
  width: 100%;
  padding: 24px 24px 26px;
  flex-direction: column;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors[600]};
  background: ${({ theme }) => theme.colors[700]};
`;
const AdminMenuDivider = styled.div`
  margin-top: 20px;
  height: 1px;
  background: ${({ theme }) => theme.colors[600]};
`;
const AdminMenuTitle = styled.p`
  height: 28px;
  color: ${({ theme }) => theme.colors.white};
  ${({ theme }) => theme.fonts.wantedSans.B2};
`;
const AdminPermitMenu = styled.button`
  height: 56px;
  padding: 0;
  text-align: left;
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.colors[600]};
  color: ${({ theme }) => theme.colors[200]};
  cursor: pointer;
  ${({ theme }) => theme.fonts.wantedSans.B4};
`;
