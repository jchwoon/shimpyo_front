import styled from 'styled-components';

export default function CommonFooter() {
  return (
    <StyleFlex>
      <div className="a">
        <p>© 2023 Shimpyo. All rights reserved.</p>
      </div>
      <div className="underline"></div>
      <div className="b">
        웹사이트 제공자: Airbnb Ireland UC, private unlimited company, 8 Hanover Quay Dublin 2, D02 DP23 Ireland | 이사:
        Dermot Clarke, Killian Pattwell, Andrea Finnegan | VAT 번호: IE9827384L | 사업자 등록 번호: IE 511825 | 연락처:
        terms@airbnb.com, 웹사이트, 080-822-0230 | 호스팅 서비스 제공업체: 아마존 웹서비스 | 에어비앤비는 통신판매
        중개자로 에어비앤비 플랫폼을 통하여 게스트와 호스트 사이에 이루어지는 통신판매의 당사자가 아닙니다. 에어비앤비
        플랫폼을 통하여 예약된 숙소, 체험, 호스트 서비스에 관한 의무와 책임은 해당 서비스를 제공하는 호스트에게
        있습니다.
      </div>
    </StyleFlex>
  );
}

const StyleFlex = styled.div`
  display: flex;
  flex-direction: column;
  .a {
    padding: 15px 0;
  }
  .b {
    color: rgb(120, 120, 120);
    word-break: keep-all;
    font-size: 3px;
    margin: 8px 0;
  }
  .underline {
    height: 1px;
    background-color: rgb(200, 200, 200);
  }
`;
