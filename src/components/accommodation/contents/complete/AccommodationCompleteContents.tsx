import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import useAuthorizedRequest from '../../../../hooks/useAuthorizedRequest';
import { accommodationState, imageDataState } from '../../../../recoil/accommodationAtoms';
import Loading from '../reuse/Loading';
import { ACCOMMODATION_API } from '../../../../constants/api/accommodationApi';

interface CompleteResult {
  isSuccess: boolean;
  code: number;
  message: string;
  result: { houseId: number };
}

export default function AccommodationCompleteContents() {
  const accommodation = useRecoilValue(accommodationState);

  const { isLoading, sendRequest, responseData } = useAuthorizedRequest<CompleteResult>({});

  const imageData = useRecoilValue(imageDataState);
  const accommodationData = new FormData();
  imageData.forEach((value, key) => {
    accommodationData.append(key, value);
  });
  accommodationData.append('houseReq', new Blob([JSON.stringify(accommodation)], { type: 'application/json' }));

  useEffect(() => {
    if (responseData) return;
    const fetchData = async () => {
      await sendRequest({
        url: `${ACCOMMODATION_API}`,
        method: 'POST',
        body: accommodationData,
        withCredentials: true,
      });
    };
    fetchData();
  }, [responseData]);

  return (
    <StyledFlexContainer>
      {(() => {
        if (isLoading) {
          return <Loading></Loading>;
        } else {
          return (
            <StyledFlexDiv>
              <StyledVideo autoPlay>
                <source src={'/videos/end.mp4'} type="video/mp4"></source>
              </StyledVideo>
              <StyledContentDiv>
                <StyledText>숙소 등록이 완료되었습니다.</StyledText>
                <StyledSubText>쉼표를 이용해주셔서 감사합니다.</StyledSubText>
                <StyledSubText>숙소 등록을 통해 많은 서비스를 제공해주셔서 감사합니다.</StyledSubText>
                <StyledImg src="/images/sign.png" />
                <StyledSubText>숙박 예약 서비스 (주)쉼 표</StyledSubText>
              </StyledContentDiv>
            </StyledFlexDiv>
          );
        }
      })()}
    </StyledFlexContainer>
  );
}

const StyledFlexContainer = styled.div`
  display: flex;
`;

const StyledFlexDiv = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: 780px) {
    flex-direction: row;
  }
`;

const StyledVideo = styled.video`
  width: 100%;
  @media (min-width: 780px) {
    width: 50%;
  }
`;

const StyledContentDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  padding: 2rem;
  width: 100%;
  height: 100%;
  background-color: black;

  @media (min-width: 780px) {
    width: 50%;
  }
`;

const StyledText = styled.p`
  font-size: 45px;
  color: white;
`;

const StyledSubText = styled.p`
  font-size: 15px;
  color: white;
`;

const StyledImg = styled.img`
  width: 50%;
  filter: opacity(0.9) drop-shadow(0 0 0 #ffff);
`;
