import { useState, MouseEvent } from 'react';
import styled from 'styled-components';

import { FaPlus } from 'react-icons/fa';
import { FaMinus } from 'react-icons/fa';

interface CountInfo {
  minPeople: number;
  maxPeople: number;
  bedCount: number;
  bedroomCount: number;
  bathroomCount: number;
  [key: string]: number;
}

interface Disabled {
  minPeople: boolean;
  maxPeople: boolean;
  bedCount: boolean;
  bedroomCount: boolean;
  bathroomCount: boolean;
  [key: string]: boolean;
}

export default function AccommodationCountInfo() {
  const [countInfo, setCountInfo] = useState<CountInfo>({
    minPeople: 1,
    maxPeople: 1,
    bedCount: 0,
    bedroomCount: 0,
    bathroomCount: 0,
  });

  const [isDisabled, setIsDisabled] = useState<Disabled>({
    minPeople: true,
    maxPeople: true,
    bedCount: true,
    bedroomCount: true,
    bathroomCount: true,
  });

  const handlePlusOnClick = (id: string) => (e: MouseEvent<HTMLButtonElement>) => {
    const newCountInfo = { ...countInfo };

    if (id === 'minPeople' || id === 'maxPeople') {
      if (newCountInfo[id] === 1) {
        const newIsDisabled = { ...isDisabled };
        newIsDisabled[id] = false;
        setIsDisabled(newIsDisabled);
      }
      newCountInfo[id]++;
      setCountInfo(newCountInfo);
    } else {
      if (newCountInfo[id] === 0) {
        const newIsDisabled = { ...isDisabled };
        newIsDisabled[id] = false;
        setIsDisabled(newIsDisabled);
      }
      newCountInfo[id]++;
      setCountInfo(newCountInfo);
    }
  };

  const handleMinusOnClick = (id: string) => (e: MouseEvent<HTMLButtonElement>) => {
    const newCountInfo = { ...countInfo };

    if (id === 'minPeople' || id === 'maxPeople') {
      if (newCountInfo[id] === 2) {
        const newIsDisabled = { ...isDisabled };
        newIsDisabled[id] = true;
        setIsDisabled(newIsDisabled);
      }
      newCountInfo[id]--;
      setCountInfo(newCountInfo);
    } else {
      if (newCountInfo[id] === 1) {
        const newIsDisabled = { ...isDisabled };
        newIsDisabled[id] = true;
        setIsDisabled(newIsDisabled);
      }
      newCountInfo[id]--;
      setCountInfo(newCountInfo);
    }
  };

  return (
    <StyledContentDiv>
      <StyledItemContainer>
        <StyledItemName>최소인원</StyledItemName>
        <StyledCounterContainer>
          <StyledCounterBtn disabled={isDisabled.minPeople} onClick={handleMinusOnClick('minPeople')}>
            <StyledMinusIcon />
          </StyledCounterBtn>
          <StyledCountResult>{countInfo.minPeople}</StyledCountResult>
          <StyledCounterBtn onClick={handlePlusOnClick('minPeople')}>
            <StyledPlusIcon />
          </StyledCounterBtn>
        </StyledCounterContainer>
      </StyledItemContainer>
      <StyledItemContainer>
        <StyledItemName>최대인원</StyledItemName>
        <StyledCounterContainer>
          <StyledCounterBtn disabled={isDisabled.maxPeople} onClick={handleMinusOnClick('maxPeople')}>
            <StyledMinusIcon />
          </StyledCounterBtn>
          <StyledCountResult>{countInfo.maxPeople}</StyledCountResult>
          <StyledCounterBtn onClick={handlePlusOnClick('maxPeople')}>
            <StyledPlusIcon />
          </StyledCounterBtn>
        </StyledCounterContainer>
      </StyledItemContainer>
      <StyledItemContainer>
        <StyledItemName>침실</StyledItemName>
        <StyledCounterContainer>
          <StyledCounterBtn disabled={isDisabled.bedroomCount} onClick={handleMinusOnClick('bedroomCount')}>
            <StyledMinusIcon />
          </StyledCounterBtn>
          <StyledCountResult>{countInfo.bedroomCount}</StyledCountResult>
          <StyledCounterBtn onClick={handlePlusOnClick('bedroomCount')}>
            <StyledPlusIcon />
          </StyledCounterBtn>
        </StyledCounterContainer>
      </StyledItemContainer>
      <StyledItemContainer>
        <StyledItemName>침대</StyledItemName>
        <StyledCounterContainer>
          <StyledCounterBtn disabled={isDisabled.bedCount} onClick={handleMinusOnClick('bedCount')}>
            <StyledMinusIcon />
          </StyledCounterBtn>
          <StyledCountResult>{countInfo.bedCount}</StyledCountResult>
          <StyledCounterBtn onClick={handlePlusOnClick('bedCount')}>
            <StyledPlusIcon />
          </StyledCounterBtn>
        </StyledCounterContainer>
      </StyledItemContainer>
      <StyledItemContainer>
        <StyledItemName>욕실</StyledItemName>
        <StyledCounterContainer>
          <StyledCounterBtn disabled={isDisabled.bathroomCount} onClick={handleMinusOnClick('bathroomCount')}>
            <StyledMinusIcon />
          </StyledCounterBtn>
          <StyledCountResult>{countInfo.bathroomCount}</StyledCountResult>
          <StyledCounterBtn onClick={handlePlusOnClick('bathroomCount')}>
            <StyledPlusIcon />
          </StyledCounterBtn>
        </StyledCounterContainer>
      </StyledItemContainer>
    </StyledContentDiv>
  );
}

const StyledContentDiv = styled.div`
  width: 600px;
`;

const StyledItemContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px 0;

  & + & {
    border-top: 1px solid rgba(0, 0, 0, 0.2);
  }
`;

const StyledItemName = styled.span`
  font-size: 18px;
`;

const StyledCounterContainer = styled.div`
  display: flex;
  align-items: center;
`;

const StyledCounterBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
  background-color: transparent;
  border-radius: 100%;
  border: 1px solid rgba(0, 0, 0, 0.2);

  &:hover {
    cursor: pointer;
    border-color: black;
  }

  &:disabled {
    border-color: rgba(0, 0, 0, 0.1);
    cursor: not-allowed;
  }
`;

const StyledCountResult = styled.div`
  margin: 0 10px;
  width: 20px;
  text-align: center;
`;

const StyledMinusIcon = styled(FaMinus)`
  size: 10px;
  color: rgba(0, 0, 0, 0.4);

  ${StyledCounterBtn}:hover & {
    color: black;
  }

  ${StyledCounterBtn}:disabled & {
    color: rgba(0, 0, 0, 0.1);
  }
`;

const StyledPlusIcon = styled(FaPlus)`
  size: 10px;
  color: rgba(0, 0, 0, 0.4);

  ${StyledCounterBtn}:hover & {
    color: black;
  }
`;
