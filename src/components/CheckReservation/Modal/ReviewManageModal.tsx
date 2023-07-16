import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { reviewManageModalAtom } from '../../../recoil/modalAtoms';
import Modal from '../../shared/Modal';
import styled from 'styled-components';
import ColorButton from '../../shared/UI/ColorButton';
import { ChangeEvent, useEffect, useState } from 'react';
import useAuthorizedRequest from '../../../hooks/useAuthorizedRequest';
import Button from '../../shared/UI/Button';
import { reviewAverageScoreAtom, reviewContentAtom, reviewIdAtom } from '../../../recoil/reviewAtoms';
import { reviewModifiedAlarmAtoms } from '../../../recoil/alarmAtoms';

type AverageScore = 'GOOD' | 'NORMAL' | 'BAD';

type StyleTargetMarkProps = {
  score: AverageScore;
};

const getLeftValue = (score: AverageScore) => {
  switch (score) {
    case 'GOOD':
      return '25px';
    case 'NORMAL':
      return '111px';
    case 'BAD':
      return '197px';
    default:
      return '0';
  }
};

interface ReviewManageModalProps {
  getData: () => void;
}

export default function ReviewManageModal({ getData }: ReviewManageModalProps) {
  const [isReviewManageOpen, setIsReviewManageOpen] = useRecoilState(reviewManageModalAtom);
  const setModifiedAlarmOpen = useSetRecoilState(reviewModifiedAlarmAtoms);
  const setReviewModifyModal = useSetRecoilState(reviewManageModalAtom);
  const [content, setContent] = useRecoilState(reviewContentAtom);
  const reviewId = useRecoilValue(reviewIdAtom);
  const [averageScore, setAverageScore] = useRecoilState(reviewAverageScoreAtom);
  const { responseData, sendRequest } = useAuthorizedRequest({});
  const { responseData: deleteResponseData, sendRequest: deleteSendRequest } = useAuthorizedRequest({});
  const [errorMessage, setErrorMessage] = useState('');
  const [isClickDeleteButton, setIsClickDeleteButton] = useState(false);

  const checkOneMoreQuestion = () => {
    setIsClickDeleteButton(true);
  };

  const changeReviewValue = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setContent(value);
  };

  const deleteReview = async () => {
    await deleteSendRequest({ url: `/user/reviews/${reviewId}`, method: 'DELETE' });
  };

  const submitModifiedReview = async () => {
    const reviewValue = content.trim();
    if (!reviewValue) {
      checkOneMoreQuestion();
      return;
    }

    await sendRequest({
      url: `/user/reviews/${reviewId}`,
      body: {
        contents: reviewValue,
        reviewRating: averageScore,
      },
      method: 'PATCH',
    });
  };

  useEffect(() => {
    if (!responseData) return;

    if (responseData.isSuccess) {
      setModifiedAlarmOpen(true);
      setReviewModifyModal(false);
    } else {
      setErrorMessage(responseData.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responseData]);

  useEffect(() => {
    if (!deleteResponseData) return;

    if (deleteResponseData.isSuccess) {
      setReviewModifyModal(false);
      getData();
    } else {
      setErrorMessage(deleteResponseData.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleteResponseData]);

  const body = (
    <StyleBox>
      {isClickDeleteButton ? (
        <div style={{ display: 'flex', flexDirection: 'row', gap: '1rem', width: '100%' }}>
          <Button
            label="아니요"
            onClick={() => {
              setReviewModifyModal(false);
              setIsClickDeleteButton(false);
            }}
          />
          <ColorButton label="확인" onClick={deleteReview} />
        </div>
      ) : (
        <>
          <StyleTextarea value={content} onChange={changeReviewValue} />
          <StyleReviewBox>
            <StyleReviewButton onClick={() => setAverageScore('GOOD')}>&#128516;</StyleReviewButton>
            <StyleReviewButton onClick={() => setAverageScore('NORMAL')}>&#128528;</StyleReviewButton>
            <StyleReviewButton onClick={() => setAverageScore('BAD')}>&#128577;</StyleReviewButton>
            <StyleTargetMark score={averageScore}></StyleTargetMark>
          </StyleReviewBox>
          <span>{errorMessage}</span>
          <div style={{ display: 'flex', flexDirection: 'row', gap: '1rem', width: '100%' }}>
            <Button onClick={checkOneMoreQuestion} label="삭제" />
            <ColorButton
              label="완료"
              onClick={() => {
                submitModifiedReview();
              }}
            />
          </div>
        </>
      )}
    </StyleBox>
  );
  return (
    <Modal
      title={isClickDeleteButton ? '정말로 삭제 하시겠어요?' : '후기를 작성해 주세요.'}
      label="Review"
      onClose={() => setIsReviewManageOpen(false)}
      body={body}
      isOpen={isReviewManageOpen}
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
  top: 55px;
  transition: all 0.1s ease-in-out;
  left: ${({ score }) => getLeftValue(score)};
`;
