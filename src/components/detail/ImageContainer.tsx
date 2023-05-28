import styled from 'styled-components';

export default function ImageContainer() {
  return (
    <ImageBox>
      <MainImage />
      <SideImageBox>
        <SideImage marginBottom="10px" />
        <SideImage />
      </SideImageBox>
      <SideImageBox>
        <SideImage marginBottom="10px" />
        <SideImage />
      </SideImageBox>
    </ImageBox>
  );
}

const ImageBox = styled.div`
  display: flex;
  width: 100%;
  height: 300px;
`;

const MainImage = styled.div`
  width: 50%;
  height: 100%;
  background-color: aqua;
  cursor: pointer;
`;

const SideImageBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: calc(25% - 10px);
  margin-left: 10px;
`;

interface ISideImage {
  marginBottom?: string;
}

const SideImage =
  styled.div <
  ISideImage >
  `
  width: 100%;
  margin-bottom: ${p => p.marginBottom ?? '0px'};
  background-color: red;
  cursor: pointer;
`;
