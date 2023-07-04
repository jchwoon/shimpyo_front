import styled from 'styled-components';
import Main from '../layout/Main';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function WishListMain() {
  const navigation = useNavigate();
  const [wishList, setWishList] = useState([
    { id: 1, mainImage: '/images/image.png', secondImage: '/images/image.png', thirdImage: '/images/image.png' },
    { id: 2, mainImage: '/images/image.png', secondImage: '/images/image.png', thirdImage: '/images/image.png' },
    { id: 3, mainImage: '/images/image.png', secondImage: '/images/image.png', thirdImage: '/images/image.png' },
    { id: 4, mainImage: '/images/image.png', secondImage: '/images/image.png', thirdImage: '/images/image.png' },
  ]);

  return (
    <Main>
      <StyleTitle>관심 숙소</StyleTitle>
      <StyleGridBox>
        {wishList.map(item => (
          <ImageBox
            onClick={() => {
              navigation(`/detail/1`);
            }}
            key={item.id}
          >
            <StyleMainImageBox>
              <MainImage src={item.mainImage} style={{ borderRadius: '20px 0 0 20px' }} />
            </StyleMainImageBox>
            <SideImageBox>
              <div style={{ height: '50%', width: '100%' }}>
                <SideImage src={item.secondImage} style={{ borderRadius: '0 20px 0 0' }} />
              </div>
              <div style={{ height: '50%', width: '100%' }}>
                <SideImage src={item.thirdImage} style={{ borderRadius: '0 0 20px 0' }} />
              </div>
            </SideImageBox>
          </ImageBox>
        ))}
      </StyleGridBox>
    </Main>
  );
}

const StyleTitle = styled.h1`
  margin-top: 100px;
  margin-bottom: 50px;
  font-size: 30px;
  font-weight: bold;
`;

const StyleGridBox = styled.div`
  display: grid;
  gap: 20px;
  grid-template-columns: 1fr;

  @media only screen and (min-width: 644px) {
    grid-template-columns: 1fr 1fr;
  }

  @media only screen and (min-width: 1096px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

const ImageBox = styled.div`
  display: grid;
  cursor: pointer;
  grid-template-columns: 2fr 1fr;
  gap: 1px;
  position: relative;
  height: 200px;
`;

const StyleMainImageBox = styled.div`
  height: 200px;
  width: 100%;
`;

const MainImage = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
  object-position: center;
  border-radius: 20px 0 0 20px;
`;

const SideImageBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1px;
  height: 200px;
  width: 100%;
`;

const SideImage = styled.img`
  object-position: center;
  object-fit: cover;
  height: 100%;
  width: 100%;
`;
