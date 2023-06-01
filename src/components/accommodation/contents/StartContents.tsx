import styled from 'styled-components';

export default function StartContents() {
  return (
    <Container>
      <StyledMainTitle>
        간단하게
        <br />
        쉼표
        <br />
        숙소등록을 시작할 수 있습니다.
      </StyledMainTitle>
      <StyledStepList>
        <StyledStepElement>
          <StyledTextContainer>
            <StyledStepTitle>1. 숙소 정보를 알려주세요.</StyledStepTitle>
            <StyledStepContent>숙소 위치와 숙박 가능 인원 등 기본 정보를 알려주세요.</StyledStepContent>
          </StyledTextContainer>
          <StyledImage src="icon.jpg" />
        </StyledStepElement>
        <StyledStepElement>
          <StyledTextContainer>
            <StyledStepTitle>2. 숙소를 돋보이게 하세요.</StyledStepTitle>
            <StyledStepContent>
              사진을 5장 이상 제출하고 제목과 설명을 추가해주시면 숙소가 돋보일 수 있도록 도와드릴게요.
            </StyledStepContent>
          </StyledTextContainer>
          <StyledImage src="icon.jpg" />
        </StyledStepElement>
        <StyledStepElement>
          <StyledTextContainer>
            <StyledStepTitle>3. 등록을 완료하세요.</StyledStepTitle>
            <StyledStepContent>숙소 요금을 설정한 후 등록을 완료하세요.</StyledStepContent>
          </StyledTextContainer>
          <StyledImage src="icon.jpg" />
        </StyledStepElement>
      </StyledStepList>
    </Container>
  );
}

const Container = styled.main`
  display: flex;
`;

const StyledMainTitle = styled.h1`
  font-size: 50px;
  width: 9em;
  line-height: 1.3em;
  font-weight: 600;
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
