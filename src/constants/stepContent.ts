export interface stepConstants {
  ONE: string[];
  TWO: string[];
  THR: string[];
  FOR: string[];
}

export const stepContent: stepConstants = {
  ONE: ['1단계', '숙소 정보를 알려주세요', '숙소 유형과 숙소 위치, 수용가능 최대 인원등을 알려주세요.'],
  TWO: [
    '2단계',
    '숙소의 매력을 돋보이게 하세요',
    '숙소에 갖춰진 편의시설, 옵션과 사진 5장 이상을 추가한 후 숙소 이름과 설명을 작성하시면 됩니다.',
  ],
  THR: ['3단계', '객실을 등록하세요', '숙소에 다양한 객실을 추가 등록해보세요.'],
  FOR: [
    '4단계',
    '등록을 완료하세요',
    '마지막 단계에서는 1박 요금을 설정하실 수 있습니다. 미리보기 확인 후에 등록을 완료하세요.',
  ],
};
