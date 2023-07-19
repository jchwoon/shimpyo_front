import styled from 'styled-components';
import ColorButton from '../../../../shared/UI/ColorButton';
import { ListType } from './VisitedAccommodation';
import { reviewManageModalAtom, reviewModalAtom } from '../../../../../recoil/modalAtoms';
import { useSetRecoilState } from 'recoil';
import { useSearchParams } from 'react-router-dom';
import useAuthorizedRequest from '../../../../../hooks/useAuthorizedRequest';
import { reviewAverageScoreAtom, reviewContentAtom, reviewIdAtom } from '../../../../../recoil/reviewAtoms';
import { useEffect } from 'react';

interface ReviewButtonProps {
  item: ListType;
}

export type AverageScore = 'GOOD' | 'BAD';

interface targetReviewData {
  reservationId: number;
  reviewId: number;
  memberImageUrl: string;
  contents: string;
  reviewRating: AverageScore;
}

export default function ReviewButton({ item }: ReviewButtonProps) {
  const setIsReviewModalOpen = useSetRecoilState(reviewModalAtom);
  const setIsReviewManageModalOpen = useSetRecoilState(reviewManageModalAtom);
  const [searchParams, setSearchParams] = useSearchParams();
  const { responseData, sendRequest } = useAuthorizedRequest<targetReviewData[]>({});
  const setContent = useSetRecoilState(reviewContentAtom);
  const setAverageScore = useSetRecoilState(reviewAverageScoreAtom);
  const setReviewId = useSetRecoilState(reviewIdAtom);

  const getReviewData = async () => {
    await sendRequest({ url: '/user/reviews' });
  };

  const openModalHandler = (reservationId: number, modalType: 'write' | 'manage') => {
    setSearchParams(searchParams => {
      searchParams.set('reservationId', reservationId + '');
      return searchParams;
    });

    if (modalType === 'manage') {
      getReviewData();
      setIsReviewManageModalOpen(true);
    } else {
      setIsReviewModalOpen(true);
    }
  };

  useEffect(() => {
    if (!responseData) return;

    if (responseData.isSuccess) {
      const reservationId = searchParams.get('reservationId');
      if (reservationId) {
        const findReview = responseData.result.find(review => review.reservationId === Number(reservationId));
        if (findReview) {
          setContent(findReview?.contents);
          setAverageScore(findReview?.reviewRating);
          setReviewId(findReview?.reviewId);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responseData, searchParams]);
  return (
    <StyleButtonBox>
      {item.existReview ? (
        <ColorButton
          label="후기 수정하기"
          onClick={() => {
            openModalHandler(item.reservationId, 'manage');
          }}
        />
      ) : (
        <ColorButton
          label="후기 작성하기"
          onClick={() => {
            openModalHandler(item.reservationId, 'write');
          }}
        />
      )}
    </StyleButtonBox>
  );
}

const StyleButtonBox = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  margin-top: 0.3;
`;
