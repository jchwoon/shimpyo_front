import styled from 'styled-components';
import Main from '../layout/Main';
import Input from '../shared/UI/Input';
import ColorButton from '../shared/UI/ColorButton';
import useHttpRequest from '../../hooks/useHttpRequest';
import { FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CheckNonMemberMain() {
  const navigation = useNavigate();
  const { responseData, sendRequest } = useHttpRequest();
  const [error, setError] = useState<boolean>(false);
  const [reservationPhoneNumber, setReservationPhoneNumber] = useState<string>('');
  const [reservationCodeNumber, setReservationCodeNumber] = useState<string>('');

  const handleCheckNonMemberInfo = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await sendRequest({
      url: '/api/check/non-member/reservationcode',
      method: 'POST',
      body: { phoneNumber: reservationPhoneNumber, reservationCode: reservationCodeNumber },
    });
  };

  useEffect(() => {
    if (!responseData) return;

    if (responseData.isSuccess) {
      navigation(`/non-member/reservation-detail/${reservationCodeNumber}?phone=${reservationPhoneNumber}`);
    } else {
      setError(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reservationCodeNumber, reservationPhoneNumber, responseData]);
  return (
    <Main>
      <StyleMainBox>
        <StyleForm onSubmit={(e: FormEvent<HTMLFormElement>) => handleCheckNonMemberInfo(e)}>
          <StyleTitle>비회원 예약 내역 조회</StyleTitle>
          <Input onChange={e => setReservationPhoneNumber(e.target.value)} placeholder="휴대폰 번호" type="tel" />
          <Input onChange={e => setReservationCodeNumber(e.target.value)} placeholder="예약 번호" type="text" />
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
