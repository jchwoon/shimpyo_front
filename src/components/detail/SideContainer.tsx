import styled from 'styled-components';

export default function SideContainer() {
  return (
    <Container>
      <HotelTItle>Onda 님이 호스팅하는 펜션</HotelTItle>
      <HotelDetail>최대 인원 4명 · 침실 2개 · 침대 2개 · 욕실 1개</HotelDetail>
      <HostImg></HostImg>
      <HotelDescription>
        안녕하세요. 저희는 다양한 휴식 공간을 연구하고 제공하는 Onda입니다. 이 곳에서 머무르실 모든 분들께서 편안하고
        행복한 시간을 보내시길 바랍니다. [숙소 소개] 넓고 푸른 바다를 바라보며 수영을 즐기고 온전한 휴식을 취할 수 있는
        숙소입니다.
      </HotelDescription>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  width: 60%;
  height: auto;
  background-color: beige;
`;

const HotelTItle = styled.div`
  font-size: 26px;
  font-weight: bold;
  margin-bottom: 4px;
`;
const HotelDetail = styled.div`
  width: 100%;
  border-bottom: 1px solid #666;
  padding-bottom: 24px;
`;
const HostImg = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 56px;
  height: 56px;
  border-radius: 100%;
  background-color: magenta;
`;

const HotelDescription = styled.div`
  margin-top: 24px;
`;
