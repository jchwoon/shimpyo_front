import { ChangeEvent, useEffect, useState } from 'react';
import styled from 'styled-components';
import { MdError } from 'react-icons/md';

import debounce from '../../../utils/debounce';

interface TextBoxProps {
  lengthError?: boolean;
  limit: number;
  width: number;
  height: number;
  row?: number;
}

export default function AccommodationTextBox({ limit, width, height, row }: TextBoxProps) {
  const [accommodationName, setAccommodationName] = useState<string>('');
  const [lengthError, setLengthError] = useState<boolean>(false);

  const handleOnChange = debounce((e: ChangeEvent<HTMLTextAreaElement>) => {
    setAccommodationName(e.target.value);
  }, 10);

  useEffect(() => {
    if (accommodationName.length > limit) {
      setLengthError(true);
    } else {
      setLengthError(false);
    }
  }, [accommodationName, limit]);

  return (
    <StyledContainer>
      <StyledTextBox
        limit={limit}
        width={width}
        height={height}
        lengthError={lengthError}
        rows={row}
        onChange={handleOnChange}
        defaultValue={accommodationName}
      ></StyledTextBox>
      <StyledLimitLength>
        {accommodationName.length}/{limit}
      </StyledLimitLength>
      <StyledFlexDiv limit={limit} width={width} height={height} lengthError={lengthError}>
        <StyledErrorIcon />
        <StyledErrorText>{limit}자까지 입력하실 수 있습니다.</StyledErrorText>
      </StyledFlexDiv>
    </StyledContainer>
  );
}

const StyledTextBox = styled.textarea<TextBoxProps>`
  ${({ width, height }) => `width: ${width}px; min-height: ${height}px;`}
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
`;

const StyledContainer = styled.div`
  margin-top: 25px;
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
