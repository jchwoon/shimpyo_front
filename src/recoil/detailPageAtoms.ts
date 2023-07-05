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

