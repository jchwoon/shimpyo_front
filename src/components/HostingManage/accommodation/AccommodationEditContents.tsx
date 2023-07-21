import styled from 'styled-components';
import { AccommodationIconMap, AccommodationType, AccommodationNameMap } from '../../../constants/accommodationType';
import { ChangeEvent, useState } from 'react';
import { useRecoilState } from 'recoil';
import { accommodationDataState, patchHouseReqState } from '../../../recoil/hostingManageAtoms';
import debounce from '../../../utils/debounce';

export default function AccommodationEditContents() {
  const [accommodationData, setAccommodationData] = useRecoilState(accommodationDataState);
  const [patchHouseReq, setPatchHouseReq] = useRecoilState(patchHouseReqState);

  const typeList: (keyof AccommodationType)[] = ['MOTEL', 'HOTEL', 'PENSION', 'GUEST'];
  const [selectedType, setSelectedType] = useState<keyof AccommodationType>();

  const changeAccommodationType = (e: React.MouseEvent<HTMLButtonElement>) => {
    const value = (e.target as HTMLInputElement).value as keyof AccommodationType;
    setSelectedType(value);

    const newAccommodationData = { ...accommodationData, type: value };
    setAccommodationData(newAccommodationData);

    const newPatchHouseReq = { ...patchHouseReq, type: value };
    setPatchHouseReq(newPatchHouseReq);
  };

  const changeText = debounce((e: ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.name === 'name') {
      const newAccommodation = { ...accommodationData, name: e.target.value.replace(/\r\n|\r|\n/g, ' ') };
      setAccommodationData(newAccommodation);
      const newPatchHouseReq = { ...patchHouseReq, name: e.target.value.replace(/\r\n|\r|\n/g, ' ') };
      setPatchHouseReq(newPatchHouseReq);
    }

    if (e.target.name === 'contents') {
      const newAccommodation = { ...accommodationData, contents: e.target.value };
      setAccommodationData(newAccommodation);
      const newPatchHouseReq = { ...patchHouseReq, contents: e.target.value };
      setPatchHouseReq(newPatchHouseReq);
    }
  }, 10);

  return (
    <StyledEditContentsContainer>
      <StyledEditContent>
        <StyledContentsTitle>타입</StyledContentsTitle>
        <StyledTypeButtonContainer>
          {typeList.map((type, idx) => {
            return (
              <StyledButtonDiv key={idx}>
                <StyledItemButton
                  value={type}
                  type="button"
                  role="checkbox"
                  aria-checked={type === selectedType}
                  onClick={changeAccommodationType}
                >
                  {AccommodationIconMap[type]}
                  <StyledItemName>{AccommodationNameMap[type]}</StyledItemName>
                </StyledItemButton>
              </StyledButtonDiv>
            );
          })}
        </StyledTypeButtonContainer>
      </StyledEditContent>

      <StyledEditContent>
        <StyledContentsTitle>숙소이름</StyledContentsTitle>
        <StyledTextBox name="name" defaultValue={accommodationData.name} onChange={changeText}></StyledTextBox>
      </StyledEditContent>

      <StyledEditContent>
        <StyledContentsTitle>숙소설명</StyledContentsTitle>
        <StyledTextBox name="contents" defaultValue={accommodationData.contents} onChange={changeText}></StyledTextBox>
      </StyledEditContent>
    </StyledEditContentsContainer>
  );
}

const StyledEditContentsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const StyledTypeButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  @media (min-width: 780px) {
    flex-wrap: nowrap;
  }
`;

const StyledContentsTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 40px;
  background-color: #212121;
  color: white;
  border-radius: 10px;
`;

const StyledEditContent = styled.div`
  margin-bottom: 30px;
`;

const StyledButtonDiv = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 15px;
  @media (min-width: 780px) {
    padding: 20px;
    width: 50%;
  }
`;

const StyledItemButton = styled.button`
  display: flex;
  align-items: center;
  width: 100%;
  border: 2px solid rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  background-color: white;
  padding: 15px;

  &:hover {
    border: 3px solid black;
    cursor: pointer;
  }

  &:active {
    transform: scale(0.95);
    transition: transform 0.2s ease;
  }

  ${({ 'aria-checked': ariaChecked }) => {
    if (ariaChecked === true) {
      return `
      background-color: rgba(0, 0, 0, 0.05);
      border: 3px solid black;
      `;
    }
  }}

  @media (min-width: 780px) {
    flex-direction: column;
    justify-content: center;
    align-items: start;
    height: 110px;
    padding-left: 10px;
  }
`;

const StyledItemName = styled.span`
  font-size: 17px;
  margin-left: 1rem;

  @media (min-width: 780px) {
    font-size: 15px;
    margin: 10px 0 0 10px;
  }
`;

const StyledTextBox = styled.textarea`
  width: 85%;
  min-height: 70px;
  resize: vertical;
  text-overflow: ellipsis;
  padding: 24px;
  margin: 20px;
  border-radius: 5px;

  &:focus {
    background-color: white;
    outline: 1.5px solid black;
  }
  @media (max-width: 580px) {
    width: 70%;
  }
`;
