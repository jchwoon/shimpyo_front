import { useRecoilValue } from 'recoil';
import { roomDataState } from '../../../recoil/hostingManageAtoms';
import styled from 'styled-components';
import RoomOption from './RoomOption';

export default function RoomInfo() {
  const roomData = useRecoilValue(roomDataState);
  return (
    <div>
      {roomData.map((room, idx) => {
        return (
          <StyledRoomContentsContainer key={`room ${idx}`}>
            <StyledContainer>
              <StyledFlexDiv>
                <StyledImageContainer>
                  <StyledCoverImageContainer>
                    <StyledImage src={room.roomImages[0]} alt="이미지" />
                  </StyledCoverImageContainer>
                  <StyledCarouselDiv>
                    {room.roomImages.length > 1 &&
                      room.roomImages.map((image, index) => {
                        if (index === 0) return null;
                        return (
                          <StyledPlusImageContainer key={`image ${index}`}>
                            <StyledImage src={room.roomImages[index]} alt="이미지" />
                          </StyledPlusImageContainer>
                        );
                      })}
                  </StyledCarouselDiv>
                </StyledImageContainer>

                <RoomOption idx={idx} />
              </StyledFlexDiv>
            </StyledContainer>
          </StyledRoomContentsContainer>
        );
      })}
    </div>
  );
}
const StyledRoomContentsContainer = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  & + & {
    margin-top: 50px;
  }
  background-color: #00acb51c;
  border-radius: 20px;
  box-shadow: 3px 2px 1px 1px rgba(0, 0, 0, 0.1);
`;

const StyledContainer = styled.div`
  width: 100%;
  display: flex;
  padding: 10px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledFlexDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  @media (min-width: 900px) {
    flex-direction: row;
  }
`;

const StyledImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 90%;
  padding: 20px;
  height: 90%;
  box-sizing: content-box;
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 20px;
`;

const StyledCoverImageContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 225px;
  z-index: 1;
  &:hover {
    border: 2px solid black;
  }
`;

const StyledCarouselDiv = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledPlusImageContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100px;
  height: 90px;
  align-items: center;
  z-index: 10;

  &:hover {
    border: 2px solid black;
  }
`;

const StyledImage = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
`;
