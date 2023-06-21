import styled from 'styled-components';
import { AiOutlineRight } from 'react-icons/ai';

export default function BottomContainer() {
  return (
    <>
      <MainTitle>★ 4.88 · 후기 112개</MainTitle>
      <CommentCardContainer>
        {[1, 2, 3, 4, 5].map(i => {
          return (
            <CommentCard key={i}>
              <CommentTop>
                <UserImg src="https://jmagazine.joins.com/_data/photo/2015/02/3696639864_0BMtU3sK_44.jpg" />
                <UserRight>
                  <UserName>Su Yeon</UserName>
                  <CommentDate>2023년 5월</CommentDate>
                </UserRight>
              </CommentTop>
              <CommentBottom>
                부모님께서 이모님들 가족과 총 10명 방문했었습니다. 아버지께서 예약을 부탁하셨는데 약간 호들갑이셔서 사전
                답사도 해야한다고 미리 방문을 해봐도 될지 요청드렸는데 흔쾌히 허락해주셔서 너무 죄송하면서도
                감사했습니다. 추가로 경관도 좋고 주차도 용이하며, 내부에 즐길거리가 많아서 정말 좋습니다. 이모님들
                일부는 신나게 음주가무를 즐기시고 이모부님들은 당구를 치면서 시간 가는줄 모르셨다고 합니다 ㅎㅎ 단양쪽
                단체로 어른신들 같이 있을 곳 찾으신다면 이 곳 강추합니다!!
              </CommentBottom>
            </CommentCard>
          );
        })}
      </CommentCardContainer>
      <MainTitle>호스팅 지역</MainTitle>
      <HostingMap />
      <HostingLocation>Ungok-myeon, Cheongyang-gun, 충청남도, 한국</HostingLocation>
      <HostingLocationDetail>
        청양의 유명한 관광지 안내해 드릴께요. 먼저 칠갑산은 아시죠? 그리 높지는 않지만 콩밭메는 아낙네의 배경이
        칠갑산이니까 잠깐 둘러보는것도 좋습니다. 천장호 출렁다리는 꼭한번 가보세요. 호수 주변을 산책하기 좋은 곳 입니다.
        또한 국내 최대 식물원인 고운식물원도 산책하며 힐링하시기에는 좋습니다. 알프스 마을도 천장호에서 멀지 않은곳에
        있으니 꼭 들려보세요..날씨가 푹해져서 지금은 어떨지? 모르지만 구경하기에는 좋습니다. 2.7일로 끝나는 날은 청양
        오일장구경도 괜찮구요. 특산물로는 구기자와 고추가 있습니다. 즐거운 여행되세요.
      </HostingLocationDetail>
      <SeeMore>
        더 보기 <AiOutlineRight />
      </SeeMore>
    </>
  );
}

const MainTitle = styled.div`
  padding: 48px 0 24px 0;
  font-size: 22px;
  font-weight: 600;
  @media screen and (max-width: 900px){
    padding-left : 20px;
  };
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
  @media screen and (max-width: 900px){
    padding-left : 20px;
  };
`;
const CommentCardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding-top: 20px;
    @media screen and (max-width: 900px){
    padding-left : 20px;
  };
`;
const CommentCard = styled.div`
  margin-bottom: 30px;
  padding-right: 40px;
  width: calc(50% - 40px);
`;
const CommentTop = styled.div`
  display: flex;
  width: 100%;
`;
const CommentBottom = styled.div`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  padding-top: 20px;
`;
const UserRight = styled.div`
  padding-left: 10px;
  height: 50px;
`;
const CommentDate = styled.div`
  font-weight: lighter;
`;
const UserName = styled.div``;
const UserImg = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 100%;
  object-fit: cover;
`;

const HostingMap = styled.div`
  margin-bottom: 20px;
  background-color: magenta;
  width: 100%;
  height: 480px;
`;

const HostingLocation = styled.div`
  font-size: 16px;
  font-weight: bold;
    @media screen and (max-width: 900px){
    padding-left : 20px;
  };
`;

const HostingLocationDetail = styled.div`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  font-size: 16px;
  @media screen and (max-width: 900px){
    padding : 0 20px;
  };
`;
