import { atom } from 'recoil';

export const activeRoom = atom<string | null>({
    key: 'activeRoom',
    default: null,
});

export const activeRoomPrice = atom<number | null>({
    key: 'activeRoomPrice',
    default: null,
});

export const activeRoomName = atom<string>({
    key: 'activeRoomName',
    default: '',
});

export const activeRoomNumber = atom<number>({
    key: 'activeRoomNumber',
    default: 0,
});

export const merchantUid = atom<string>({
    key: 'merchantUid',
    default: '',
})

export const couponList = atom<Array<any>>({
    key: 'couponList',
    default: [],
})

export const swipePageState = atom<number>({
    key: 'swipePageState',
    default: 0,
})