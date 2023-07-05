import styled from 'styled-components';

import ContentsTitle from '../reuse/ContentsTitle';
import ContentsSubText from '../reuse/ContentsSubText';
import AccommodationTextBox from './AccommodationTextBox';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { accommodationState, disabledState } from '../../../../recoil/accommodationAtoms';
import { NAME_TEXT_LIMIT } from '../../../../constants/accommodation';

export default function AccommodationNameContents() {
  const [disabled, setDisabled] = useRecoilState(disabledState);
  const accommodation = useRecoilValue(accommodationState);

  useEffect(() => {
    if (accommodation.name.length > 0 && accommodation.name.length < NAME_TEXT_LIMIT) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [setDisabled, accommodation.name.length]);

  return (
    <StyledContainer>
      <ContentsTitle>이제 숙소에 이름을 지어주세요.</ContentsTitle>
      <ContentsSubText>
        숙소 이름은 짧을수록 효과적입니다. 나중에 언제든지 변경할 수 있으니, 너무 걱정하지 마세요.
      </ContentsSubText>
      <AccommodationTextBox title={'name'} limit={NAME_TEXT_LIMIT} width={480} height={70} row={3} />
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
