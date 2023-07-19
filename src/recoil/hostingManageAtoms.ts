import { atom } from 'recoil';
import { AccommodationData, RoomData } from '../components/HostingManage/HostingManageMain';

export const accommodationDataState = atom<AccommodationData>({
  key: 'accommodationDataState',
  default: {
    houseId: 0,
    name: '',
    type: 'HOTEL',
    options: [],
    contents: '',
    postCode: '',
    sido: '',
    sigungu: '',
    fullAddress: '',
    lat: 0,
    lng: 0,
    houseImages: [],
    likeReviewCount: 0,
    totalReviewCount: 0,
  },
});

export const roomDataState = atom<RoomData[]>({
  key: 'roomDataState',
  default: [
    {
      roomId: 0,
      name: '',
      price: 0,
      minPeople: 0,
      maxPeople: 0,
      bedCount: 0,
      bedroomCount: 0,
      bathroomCount: 0,
      totalCount: 0,
      checkIn: '',
      checkOut: '',
      roomImages: [],
    },
  ],
});

export const patchHouseReqState = atom({
  key: 'patchHouseReqState',
  default: {
    name: '',
    type: 'MOTEL',
    option: {
      wifi: false,
      pc: false,
      parking: false,
      bbq: false,
    },
    address: {
      postCode: '',
      sido: '',
      sigungu: '',
      fullAddress: '',
      lat: 0,
      lng: 0,
    },
    contents: '',
    patchImageReqs: [] as { imageCount: number; imageStatus: string }[],
  },
});

export const patchRoomReqState = atom({
  key: 'patchRoomReqState',
  default: {
    name: '',
    price: 0,
    minPeople: 1,
    maxPeople: 1,
    bedCount: 0,
    bedroomCount: 0,
    bathroomCount: 0,
    totalCount: 0,
    checkIn: '',
    checkOut: '',
    patchImageReqs: [] as { imageCount: number; imageStatus: string }[],
  },
});

export const originalAccommodationDataState = atom<AccommodationData>({
  key: 'originalAccommodationDataState',
  default: {
    houseId: 0,
    name: '',
    type: 'HOTEL',
    options: [],
    contents: '',
    postCode: '',
    sido: '',
    sigungu: '',
    fullAddress: '',
    lat: 0,
    lng: 0,
    houseImages: [],
    likeReviewCount: 0,
    totalReviewCount: 0,
  },
});

export const originalRoomDataState = atom<RoomData[]>({
  key: 'originalRoomDataState',
  default: [
    {
      roomId: 0,
      name: '',
      price: 0,
      minPeople: 0,
      maxPeople: 0,
      bedCount: 0,
      bedroomCount: 0,
      bathroomCount: 0,
      totalCount: 0,
      checkIn: '',
      checkOut: '',
      roomImages: [],
    },
  ],
});

export const originalPatchHouseReqState = atom({
  key: 'originalPatchHouseReqState',
  default: {
    name: '',
    type: 'MOTEL',
    option: {
      wifi: false,
      pc: false,
      parking: false,
      bbq: false,
    },
    address: {
      postCode: '',
      sido: '',
      sigungu: '',
      fullAddress: '',
      lat: 0,
      lng: 0,
    },
    contents: '',
    patchImageReqs: [] as { imageCount: number; imageStatus: string }[],
  },
});

export const formDataState = atom({
  key: 'formDataState',
  default: new FormData(),
});

export const lastDeleteIndexState = atom<number>({
  key: 'lastDeleteIndexState',
  default: 0,
});

export const currentRoomDataIndexState = atom<number>({
  key: 'currentRoomDataIndexState',
  default: 0,
});
