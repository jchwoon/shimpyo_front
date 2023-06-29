import { useRecoilState, useSetRecoilState } from 'recoil';
import { alarmAtoms, reviewModalAtom } from '../../../recoil/modalAtoms';
import Modal from '../../shared/Modal';
import styled from 'styled-components';
import ColorButton from '../../shared/UI/ColorButton';

export default function ReviewModal() {
  const [isReviewModalOpen, setIsReviewModalOpen] = useRecoilState(reviewModalAtom);
  const setIsAlarmOpen = useSetRecoilState(alarmAtoms);

  const submitReviewHandler = () => {
    setIsAlarmOpen(true);
  };

  const body = (
    <StyleBox>
      <StyleTextarea />
      <ColorButton label="제출" onClick={submitReviewHandler} />
    </StyleBox>
  );
  return (
    <Modal
      title="후기를 작성해 주세요."
      label="Review"
      onClose={() => setIsReviewModalOpen(false)}
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
