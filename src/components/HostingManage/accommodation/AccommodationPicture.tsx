import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { accommodationDataState } from '../../../recoil/hostingManageAtoms';

export default function AccommodationPicture() {
  const accommodationData = useRecoilValue(accommodationDataState);

  return (
    <StyledImgContainer>
      {accommodationData?.houseImages.map((image, idx) => {
        return <StyledImg key={`img${idx}`} src={image} alt="숙소사진" />;
      })}
    </StyledImgContainer>
  );
}

const StyledImg = styled.img`
  width: 200px;
  border-radius: 10px;

  & + & {
    margin-left: 10px;
  }
`;

const StyledImgContainer = styled.div`
  display: flex;
  overflow: auto;
`;
