export const emailValidation = /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]{1,4}$/;

export const passwordRule = /^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,20}$/;

export const secondPasswordRule = /(\w)\1\1/;

export const nicknameRule = /^[a-zA-Zㄱ-힣0-9]{2,8}$/;
