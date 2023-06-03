import styled from 'styled-components';
import InfoItem from './InfoItem';

export default function Info() {
  return (
    <StyleInfoBox>
      <InfoItem
        contentMessage="ㅣㅣㅏ"
        warningMessage="숙소 등록을 완료하려면 필수"
        linkMessage="계속"
        title="중요 정보 입력하기"
      />
      <InfoItem warningMessage="6월 20일까지 완료하셔야 합니다." linkMessage="본인 인증하기" title="본인 인증 필요" />
      <InfoItem warningMessage="6월 20일까지 완료하셔야 합니다." linkMessage="본인 인증하기" title="본인 인증 필요" />
      <InfoItem
        contentMessage="ㅣㅣㅏ"
        warningMessage="숙소 등록을 완료하려면 필수"
        linkMessage="계속"
        title="중요 정보 입력하기"
      />
    </StyleInfoBox>
  );
}

const StyleInfoBox = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(330px, 1fr));
  gap: 1rem;
  margin-top: 4rem;
`;
