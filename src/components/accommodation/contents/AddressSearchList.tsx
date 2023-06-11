import styled from 'styled-components';
import AddressSearchItem from './AddressSearchItem';
import { FaLocationArrow } from 'react-icons/fa';

export interface Prediction {
  description: string;
  structured_formatting: {
    main_text: string;
    secondary_text: string;
  };
}

export interface AddressSearchListProps {
  searchResult: { predictions?: Prediction[] };
  focus?: boolean;
  searchWord: string;
}

interface focusProps {
  focus?: boolean;
}

export default function AddressSearchList({ searchResult, focus, searchWord }: AddressSearchListProps) {
  if (searchResult.predictions) {
    return (
      <StyledListContainer focus={focus}>
        {searchResult.predictions.map((element: any, idx) => {
          return <AddressSearchItem key={idx} element={element} />;
        })}
        <StyledItem>
          <StyledFlexContainer>
            {searchResult.predictions.length !== 0 && <StyledItemTitle>주소를 직접 입력하겠습니다.</StyledItemTitle>}
          </StyledFlexContainer>
        </StyledItem>
      </StyledListContainer>
    );
  }

  return (
    <StyledListContainer focus={focus}>
      <StyledItem>
        <FaLocationArrow />
        <StyledFlexContainer>
          <StyledItemTitle>현재 위치 사용</StyledItemTitle>
        </StyledFlexContainer>
      </StyledItem>
    </StyledListContainer>
  );
}

const StyledListContainer = styled.ul<focusProps>`
  position: absolute;
  top: 30px;
  width: 500px;
  background-color: white;
  border-radius: 10px;
  padding-top: 50px;

  ${props => {
    if (props.focus === false) {
      return `
        visibility: hidden;
        transition: visibility 0.1s ease-in-out;
      `;
    } else {
      return `visibility: visible`;
    }
  }}
`;

const StyledItem = styled.li`
  display: flex;
  padding: 20px;
  cursor: pointer;
  align-items: center;
  line-height: 15px;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

const StyledFlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
`;

const StyledItemTitle = styled.div`
  font-size: 15px;
  text-decoration: underline;
`;
