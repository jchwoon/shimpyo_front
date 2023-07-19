import { atom } from 'recoil';

export const Height = atom<string>({
    key: 'Height',
    default: '80px',
});

export const Display = atom<boolean>({
    key: 'Display',
    default: false,
});

export const Change = atom<boolean>({
    key: 'Change',
    default: false,
});

export const AdultGuest = atom<number>({
    key: 'AdultGuest',
    default: 0,
});

export const ChildGuest = atom<number>({
    key: 'ChildGuest',
    default: 0,
});

export const InfantGuest = atom<number>({
    key: 'InfantGuest',
    default: 0,
});

export const FirstPickedDate = atom<string | null>({
    key: 'FirstPickedDate',
    default: '',
});

export const SecondPickedDate = atom<string | null>({
    key: 'SecondPickedDate',
    default: '',
});

export const googleMapsPlaceholder = atom<string>({
    key: 'googleMapsPlaceholder',
    default: '',
});

export const PlaceholderChanged = atom<boolean>({
    key: 'PlaceholderChanged',
    default: false,
});

export const HouseType = atom<number>({
    key: 'HouseType',
    default: 0,
});

interface MainTextMatchedSubstrings {
    offset: number;
    length: number;
}
interface StructuredFormatting {
    main_text: string;
    secondary_text: string;
    main_text_matched_substrings?: readonly MainTextMatchedSubstrings[];
}
interface PlaceType {
    description: string;
    structured_formatting: StructuredFormatting;
    types: string[]
}

export const objectPlaceholder = atom<PlaceType>({
    key: 'objectPlaceholder',
    default: {
        description: '',
        structured_formatting: {
            main_text: '',
            secondary_text: '',
            main_text_matched_substrings: [],
        },
        types: ['']
    },
});

export const navbarMenuControl = atom<null | HTMLElement>({
    key: 'navbarMenuControl',
    default: null
})