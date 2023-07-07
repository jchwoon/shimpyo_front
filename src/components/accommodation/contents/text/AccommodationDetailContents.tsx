import styled from 'styled-components';
import ContentsTitle from '../reuse/ContentsTitle';
import ContentsSubText from '../reuse/ContentsSubText';
import AccommodationTextBox from './AccommodationTextBox';
import { useRecoilState, useRecoilValue } from 'recoil';
import { accommodationState, disabledState } from '../../../../recoil/accommodationAtoms';
import { useEffect } from 'react';
import { CONTENTS_TEXT_LIMIT } from '../../../../constants/accommodation';

export default function AccommodationDetailContents() {
  const [disabled, setDisabled] = useRecoilState(disabledState);
  const accommodation = useRecoilValue(accommodationState);

  useEffect(() => {
    if (accommodation.contents.length > 0 && accommodation.contents.length < CONTENTS_TEXT_LIMIT) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [setDisabled, accommodation.contents.length]);

  return (
    <StyledContainer>
      <ContentsTitle>숙소 설명 작성하기</ContentsTitle>
      <ContentsSubText>숙소의 특징과 장점을 알려주세요.</ContentsSubText>
      <AccommodationTextBox title={'contents'} limit={CONTENTS_TEXT_LIMIT} width={500} height={180} row={6} />
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  padding: 10px;
  width: 100%;
  @media (min-width: 780px) {
    width: 600px;
  }
`;
