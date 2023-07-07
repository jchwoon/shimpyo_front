import styled from 'styled-components';
import classes from '../../../shared/Loading.module.css';

export default function Loading() {
  return (
    <StyleLoadingBox>
      <div className={classes.ldsEllipsis}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </StyleLoadingBox>
  );
}

const StyleLoadingBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;
