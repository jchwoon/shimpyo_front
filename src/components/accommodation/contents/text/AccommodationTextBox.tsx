import { ChangeEvent, useEffect, useState } from 'react';
import styled from 'styled-components';
import { MdError } from 'react-icons/md';

import debounce from '../../../../utils/debounce';
import { useRecoilState } from 'recoil';
import { accommodationState } from '../../../../recoil/accommodationAtoms';

interface TextBoxProps {
  title: string;
  lengthError?: boolean;
  limit: number;
  width: number;
  height: number;
  row?: number;
}

export default function AccommodationTextBox({ title, limit, width, height, row }: TextBoxProps) {
  const [accommodation, setAccommodation] = useRecoilState(accommodationState);
  const [nameLengthError, setNameLengthError] = useState<boolean>(false);
  const [contentsLengthError, setContentsLengthError] = useState<boolean>(false);

  const handleOnChange = debounce((e: ChangeEvent<HTMLTextAreaElement>) => {
    if (title === 'name') {
      const newAccommodation = { ...accommodation, name: e.target.value };
      setAccommodation(newAccommodation);
    }

    if (title === 'contents') {
      const newAccommodation = { ...accommodation, contents: e.target.value };
      setAccommodation(newAccommodation);
    }
  }, 10);

  useEffect(() => {
    if (accommodation.name.length > limit) {
      setNameLengthError(true);
    } else {
      setNameLengthError(false);
    }

    if (accommodation.contents.length > limit) {
      setContentsLengthError(true);
    } else {
      setContentsLengthError(false);
    }
  }, [accommodation.name, accommodation.contents, limit]);

  return (
    <StyledContainer>
      <StyledTextBox
        title={title}
        limit={limit}
        width={width}
        height={height}
        lengthError={title === 'name' ? nameLengthError : contentsLengthError}
        rows={row}
        onChange={handleOnChange}
        defaultValue={title === 'name' ? accommodation.name : accommodation.contents}
      ></StyledTextBox>
      <StyledLimitLength>
        {title === 'name' ? accommodation.name.length : accommodation.contents.length}/{limit}
      </StyledLimitLength>
      <StyledFlexDiv
        title={title}
        limit={limit}
        width={width}
        height={height}
        lengthError={title === 'name' ? nameLengthError : contentsLengthError}
      >
        <StyledErrorIcon />
        <StyledErrorText>{limit}자까지 입력하실 수 있습니다.</StyledErrorText>
      </StyledFlexDiv>
    </StyledContainer>
  );
}

const StyledTextBox = styled.textarea<TextBoxProps>`
  width: 85%;
  min-height: 70px;
  resize: vertical;
  text-overflow: ellipsis;
  padding: 24px;
  border-radius: 5px;

  &:focus {
    background-color: white;
    outline: 1.5px solid black;
    ${({ lengthError }) => lengthError && `outline: 1.5px solid rgb(133,117,72)`}
  }

  ${({ lengthError }) =>
    lengthError &&
    `background-color: rgba(232,227,213,0.3);
  border:1.5px solid rgb(133,117,72);`}

  @media (min-width: 780px) {
    ${({ width, height }) => `width: ${width}px; min-height: ${height}px;`}
  }
`;

const StyledContainer = styled.div`
  margin-top: 25px;
  width: 100%;
`;

const StyledLimitLength = styled.div`
  font-size: 10px;
  margin-top: 10px;
  font-weight: 600;
`;

const StyledFlexDiv = styled.div<TextBoxProps>`
  display: flex;
  align-items: center;
  margin-top: 10px;
  visibility: hidden;

  ${({ lengthError }) => lengthError && `visibility:visible`}
`;

const StyledErrorIcon = styled(MdError)`
  color: #df1a1a;
`;

const StyledErrorText = styled.p`
  color: #df1a1a;
  font-size: 10px;
  margin-left: 5px;
`;
