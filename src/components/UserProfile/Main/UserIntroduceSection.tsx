import { useState } from 'react';
import styled from 'styled-components';

interface UserIntroduceSectionProps {
  introduce: string;
  nickname: string;
}

export default function UserIntroduceSection({ introduce, nickname }: UserIntroduceSectionProps) {
  const [isOpenIntroduce, setIsOpenIntroduce] = useState(false);
  return (
    <StyleUserProfileDetailBox>
      <h2 style={{ fontSize: '20px', fontWeight: 'bold', wordBreak: 'keep-all' }}>
        {introduce ? `${nickname} 님의 소개` : `${nickname} 님은 아직 프로필을 업데이트하지 않았습니다`}
      </h2>
      <div style={{ marginTop: '20px' }}>
        <StyleIntroduce>
          <span>{isOpenIntroduce ? introduce : introduce.slice(0, 200)}</span>
          <StyleToggleButton onClick={() => setIsOpenIntroduce(prev => !prev)}>
            {isOpenIntroduce ? '간략히' : '펼치기'}
          </StyleToggleButton>
        </StyleIntroduce>
      </div>
    </StyleUserProfileDetailBox>
  );
}

const StyleUserProfileDetailBox = styled.div`
  width: 350px;
  margin-top: 30px;
`;

const StyleIntroduce = styled.span`
  width: 100px;
  font-size: 17px;
  line-height: 24px;
  word-break: keep-all;
`;

const StyleToggleButton = styled.button`
  font-size: 16px;
  text-decoration: underline;
  margin: 7px;
  color: rgb(120, 120, 120);
  cursor: pointer;
`;
