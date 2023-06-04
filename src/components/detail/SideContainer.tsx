import styled from 'styled-components';
import { AiOutlineRight } from 'react-icons/ai';
import { BiBed } from 'react-icons/bi';
import { BsSunset } from 'react-icons/bs';

export default function SideContainer() {
  return (
    <Container>
      <HotelTitle>Onda 님이 호스팅하는 펜션</HotelTitle>
      <HotelDetail>최대 인원 4명 · 침실 2개 · 침대 2개 · 욕실 1개</HotelDetail>
      <HostImg></HostImg>
      <HotelDescription>
        안녕하세요. 저희는 다양한 휴식 공간을 연구하고 제공하는 Onda입니다. 이 곳에서 머무르실 모든 분들께서 편안하고
        행복한 시간을 보내시길 바랍니다. [숙소 소개] 넓고 푸른 바다를 바라보며 수영을 즐기고 온전한 휴식을 취할 수 있는
        숙소입니다.
      </HotelDescription>
      <SeeMore>
        더 보기 <AiOutlineRight />
      </SeeMore>
      <MainTitle>숙박 장소</MainTitle>
      <RoomIconContainer>
        <RoomIconCard>
          <RoomIcon>
            <BiBed />
          </RoomIcon>
          <RoomIconTitle>침실 1</RoomIconTitle>
          <RoomIconDetail>더블 침대 1개</RoomIconDetail>
        </RoomIconCard>
        <RoomIconCard>
          <RoomIcon>
            <BiBed />
          </RoomIcon>
          <RoomIconTitle>침실 2</RoomIconTitle>
          <RoomIconDetail>더블 침대 1개</RoomIconDetail>
        </RoomIconCard>
        <RoomIconCard>
          <RoomIcon>
            <BiBed />
          </RoomIcon>
          <RoomIconTitle>침실 3</RoomIconTitle>
          <RoomIconDetail>더블 침대 1개</RoomIconDetail>
        </RoomIconCard>
      </RoomIconContainer>
      <MainTitle>숙소 편의시설</MainTitle>
      <FacilityContainer>
        <FacilityText>
          <BsSunset style={{ fontSize: '24px', marginRight: '10px' }} /> 해변과 밀접
        </FacilityText>
        <FacilityText>
          <BsSunset style={{ fontSize: '24px', marginRight: '10px' }} /> 해변과 밀접
        </FacilityText>
        <FacilityText>
          <BsSunset style={{ fontSize: '24px', marginRight: '10px' }} /> 해변과 밀접
        </FacilityText>
        <FacilityText>
          <BsSunset style={{ fontSize: '24px', marginRight: '10px' }} /> 해변과 밀접
        </FacilityText>
        <FacilityText>
          <BsSunset style={{ fontSize: '24px', marginRight: '10px' }} /> 해변과 밀접
        </FacilityText>
      </FacilityContainer>
      <ShowAllBtn>편의시설 22개 모두 보기</ShowAllBtn>
      <MainTitle>★ 4.88 · 후기 112개</MainTitle>
      <CommentCardContainer>
        <CommentCard>
          <CommentTop>
            <UserImg />
            <UserRight>
              <UserName>Kyung Rok</UserName>
              <CommentDate>2023. 05</CommentDate>
            </UserRight>
          </CommentTop>
          <CommentBottom>
            부모님께서 이모님들 가족과 총 10명 방문했었습니다. 아버지께서 예약을 부탁하셨는데 약간 호들갑이셔서 사전
            답사도 해야한다고 미리 방문을 해봐도 될지 요청드렸는데 흔쾌히 허락해주셔서 너무 죄송하면서도 감사했습니다.
            추가로 경관도 좋고 주차도 용이하며, 내부에 즐길거리가 많아서 정말 좋습니다. 이모님들 일부는 신나게
            음주가무를 즐기시고 이모부님들은 당구를 치면서 시간 가는줄 모르셨다고 합니다 ㅎㅎ 단양쪽 단체로 어른신들
            같이 있을 곳 찾으신다면 이 곳 강추합니다!!
          </CommentBottom>
        </CommentCard>
      </CommentCardContainer>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  width: 60%;
  height: auto;
  background-color: beige;
`;

const HotelTitle = styled.div`
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

const SeeMore = styled.div`
  text-decoration: underline;
  font-weight: bold;
  display: flex;
  align-items: center;
  text-align: center;
  margin-top: 12px;
  padding-bottom: 30px;
  cursor: pointer;
`;

const RoomIconContainer = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 48px;
`;

const MainTitle = styled.div`
  border-top: 1px solid #666;
  padding: 48px 0 24px 0;
  font-size: 22px;
  font-weight: 600;
`;

const RoomIconCard = styled.div`
  padding: 24px;
  border-radius: 12px;
  border: 1px solid #666;
  width: 150px;
  height: 100px;
  margin-right: 14px;
`;

const RoomIcon = styled.div`
  margin-bottom: 14px;
  font-size: 24px;
`;

const RoomIconTitle = styled.div`
  font-weight: 600;
  font-size: 16px;
  margin-bottom: 8px;
`;

const RoomIconDetail = styled.div`
  font-weight: 400;
  font-size: 14px;
`;

const FacilityContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const FacilityText = styled.div`
  margin-bottom: 14px;
  display: flex;
  text-align: center;
  align-items: center;
  width: 50%;
`;

const ShowAllBtn = styled.div`
  border-radius: 8px;
  margin-top: 12px;
  margin-bottom: 48px;
  padding: 13px 23px;
  border: 1px solid black;
  width: 180px;
  display: flex;
  justify-content: center;
`;

const CommentCardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
const CommentCard = styled.div`
  display: flex;
  width: 50%;
`;
const CommentTop = styled.div``;
const CommentBottom = styled.div`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
`;
const UserRight = styled.div``;
const CommentDate = styled.div``;
const UserName = styled.div``;
const UserImg = styled.div``;
