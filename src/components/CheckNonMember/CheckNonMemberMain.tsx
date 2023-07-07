import styled from 'styled-components';
import Main from '../layout/Main';
import Input from '../shared/UI/Input';
import ColorButton from '../shared/UI/ColorButton';
import useHttpRequest from '../../hooks/useHttpRequest';
import { FormEvent, useEffect, useState } from 'react';

export default function CheckNonMemberMain() {
  const { responseData, sendRequest, errorMessage } = useHttpRequest();
  const [error, setError] = useState<boolean>(false);

  const handleCheckNonMemberInfo = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await sendRequest({ url: '/sendnonmember' });
  };

  useEffect(() => {
    if (!responseData) return;

    if (responseData.isSuccess) {
    } else {
      setError(true);
    }
  }, [responseData]);
  return (
    <Main>
      <StyleMainBox>
        <StyleForm onSubmit={(e: FormEvent<HTMLFormElement>) => handleCheckNonMemberInfo(e)}>
          <StyleTitle>비회원 예약 내역 조회</StyleTitle>
          <Input placeholder="휴대폰 번호" type="tel" />
          <Input placeholder="예약 번호" type="text" />
          {error && <span>입력하신 정보와 일치하는 예약이 없습니다.</span>}
          <ColorButton label="조회하기" onClick={() => {}} />
        </StyleForm>
      </StyleMainBox>
    </Main>
  );
}

const StyleForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 50px;

  @media only screen and (min-width: 1024px) {
    width: 400px;
  }
`;

const StyleTitle = styled.h2`
  font-weight: bold;
  font-size: 20px;
`;

const StyleMainBox = styled.div`
  display: flex;
  justify-content: center;
`;
