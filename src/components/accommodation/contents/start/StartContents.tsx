import styled from 'styled-components';

export default function StartContents() {
  return (
    <Container>
      <StyledTitleDiv>
        <StyledMainTitle>
          <StyledText>간단하게 </StyledText>
          쉼표
          <StyledText> 숙소 등록을</StyledText> 시작할 수 있습니다.
        </StyledMainTitle>
      </StyledTitleDiv>
      <StyledStepList>
        <StyledStepElement>
          <StyledTextContainer>
            <StyledStepTitle>1. 숙소 정보를 알려주세요.</StyledStepTitle>
            <StyledStepContent>숙소 위치와 숙박 가능 인원 등 기본 정보를 알려주세요.</StyledStepContent>
          </StyledTextContainer>
          <StyledImage src="" />
        </StyledStepElement>
        <StyledStepElement>
          <StyledTextContainer>
            <StyledStepTitle>2. 숙소를 돋보이게 하세요.</StyledStepTitle>
            <StyledStepContent>
              사진을 5장 이상 제출하고 제목과 설명을 추가해주시면 숙소가 돋보일 수 있도록 도와드릴게요.
            </StyledStepContent>
          </StyledTextContainer>
          <StyledImage src="" />
        </StyledStepElement>
        <StyledStepElement>
          <StyledTextContainer>
            <StyledStepTitle>3. 객실을 등록하세요.</StyledStepTitle>
            <StyledStepContent>다양한 객실을 설정해보세요.</StyledStepContent>
          </StyledTextContainer>
          <StyledImage src="" />
        </StyledStepElement>
        <StyledStepElement>
          <StyledTextContainer>
            <StyledStepTitle>4. 등록을 완료하세요.</StyledStepTitle>
            <StyledStepContent>숙소 요금을 설정한 후 등록을 완료하세요.</StyledStepContent>
          </StyledTextContainer>
          <StyledImage src="" />
        </StyledStepElement>
      </StyledStepList>
    </Container>
  );
}

const Container = styled.main`
  display: flex;

  @media (max-width: 770px) {
    flex-direction: column;
  }
`;

const StyledTitleDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  width: 50vw;
  max-width: 700px;

  @media (max-width: 770px) {
    width: 100%;
  }
`;

const StyledText = styled.p`
  @media (max-width: 770px) {
    font-size: 36px;
    display: inline;
  }
`;

const StyledMainTitle = styled.h1`
  font-size: 56px;
  line-height: 1.2em;
  font-weight: 500;
  max-width: 510px;

  @media (max-width: 770px) {
    font-size: 36px;
  }
`;

const StyledStepList = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 20px;
`;

const StyledStepElement = styled.li`
  display: flex;
  margin-bottom: 15px;
  padding-bottom: 40px;
  border-bottom: 3px solid rgba(0, 0, 0, 0.1);
  &:last-child {
    padding-bottom: 0;
    margin-bottom: 0;
    border-bottom: 0;
  }
`;

const StyledTextContainer = styled.div``;

const StyledStepTitle = styled.h2`
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 10px;
`;

const StyledStepContent = styled.p`
  font-size: 14px;
  color: rgba(0, 0, 0, 0.4);
  width: 320px;
`;

const StyledImage = styled.img`
  width: 50px;
  margin-left: 10px;
`;
