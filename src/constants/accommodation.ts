export const PAGE_NUMBERS = [5, 5, 2, 2];

export const ALL_STEP_NUMBER = 14;

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
  room: Room[];
  address: { postCode: string; sido: string; sigungu: string; fullAddress: string; lat: number; lng: number };
  contents: string;
}

export interface ImageItem {
  image?: string;
  isFocused: boolean;
}
