import styled from 'styled-components';

interface ReservationCategoryProps {
  header: React.ReactElement;
  main: React.ReactElement;
}

export default function ReservationCategory({ header, main }: ReservationCategoryProps) {
  return (
    <StyleCategoryBox>
      <StyleFlexColumnBox>
        <StyleCategorysHeaderBox>{header}</StyleCategorysHeaderBox>
        {<StyleCategoryMainBox>{main}</StyleCategoryMainBox>}
      </StyleFlexColumnBox>
    </StyleCategoryBox>
  );
}

const StyleCategoryBox = styled.div`
  padding: 0 1rem;
`;

const StyleFlexColumnBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyleCategorysHeaderBox = styled.div``;

const StyleCategoryMainBox = styled.div``;
