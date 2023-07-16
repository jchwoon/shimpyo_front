export const ACCOMMODATION_PAGE = '/accommodation';

export const PAGE_NUMBERS = [5, 5, 2, 2];

export const ALL_STEP_NUMBER = 14;

export const NAME_TEXT_LIMIT = 32;

export const CONTENTS_TEXT_LIMIT = 500;

export const STATUS = { COMPLETE: '예약 완료', USING: '사용중', FINISHED: '이용 완료' };

export interface Room {
  name: string;
  price: number;
  minPeople: number;
  maxPeople: number;
  bedCount: number;
  bedroomCount: number;
  bathroomCount: number;
  totalCount: number;
  checkIn: string;
  checkOut: string;
  imageCount: number;
}

export interface Accommodation {
  name: string;
  type: string;
  option: { wifi: boolean; pc: boolean; parking: boolean; bbq: boolean };
  rooms: Room[];
  address: { postCode: string; sido: string; sigungu: string; fullAddress: string; lat: number; lng: number };
  contents: string;
}

export interface ImageItem {
  image?: string;
  isFocused?: boolean;
}
