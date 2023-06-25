import styled from 'styled-components';
import { useState, FocusEvent, useEffect, ChangeEvent } from 'react';
import { MdError } from 'react-icons/md';

import { accommodationState, addressCheckState, isPassedState } from '../../../recoil/atoms';
import { useRecoilState } from 'recoil';
import LocationMap from './LocationMap';
import ErrorMessageModal from './ErrorMessageModal';

interface Focused {
  focused: boolean;
}

interface FocusList {
  sido: boolean;
  sigungu: boolean;
  address: boolean;
  detail: boolean;
  postCode: boolean;
  [key: string]: boolean; // 동적 속성에 대한 인덱스 시그니처 추가
}

export default function AddressInputContents() {
  const [isFocused, setIsFocused] = useState<FocusList>({
    sido: false,
    sigungu: false,
    address: false,
    detail: false,
    postCode: false,
  });

  const [accommodation, setAccommodation] = useRecoilState(accommodationState);
  const [isPassed, setIsPassed] = useRecoilState(isPassedState);
  const [addressCheck, setAddressCheck] = useRecoilState(addressCheckState);

  const [restAddress, setRestAddress] = useState(accommodation.address.fullAddress.split(' ').slice(3).join(' '));
  const [detailAddress, setDetailAddress] = useState<string>('');

  const handleInputFocus = (e: FocusEvent<HTMLInputElement>) => {
    const newIsFocused = { ...isFocused };
    newIsFocused[e.target.id] = true;
    setIsFocused(newIsFocused);
  };

  const handleInputBlur = (e: FocusEvent<HTMLInputElement>) => {
    const newIsBlur = { ...isFocused };

    if (!e.target.value) {
      newIsBlur[e.target.id] = false;
      setIsFocused(newIsBlur);
    }
  };

  const handleOnChangeAddress = (e: ChangeEvent<HTMLInputElement>) => {
    const newAccommodation = { ...accommodation };

    if (e.target.id === 'address') {
      setRestAddress(e.target.value);
      newAccommodation.address = {
        ...newAccommodation.address,
        fullAddress:
          newAccommodation.address.sido.trim() +
          ' ' +
          newAccommodation.address.sigungu.trim() +
          ' ' +
          restAddress.trim() +
          ' ' +
          detailAddress.trim(),
      };
      return setAccommodation(newAccommodation);
    }

    if (e.target.id === 'detail') {
      setDetailAddress(e.target.value);
      newAccommodation.address = {
        ...newAccommodation.address,
        fullAddress:
          newAccommodation.address.sido.trim() +
          ' ' +
          newAccommodation.address.sigungu.trim() +
          ' ' +
          restAddress.trim() +
          ' ' +
          detailAddress.trim(),
      };
      return setAccommodation(newAccommodation);
    }

    newAccommodation.address = {
      ...newAccommodation.address,
      [e.target.id]: e.target.value,
      fullAddress:
        newAccommodation.address.sido.trim() +
        ' ' +
        newAccommodation.address.sigungu.trim() +
        ' ' +
        restAddress.trim() +
        ' ' +
        detailAddress.trim(),
    };
    setAccommodation(newAccommodation);
  };

  useEffect(() => {
    const checkInitialValue = () => {
      const newIsFocused = { ...isFocused };

      if (accommodation.address.sido) newIsFocused.sido = true;
      if (accommodation.address.sigungu) newIsFocused.sigungu = true;
      if (accommodation.address.postCode) newIsFocused.postCode = true;
      if (restAddress) newIsFocused.address = true;
      if (detailAddress) newIsFocused.detail = true;

      setIsFocused(newIsFocused);
    };

    checkInitialValue();
  }, []);

  useEffect(() => {
    if (accommodation.address.sido && accommodation.address.sigungu && accommodation.address.postCode && restAddress) {
      setIsPassed(false);
    } else {
      setIsPassed(true);
    }
  }, [
    accommodation.address.sido,
    accommodation.address.sigungu,
    accommodation.address.postCode,
    restAddress,
    setIsPassed,
  ]);

  return (
    <div>
      <StyledContainer>
        <StyledRowContainer>
          <StyledLabel htmlFor="sido" focused={isFocused.sido}>
            도/특별･광역시
          </StyledLabel>
          <StyledInput
            id="sido"
            value={accommodation.address.sido}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            onChange={handleOnChangeAddress}
          />
        </StyledRowContainer>
        <StyledRowContainer>
          <StyledLabel htmlFor="sigungu" focused={isFocused.sigungu}>
            시/군/구
          </StyledLabel>
          <StyledInput
            id="sigungu"
            value={accommodation.address.sigungu}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            onChange={handleOnChangeAddress}
          />
        </StyledRowContainer>
        <StyledRowContainer>
          <StyledLabel htmlFor="address" focused={isFocused.address}>
            주소
          </StyledLabel>
          <StyledInput
            id="address"
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            onChange={handleOnChangeAddress}
            value={restAddress}
          />
        </StyledRowContainer>
        <StyledRowContainer>
          <StyledLabel htmlFor="detail" focused={isFocused.detail}>
            상세주소
          </StyledLabel>
          <StyledInput
            id="detail"
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            onChange={handleOnChangeAddress}
            value={detailAddress}
          />
        </StyledRowContainer>
        <StyledRowContainer>
          <StyledLabel htmlFor="postCode" focused={isFocused.postCode}>
            우편번호
          </StyledLabel>
          <StyledInput
            id="postCode"
            value={accommodation.address.postCode}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            onChange={handleOnChangeAddress}
          />
        </StyledRowContainer>
      </StyledContainer>
      {!addressCheck && (
        <StyledErrorMessage>
          <MdError />
          주소를 인식하지 못했습니다. 주소를 정확히 입력하셨나요?
        </StyledErrorMessage>
      )}
      <StyledMapContainer>
        <StyledTitle>지도에서 위치 확인하기</StyledTitle>
        <StyledsubText>위치에 대한 오차가 있을 수 있습니다. 대략적인 위치를 확인하실 수 있습니다.</StyledsubText>
        <LocationMap
          width={'600px'}
          height={'400px'}
          latitude={accommodation.address.lat}
          longitude={accommodation.address.lng}
        />
      </StyledMapContainer>
      <ErrorMessageModal />
    </div>
  );
}

const StyledContainer = styled.div`
  width: 700px;
  margin: 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
`;

const StyledRowContainer = styled.div`
  display: flex;
  justify-content: center;
  height: 70px;
  width: 700px;
  position: relative;
  border-top: 1px solid rgba(0, 0, 0, 0.2);
  border-left: 1px solid rgba(0, 0, 0, 0.2);
  border-right: 1px solid rgba(0, 0, 0, 0.2);
`;

const StyledInput = styled.input`
  display: flex;
  align-items: center;
  width: 800px;
  border: none;
  padding: 20px;
`;

const StyledLabel = styled.label<Focused>`
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
  transition: all 0.3s ease;
  color: rgba(0, 0, 0, 0.5);
  font-weight: 600;

  ${({ focused }) =>
    focused &&
    `
    top: 10%;
    left: 7px;
    font-size: 12px;
    transform: none;
  `};
`;

const StyledMapContainer = styled.div`
  margin-top: 30px;
  border-top: 2px solid rgba(0, 0, 0, 0.1);
`;

const StyledTitle = styled.h2`
  font-size: 21px;
  font-weight: 600;
  margin: 20px 0 15px 10px;
`;

const StyledsubText = styled.p`
  font-size: 12px;
  margin: 20px 0 20px 10px;
  color: rgba(0, 0, 0, 0.5);
`;

const StyledErrorMessage = styled.p`
  color: #df1a1a;
  text-indent: 20px;
`;
