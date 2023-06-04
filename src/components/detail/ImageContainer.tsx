import styled from 'styled-components';

export default function ImageContainer() {
  return (
    <ImageBox>
      <MainImage src="https://a0.muscache.com/im/pictures/7ea9f758-6fd4-4b4c-9aa0-bcb3ed503d65.jpg?im_w=960" />
      <SideImageBox>
        <SideImage
          src="https://a0.muscache.com/im/pictures/7ea9f758-6fd4-4b4c-9aa0-bcb3ed503d65.jpg?im_w=960"
          marginBottom="10px"
        />
        <SideImage src="https://a0.muscache.com/im/pictures/7ea9f758-6fd4-4b4c-9aa0-bcb3ed503d65.jpg?im_w=960" />
      </SideImageBox>
      <SideImageBox>
        <SideImage
          src="https://a0.muscache.com/im/pictures/7ea9f758-6fd4-4b4c-9aa0-bcb3ed503d65.jpg?im_w=960"
          marginBottom="10px"
        />
        <SideImage src="https://a0.muscache.com/im/pictures/7ea9f758-6fd4-4b4c-9aa0-bcb3ed503d65.jpg?im_w=960" />
      </SideImageBox>
    </ImageBox>
  );
}

const ImageBox = styled.div`
  display: flex;
  width: 100%;
  height: 500px;
`;

const MainImage = styled.img`
  width: 50%;
  height: 100%;
  cursor: pointer;
  object-fit: cover;
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

const SideImage = styled.img<ISideImage>`
  width: 100%;
  margin-bottom: ${p => p.marginBottom ?? '0px'};
  background-color: red;
  cursor: pointer;
  object-fit: cover;
`;
