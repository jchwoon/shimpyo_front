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
    '숙소에 갖춰진 편의시설, 옵션과 사진을 추가한 후 숙소 이름과 설명을 작성하시면 됩니다.',
  ],
  THR: ['3단계', '객실을 등록하세요', '숙소에 다양한 객실을 추가 등록해보세요.'],
  FOR: ['4단계', '등록을 완료하세요', '마지막 단계에서는 미리보기 확인 후에 등록을 완료하세요.'],
};

export const stepContentVideo = {
  ONE: '/videos/video1.mp4',
  TWO: '/videos/video2.mp4',
  THR: '/videos/video2.mp4',
  FOR: '/videos/video3.mp4',
};

export const stepContentImage = {
  ONE: '/images/start1.png',
  TWO: '/images/start2.png',
  THR: '/images/start3.png',
  FOR: '/images/start4.png',
};
