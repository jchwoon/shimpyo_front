import { useRecoilState } from 'recoil';
import Modal from '../../shared/Modal';
import { idFindModalAtom } from '../../../recoil/atoms';
import styled from 'styled-components';
import Input from '../../shared/UI/Input';
import { StyleBody } from './JoinModal';
import Button from '../../shared/UI/Button';
import ColorButton from '../../shared/UI/ColorButton';
import { useState, useRef, useEffect } from 'react';
import { phoneRule } from '../../../utils/validation';
import useHttpRequest from '../../../hooks/useHttpRequest';

export default function IdFindModal() {
  const { isLoading, responseData, sendRequest } = useHttpRequest();
  const [isIdFindModalOpen, setIsIdFindModalOpen] = useRecoilState(idFindModalAtom);
  const [isConfirmNumberInputOpen, setIsConfirmNumberInputOpen] = useState(false);
  const [confirmNumberButtonText, setConfirmNumberButtonText] = useState('인증번호 발송');
  const [error, setError] = useState(false);

  const phoneRef = useRef<HTMLInputElement>(null);

  const handleSendConfrimNumber = async () => {
    const value = phoneRef.current?.value;

    if (value === undefined || !phoneRule.test(value)) {
      setError(true);
      return;
    }
    setIsConfirmNumberInputOpen(true);
    setConfirmNumberButtonText('인증번호 재발송');
    setError(false);
    await sendRequest({ url: '/public/show-email', body: { phoneNumber: value }, method: 'POST' });
  };

  useEffect(() => {
    if (!responseData) return;

    if (!responseData.isSuccess) {
    }
  }, []);

  const title = (
    <StyleTap>
      <div>아이디(이메일)찾기</div>
    </StyleTap>
  );
  const body = (
    <StyleIdFindBody>
      <Input ref={phoneRef} placeholder="휴대폰 번호" inputMode="tel" type="number" />
      {error && <StyleError>휴대폰 번호를 입력해주세요.</StyleError>}
      <ColorButton label={confirmNumberButtonText} onClick={handleSendConfrimNumber} />

      {isConfirmNumberInputOpen && (
        <>
          <Input placeholder="인증번호 입력" type="number" />
          <Button label="확인" />
        </>
      )}
    </StyleIdFindBody>
  );
  return (
    <Modal
      title={title}
      label="아이디(이메일) 찾기"
      body={body}
      isOpen={isIdFindModalOpen}
      onClose={() => {
        setIsIdFindModalOpen(false);
      }}
    />
  );
}

const StyleTap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const StyleIdFindBody = styled(StyleBody)``;

const StyleError = styled.span`
  margin-left: 0.5rem;
  margin-top: 1rem;
  color: red;
  font-size: 13px;
`;

// const StyleConfirmNumberBox = styled.div`
//   display: flex;
//   flex-direction: row;
//   label {
//     flex-grow: 1;
//     flex-basis: 100%;
//   }
// `;
