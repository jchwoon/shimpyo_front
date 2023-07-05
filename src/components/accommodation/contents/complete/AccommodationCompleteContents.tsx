import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { accommodationState, imageDataState } from '../../../../recoil/accommodationAtoms';
import debounce from '../../../../utils/debounce';
import Loading from '../reuse/Loading';

export default function AccommodationCompleteContents() {
  const accommodation = useRecoilValue(accommodationState);
  const imageData = useRecoilValue(imageDataState);

  const accommodationData = new FormData();
  imageData.forEach((value, key) => {
    accommodationData.append(key, value);
  });

  const [isLoading, setIsLoading] = useState(false);
  const debounceSetter = debounce((value: boolean) => {
    setIsLoading(value);
  }, 1000);

  accommodationData.append('houseReq', new Blob([JSON.stringify(accommodation)], { type: 'application/json' }));

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const response = await axios.post('http://13.125.50.85:8081/user/houses', accommodationData, {
          headers: {
            Authorization:
              'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0MTIzQGdtYWlsLmNvbSIsImlzTWVtYmVyIjp0cnVlLCJpZCI6MiwiZXhwIjoxNjg4NDc3NTIyLCJpYXQiOjE2ODg0NzE1MjIsInVzZXJuYW1lIjoidGVzdDEyM0BnbWFpbC5jb20ifQ._tIJ3g2o7TwDUNfIUBSGaUSuETZE_NXD6TEeZv6mlRE',
            'Content-Type': 'multipart/form-data',
          },
        });
        debounceSetter(false);
      } catch (err) {
        debounceSetter(false);
        console.log(err);
      }
    };

    fetchData();
  }, []);

  return (
    <StyledDiv>
      {(() => {
        if (isLoading) {
          return <Loading></Loading>;
        } else {
          return (
            <>
              <StyledVideo autoPlay>
                <source src={'/videos/end.mp4'} type="video/mp4"></source>
              </StyledVideo>
            </>
          );
        }
      })()}
    </StyledDiv>
  );
}

const StyledDiv = styled.div``;

const StyledVideo = styled.video`
  width: 100%;
  height: 100%;

  @media (min-width: 780px) {
  }
`;
