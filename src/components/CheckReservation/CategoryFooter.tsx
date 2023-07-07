import { MouseEvent } from 'react';
import styled from 'styled-components';

interface CategoryFooterProps {
  totalPage: number;
  currentPage: number;
  changePrevPage: () => void;
  changeNextPage: () => void;
  changeClickedPage: (e: MouseEvent<HTMLSpanElement>) => void;
}

export default function CategoryFooter({
  totalPage,
  currentPage,
  changePrevPage,
  changeNextPage,
  changeClickedPage,
}: CategoryFooterProps) {
  return (
    <>
      {totalPage >= 1 && (
        <StyleFlexFooterBox>
          <div style={{ display: 'flex', gap: '1rem', flexDirection: 'row', justifyContent: 'center' }}>
            <StylePageNumber disabled={currentPage === 1} onClick={changePrevPage}>
              {'<'}
            </StylePageNumber>
            {Array.from({ length: totalPage }, (_, i) => i + 1).map(page =>
              currentPage === page ? (
                <StylePageTargetNumber key={page}>{page}</StylePageTargetNumber>
              ) : (
                <StylePageNumber onClick={changeClickedPage} key={page}>
                  {page}
                </StylePageNumber>
              ),
            )}
            <StylePageNumber disabled={currentPage === totalPage} onClick={changeNextPage}>
              {'>'}
            </StylePageNumber>
          </div>
        </StyleFlexFooterBox>
      )}
    </>
  );
}

const StyleFlexFooterBox = styled.div`
  text-align: center;
`;

const StylePageNumber = styled.button`
  padding: 0.3rem 0.5rem;
  border-radius: 3px;
  border: none;

  font-family: Noto Sans KR;

  &:hover:not(:disabled) {
    background-color: #009ca6;
    color: white;
    cursor: pointer;
  }
`;

const StylePageTargetNumber = styled(StylePageNumber)`
  background-color: #009ca6;
  color: white;
`;
