import styled from 'styled-components';
import classes from './Loading.module.css';
import Logo from './Logo';

export default function Loading() {
  return (
    <StyleLoadingBox>
      <Logo heihgt="50" width="100" path="" />
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
  height: 100vh;
`;
