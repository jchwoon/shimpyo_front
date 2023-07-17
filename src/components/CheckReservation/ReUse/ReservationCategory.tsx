import styled from 'styled-components';

interface ReservationCategoryProps {
  categoryTitle: React.ReactElement;
  categoryList: React.ReactElement;
  page: React.ReactElement;
}

export default function ReservationCategory({ categoryTitle, categoryList, page }: ReservationCategoryProps) {
  return (
    <StyleCategoryBox>
      <StyleFlexColumnBox>
        <StyleCategorysHeaderBox>{categoryTitle}</StyleCategorysHeaderBox>
        <StyleCategoryMainBox>{categoryList}</StyleCategoryMainBox>
        <StyleCategoryFooterBox>{page}</StyleCategoryFooterBox>
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

const StyleCategoryFooterBox = styled.div`
  margin-top: 2rem;
`;
