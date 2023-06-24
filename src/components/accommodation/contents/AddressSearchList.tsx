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
}

export default function AddressSearchList({ searchResult, focus }: AddressSearchListProps) {
  if (searchResult.predictions) {
    return (
      <StyledListContainer focus={focus} searchResult={searchResult}>
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
    <StyledListContainer focus={focus} searchResult={searchResult}>
      <StyledItem>
        <FaLocationArrow />
        <StyledFlexContainer>
          <StyledItemTitle>현재 위치 사용</StyledItemTitle>
        </StyledFlexContainer>
      </StyledItem>
    </StyledListContainer>
  );
}

const StyledListContainer = styled.ul<AddressSearchListProps>`
  position: absolute;
  top: 30px;
  width: 100%;
  background-color: white;
  z-index: 10;
  border-radius: 0 0 10px 10px;
  margin-top: 40px;
  padding-top: 20px;
  overflow-y: auto;

  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.2);
  height: ${props => (props.searchResult.predictions && props.searchResult.predictions.length > 0 ? '200px' : '80px')};
  visibility: ${props => (props.focus === false ? 'hidden' : 'visible')};
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
