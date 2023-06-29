import styled from 'styled-components';
import Main from '../layout/Main';
import Reservations from './ReservationCategory/Reservations';
import VisitedAccommodation from './ReservationCategory/VisitedAccommodation';
import ReservationCancel from './ReservationCategory/ReservationCancel';
import useAuthorizedRequest from '../../hooks/useAuthorizedRequest';
import { useEffect, useState } from 'react';

type Item = {
  title: string;
  checkIn: Date;
  checkOut: Date;
};

interface IResultData {
  ContentsArray: Item[];
}

export default function ReservationMain() {
  const { responseData, sendRequest } = useAuthorizedRequest<IResultData>({});
  const [array, setArray] = useState<Item[]>([]);

  useEffect(() => {
    if (!responseData) return;

    if (responseData.result) {
      setArray(responseData.result.ContentsArray);
    }
  }, [responseData]);
  return (
    <Main>
      <StyleListBox>
        <StyleFlexBox>
          <Reservations />
          <VisitedAccommodation />
          <ReservationCancel />
        </StyleFlexBox>
      </StyleListBox>
    </Main>
  );
}

const StyleListBox = styled.div`
  margin-top: 2rem;
  padding: 2rem 0;
`;

const StyleFlexBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;
