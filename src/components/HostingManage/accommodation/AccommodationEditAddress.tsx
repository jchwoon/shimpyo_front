import styled from 'styled-components';
import { useState, FocusEvent, useEffect, ChangeEvent } from 'react';
import { useRecoilState } from 'recoil';
import { accommodationDataState, patchHouseReqState } from '../../../recoil/hostingManageAtoms';
import { getLatLngFromAddress } from '../../../utils/getLatLngFromAddress';

interface Focused {
  focused: boolean;
}

interface FocusList {
  sido: boolean;
  sigungu: boolean;
  fullAddress: boolean;
  postCode: boolean;
  [key: string]: boolean;
}

export default function AddressInputContents() {
  const [accommodationData, setAccommodationData] = useRecoilState(accommodationDataState);
  const [patchHouseReq, setPatchHouseReq] = useRecoilState(patchHouseReqState);

  const [isFocused, setIsFocused] = useState<FocusList>({
    sido: false,
    sigungu: false,
    fullAddress: false,
    postCode: false,
  });

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

  const handleOnChangeAddress = async (e: ChangeEvent<HTMLInputElement>) => {
    const updatedField = e.target.id;
    const updatedValue = e.target.value;

    setAccommodationData(preAccommodationData => ({
      ...preAccommodationData,
      [updatedField]: updatedValue,
    }));

    setPatchHouseReq(prePatchHouseReq => ({
      ...prePatchHouseReq,
      address: {
        ...prePatchHouseReq.address,
        [updatedField]: updatedValue,
      },
    }));

    if (updatedField === 'fullAddress') {
      try {
        const res = await getLatLngFromAddress(updatedField);
        setPatchHouseReq(prevPatchHouseReq => ({
          ...prevPatchHouseReq,
          address: {
            ...prevPatchHouseReq.address,
            lat: res?.lat as number,
            lng: res?.lng as number,
          },
        }));
        setAccommodationData(preAccommodationData => ({
          ...preAccommodationData,
          lat: res?.lat as number,
          lng: res?.lng as number,
        }));
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    const checkInitialValue = () => {
      const newIsFocused = { ...isFocused };
      if (accommodationData.sido) newIsFocused.sido = true;
      if (accommodationData.sigungu) newIsFocused.sigungu = true;
      if (accommodationData.postCode) newIsFocused.postCode = true;
      if (accommodationData.fullAddress) newIsFocused.fullAddress = true;
      setIsFocused(newIsFocused);
    };
    checkInitialValue();
  }, []);

  return (
    <StyledContainer>
      <StyledInputContainer>
        <StyledRowContainer>
          <StyledLabel htmlFor="sido" focused={isFocused.sido}>
            도/특별･광역시
          </StyledLabel>
          <StyledInput
            id="sido"
            defaultValue={accommodationData.sido}
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
            defaultValue={accommodationData.sigungu}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            onChange={handleOnChangeAddress}
          />
        </StyledRowContainer>
        <StyledRowContainer>
          <StyledLabel htmlFor="fullAddress" focused={isFocused.fullAddress}>
            전체주소
          </StyledLabel>
          <StyledInput
            id="fullAddress"
            defaultValue={accommodationData.fullAddress}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            onChange={handleOnChangeAddress}
          />
        </StyledRowContainer>

        <StyledRowContainer>
          <StyledLabel htmlFor="postCode" focused={isFocused.postCode}>
            우편번호
          </StyledLabel>
          <StyledInput
            id="postCode"
            defaultValue={accommodationData.postCode}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            onChange={handleOnChangeAddress}
          />
        </StyledRowContainer>
      </StyledInputContainer>
    </StyledContainer>
  );
}

const StyledContainer = styled.div``;

const StyledInputContainer = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
`;

const StyledRowContainer = styled.div`
  display: flex;
  justify-content: center;
  height: 70px;
  width: 100%;
  position: relative;
  border-top: 1px solid rgba(0, 0, 0, 0.2);
  border-left: 1px solid rgba(0, 0, 0, 0.2);
  border-right: 1px solid rgba(0, 0, 0, 0.2);
`;

const StyledInput = styled.input`
  display: flex;
  align-items: center;
  width: 100%;
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
