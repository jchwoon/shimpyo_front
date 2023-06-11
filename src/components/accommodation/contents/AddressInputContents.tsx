import styled from 'styled-components';
import { useState, FocusEvent } from 'react';

interface Focused {
  focused: boolean;
}

interface FocusList {
  sido: boolean;
  sigungu: boolean;
  street: boolean;
  detail: boolean;
  post: boolean;
  [key: string]: boolean; // 동적 속성에 대한 인덱스 시그니처 추가
}

export default function AddressInputContents() {
  const [isFocused, setIsFocused] = useState<FocusList>({
    sido: false,
    sigungu: false,
    street: false,
    detail: false,
    post: false,
  });

  const handleInputFocus = (e: FocusEvent<HTMLInputElement>) => {
    const newIsFocused = { ...isFocused };
    newIsFocused[e.target.id] = true;
    setIsFocused(newIsFocused);
  };

  const handleInputBlur = (e: FocusEvent<HTMLInputElement>) => {
    const newIsBlur = { ...isFocused };
    newIsBlur[e.target.id] = false;
    setIsFocused(newIsBlur);
  };
  return (
    <StyledContainer>
      <StyledRowContainer>
        <StyledLabel htmlFor="sido" focused={isFocused.sido}>
          도/특별･광역시
        </StyledLabel>
        <StyledInput id="sido" onFocus={handleInputFocus} onBlur={handleInputBlur} />
      </StyledRowContainer>
      <StyledRowContainer>
        <StyledLabel htmlFor="sigungu" focused={isFocused.sigungu}>
          시/군/구
        </StyledLabel>
        <StyledInput id="sigungu" onFocus={handleInputFocus} onBlur={handleInputBlur} />
      </StyledRowContainer>
      <StyledRowContainer>
        <StyledLabel htmlFor="street" focused={isFocused.street}>
          도로명 주소
        </StyledLabel>
        <StyledInput id="street" onFocus={handleInputFocus} onBlur={handleInputBlur} />
      </StyledRowContainer>
      <StyledRowContainer>
        <StyledLabel htmlFor="detail" focused={isFocused.detail}>
          상세주소
        </StyledLabel>
        <StyledInput id="detail" onFocus={handleInputFocus} onBlur={handleInputBlur} />
      </StyledRowContainer>
      <StyledRowContainer>
        <StyledLabel htmlFor="post" focused={isFocused.post}>
          우편번호
        </StyledLabel>
        <StyledInput id="post" onFocus={handleInputFocus} onBlur={handleInputBlur} />
      </StyledRowContainer>
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  width: 800px;
  margin: 20px;
  border-bottom: 2px solid rgba(0, 0, 0, 0.3);
`;

const StyledRowContainer = styled.div`
  display: flex;
  justify-content: center;
  height: 70px;
  width: 800px;
  position: relative;
  border-top: 2px solid rgba(0, 0, 0, 0.3);
  border-left: 2px solid rgba(0, 0, 0, 0.3);
  border-right: 2px solid rgba(0, 0, 0, 0.3);
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
