import styled from 'styled-components';
import Main from '../layout/Main';
import Input from '../shared/UI/Input';
import ColorButton from '../shared/UI/ColorButton';
import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CheckNonMemberMain() {
  const navigation = useNavigate();
  const [reservationCodeNumber, setReservationCodeNumber] = useState<string>('');

  const handleCheckNonMemberInfo = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    navigation(`/non-member/reservation-detail/${reservationCodeNumber}`);
  };

  return (
    <Main>
      <StyleMainBox>
        <StyleForm onSubmit={(e: FormEvent<HTMLFormElement>) => handleCheckNonMemberInfo(e)}>
          <StyleTitle>비회원 예약 내역 조회</StyleTitle>
          <span style={{ marginTop: '10px' }}></span>
          <Input onChange={e => setReservationCodeNumber(e.target.value)} placeholder="예약 번호" type="text" />
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
