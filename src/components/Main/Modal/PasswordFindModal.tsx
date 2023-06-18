import styled from 'styled-components';
import Modal from '../../shared/Modal';
import { useRecoilState } from 'recoil';
import { passwordFindModalAtom } from '../../../recoil/atoms';
import { StyleBody } from './JoinModal';
import Input from '../../shared/UI/Input';
import { useRef, useState } from 'react';
import ColorButton from '../../shared/UI/ColorButton';
import Button from '../../shared/UI/Button';
import PasswordInput from '../Input/PasswordInput';
import ConfirmPasswordInput from '../Input/ConfirmPasswordInput';
import { emailValidation } from '../../../utils/validation';
import useHttpRequest from '../../../hooks/useHttpRequest';

interface IResultData {
  code: number;
}

export default function PasswordFindModal() {
  const emailRef = useRef<HTMLInputElement>(null);
  const { errorMessage, isLoading, responseData, sendRequest } = useHttpRequest<IResultData>();
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(false);
  const [error, setError] = useState(false);
  const [isPasswordFindModalOpen, setIsPasswordFindModalOpen] = useRecoilState(passwordFindModalAtom);
  const [isConfirmNumberInputOpen, setIsConfirmNumberInputOpen] = useState(false);

  const isValid = isPasswordValid && isConfirmPasswordValid;

  const handleGetPasswordValid = (valid: boolean) => {
    setIsPasswordValid(valid);
  };

  const handleGetConfirmPasswordValid = (valid: boolean) => {
    setIsConfirmPasswordValid(valid);
  };

  const handleSendConfrimNumber = async () => {
    const value = emailRef.current?.value;
    if (value === undefined || !emailValidation.test(value)) {
      setError(true);
      return;
    }
    setIsConfirmNumberInputOpen(true);
    setError(false);
    await sendRequest({ url: `/public/check-user?email=${value}`, method: 'POST' });
  };

  const handleClickButton = () => {
    if (!isValid) return;
  };

  const title = (
    <StyleTap>
      <div>비밀번호 찾기</div>
    </StyleTap>
  );
  const body = (
    <StylePasswordFindBody>
      <Input ref={emailRef} placeholder="이메일" type="text" />
      {error && <StyleError>이메일을 올바르게 입력해주세요.</StyleError>}
      <ColorButton label="비밀번호 찾기" onClick={handleSendConfrimNumber} />

      {isConfirmNumberInputOpen && (
        <>
          <Input placeholder="인증번호 입력" type="number" />
          <PasswordInput getValid={handleGetPasswordValid} />
          <ConfirmPasswordInput getValid={handleGetConfirmPasswordValid} />
          <Button label="확인" onClick={handleClickButton} />
        </>
      )}
    </StylePasswordFindBody>
  );
  return (
    <Modal
      title={title}
      label="비밀번호 찾기"
      body={body}
      isOpen={isPasswordFindModalOpen}
      onClose={() => {
        setIsPasswordFindModalOpen(false);
      }}
    />
  );
}

const StyleTap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const StylePasswordFindBody = styled(StyleBody)``;

const StyleError = styled.span`
  margin-left: 0.5rem;
  margin-top: 1rem;
  color: red;
  font-size: 13px;
`;
