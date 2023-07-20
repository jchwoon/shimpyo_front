import { useRecoilState, useSetRecoilState } from 'recoil';
import { reviewModalAtom } from '../../../recoil/modalAtoms';
import Modal from '../../shared/Modal';
import styled from 'styled-components';
import ColorButton from '../../shared/UI/ColorButton';
import { useEffect, useRef, useState } from 'react';
import useAuthorizedRequest from '../../../hooks/useAuthorizedRequest';
import { useSearchParams } from 'react-router-dom';
import { reviewCompleteAlarmAtoms } from '../../../recoil/alarmAtoms';
import { AverageScore } from '../Main/Category/VisitedAccommodation/ReviewButton';
import { reviewAverageScoreAtom } from '../../../recoil/reviewAtoms';

type StyleTargetMarkProps = {
  score: AverageScore;
};

const getLeftValue = (score: AverageScore) => {
  switch (score) {
    case 'GOOD':
      return '26px';
    case 'BAD':
      return '111px';
    default:
      return '0';
  }
};

interface ReviewModalProps {
  getData: () => void;
}

export default function ReviewModal({ getData }: ReviewModalProps) {
  const [isReviewModalOpen, setIsReviewModalOpen] = useRecoilState(reviewModalAtom);
  const setCompleteAlarmOpen = useSetRecoilState(reviewCompleteAlarmAtoms);
  const [searchParams] = useSearchParams();
  const { responseData, sendRequest } = useAuthorizedRequest({});
  const [errorMessage, setErrorMessage] = useState('');
  const [averageScore, setAverageScore] = useRecoilState<AverageScore>(reviewAverageScoreAtom);
  const reviewInputRef = useRef<HTMLTextAreaElement>(null);
  const setReviewModal = useSetRecoilState(reviewModalAtom);

  const initiaoState = () => {
    setAverageScore('GOOD');
  };

  const submitReviewHandler = async () => {
    const reviewValue = reviewInputRef.current?.value.trim();
    if (!reviewValue) return;

    await sendRequest({
      url: '/user/reviews',
      body: {
        reservationId: Number(searchParams.get('reservationId')),
        contents: reviewValue,
        reviewRating: averageScore,
      },
      method: 'POST',
    });
  };

  useEffect(() => {
    if (!responseData) return;

    if (responseData.isSuccess) {
      setCompleteAlarmOpen(true);
      setReviewModal(false);
      getData();
    } else {
      setErrorMessage(responseData.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responseData]);

  const body = (
    <StyleBox>
      <StyleTextarea ref={reviewInputRef} />
      <StyleReviewBox>
        <StyleReviewButton onClick={() => setAverageScore('GOOD')}>&#128516;</StyleReviewButton>
        <StyleReviewButton onClick={() => setAverageScore('BAD')}>&#128577;</StyleReviewButton>
        <StyleTargetMark score={averageScore}></StyleTargetMark>
      </StyleReviewBox>
      <span>{errorMessage}</span>
      <ColorButton label="제출" onClick={submitReviewHandler} />
    </StyleBox>
  );
  return (
    <Modal
      title="후기를 작성해 주세요."
      label="Review"
      onClose={() => {
        initiaoState();
        setIsReviewModalOpen(false);
      }}
      body={body}
      isOpen={isReviewModalOpen}
    />
  );
}

const StyleBox = styled.div`
  display: flex;
  flex-direction: column;

  margin-top: 1rem;
  justify-content: center;
  align-items: center;
`;

const StyleTextarea = styled.textarea`
  width: 97%;
  height: 80px;
  resize: none;
  padding: 0.5rem;
  border-radius: 5px;
  font-size: 15px;
  font-family: Noto Sans KR;
`;

const StyleReviewBox = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  gap: 1.5rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

const StyleReviewButton = styled.div`
  font-size: 40px;
  padding: 0.2rem;
  border-radius: 100%;
  cursor: pointer;

  &:hover {
    scale: 1.2;
  }
`;

const StyleTargetMark = styled.div<StyleTargetMarkProps>`
  width: 10px;
  height: 10px;
  border-radius: 100%;
  background-color: #1cc71c;
  position: absolute;
  top: 60px;
  transition: all 0.1s ease-in-out;
  left: ${({ score }) => getLeftValue(score)};
`;
