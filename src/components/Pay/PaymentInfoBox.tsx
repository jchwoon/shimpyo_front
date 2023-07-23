import styled from "@emotion/styled"
import { Typography, Divider, Button, Card } from "@mui/material"
import React from "react"
import { useEffect } from "react"
import moment from "moment";
import 'moment/locale/ko'

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ColorButton from "../shared/UI/ColorButton";
import Radio from '@mui/material/Radio';

import {
    merchantUid, activeRoomName, activeRoomNumber,
    couponList, paymentRadioSelected, couponRadio
} from '../../recoil/detailPageAtoms';
import useAuthorizedRequest from "../../hooks/useAuthorizedRequest";
import useHttpRequest from "../../hooks/useHttpRequest";
import { accessTokenAtom, loginStateAtom, phoneValueAtom, nameValueAtom } from "../../recoil/userAtoms";
import { useRecoilState, useRecoilValue } from "recoil";
import { AxiosError } from 'axios';
import { MEMBER_RESERVATION_API_PATH, NON_MEMBER_RESERVATION_API_PATH, NON_MEMBER_RESERVATION_TEXT_API_PATH } from "../../constants/api/reservationApi";

import { Navigate, useNavigate } from "react-router-dom";
import { useState } from 'react'

import { v4 as uuidv4 } from 'uuid';

import { Dispatch, SetStateAction } from 'react';

interface ResultData {
    accessToken: string;
}

interface PaymentInfoBoxProp {
    houseName: string;
    checkInDate: string | null;
    checkOutDate: string | null;
    price: number | null;
    houseId: string;
    GuestCount: number;
    setOpen: Dispatch<SetStateAction<boolean>>;
    setAlertOpen: Dispatch<SetStateAction<boolean>>;
    setAlertMessage: Dispatch<SetStateAction<string>>;
}

declare const window: typeof globalThis & {
    IMP: any;
};

interface RequestPayAdditionalParams {
    digital?: boolean;
    vbank_due?: string;
    m_redirect_url?: string;
    app_scheme?: string;
    biz_num?: string;
}

interface Display {
    card_quota?: number[];
}

interface RequestPayParams extends RequestPayAdditionalParams {
    pg?: string;
    pay_method: string;
    escrow?: boolean;
    merchant_uid: string;
    name?: string;
    amount: number;
    custom_data?: any;
    tax_free?: number;
    currency?: string;
    language?: string;
    buyer_name?: string;
    buyer_tel: string;
    buyer_email?: string;
    buyer_addr?: string;
    buyer_postcode?: string;
    notice_url?: string | string[];
    display?: Display;
}

interface RequestPayAdditionalResponse {
    apply_num?: string;
    vbank_num?: string;
    vbank_name?: string;
    vbank_holder?: string | null;
    vbank_date?: number;
}

interface RequestPayResponse extends RequestPayAdditionalResponse {
    success: boolean;
    error_code: string;
    error_msg: string;
    imp_uid: string | null;
    merchant_uid: string;
    pay_method?: string;
    paid_amount?: number;
    status?: string;
    name?: string;
    pg_provider?: string;
    pg_tid?: string;
    buyer_name?: string;
    buyer_email?: string;
    buyer_tel?: string;
    buyer_addr?: string;
    buyer_postcode?: string;
    custom_data?: any;
    paid_at?: number;
    receipt_url?: string;
}

type RequestPayResponseCallback = (response: RequestPayResponse) => void;

export interface Iamport {
    init: (accountID: string) => void;
    request_pay: (
        params: RequestPayParams,
        callback?: RequestPayResponseCallback
    ) => void;
}

const PaymentInfoBox: React.FC<PaymentInfoBoxProp> = ({ houseName, checkInDate, checkOutDate, price, houseId, GuestCount, setOpen, setAlertOpen, setAlertMessage }) => {

    const DaysDifference = moment(checkOutDate).diff(moment(checkInDate), "days")
    const TotalPrice = price ? price * DaysDifference : 0

    const [couponRadioSelectedValue, setCouponRadioSelectedValue] = useState('');
    const [couponRadioSelectedDiscount, setCouponRadioSelectedDiscount] = useState(0);
    const [paymentRadioSelectedValue, setPaymentRadioSelectedValue] = useRecoilState(paymentRadioSelected);
    const [couponRadioId, setCouponRadioId] = useRecoilState(couponRadio);

    const DiscountPrice = TotalPrice ? TotalPrice * couponRadioSelectedDiscount / 100 : 0

    const handleCouponRadio = (value: string) => {
        if (value === '') { setCouponRadioSelectedValue(value) }
        else if (value === couponRadioSelectedValue) {
            setCouponRadioSelectedValue('')
        }
        else { setCouponRadioSelectedValue(value) }
    }

    const handleCouponDiscountRadio = (value: number) => {
        if (value === 0) { setCouponRadioSelectedDiscount(value) }
        else if (value === couponRadioSelectedDiscount) { setCouponRadioSelectedDiscount(0) }
        else { setCouponRadioSelectedDiscount(value) }
    }

    const handleCouponId = (value: number) => {
        if (value === 0) { setCouponRadioId(value) }
        else if (value === couponRadioId) { setCouponRadioId(0) }
        else { setCouponRadioId(value) }
    }

    const handleRadioClick = (stringValue: string, numberValue: number, couponId: number) => {
        handleCouponRadio(stringValue);
        handleCouponDiscountRadio(numberValue);
        handleCouponId(couponId);
    }

    const handlePaymentRadio = (value: string) => {
        if (value === '') { setPaymentRadioSelectedValue(value) }
        else if (value === paymentRadioSelectedValue) { setPaymentRadioSelectedValue('') }
        else { setPaymentRadioSelectedValue(value) }
    }

    const navigation = useNavigate();
    const [accessToken, setAccessToken] = useRecoilState(accessTokenAtom);
    const [isLoggedIn, setIsLoggedIn] = useRecoilState(loginStateAtom);

    const handleUnAutorization = (error: AxiosError) => {
        setIsLoggedIn(false);
        navigation('/');
        console.error(error.message);
    };

    const { responseData: memberPaymentResponseData, sendRequest: sendMemberPaymentRequest } = useAuthorizedRequest<ResultData>({
        onUnauthorized: handleUnAutorization,
    });

    const { responseData: noneMemberPaymentResponseData, sendRequest: sendNoneMemberPaymentRequest } = useHttpRequest();

    const memberUid = useRecoilValue(merchantUid)
    const couponListArray = useRecoilValue(couponList)
    const noneMemberMerchantUid = uuidv4()
    const noneMemberCustomerUid = uuidv4()

    const Name = useRecoilValue(activeRoomName)
    const roomId = useRecoilValue(activeRoomNumber)

    const nonMemberName = useRecoilValue(nameValueAtom);
    const nonMemberNumber = useRecoilValue(phoneValueAtom);

    const { responseData: noneMemberTextAfterPayResponseData, sendRequest: sendNoneMemberTextAfterPayRequest } = useHttpRequest();

    const [mobile, setMobile] = useState(false);
    useEffect(()=>{
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  if (isMobile) {
    // mobile
    setMobile(true);
  } else {
    // desktop
    setMobile(false);
  }
    },[])

    //회원 결제

    function memberRequestPay() {
        const { IMP } = window;
        IMP.init("imp62564523");

        const data = {
            pg: paymentRadioSelectedValue === '신용카드' ? "html5_inicis" : "kakaopay.TC0ONETIME",
            pay_method: "card",
            merchant_uid: `${memberUid}`,
            customer_uid: mobile ?`${noneMemberCustomerUid}`: null,
            name: `${houseName} / ${Name}`,
            amount: TotalPrice - DiscountPrice,
            m_redirect_url: `https://shimpyo.o-r.kr/member-mobile-order-complete/${houseId}`
        }

        async function callback(response: RequestPayResponse) {
            const {
                success,
                error_code,
                error_msg,
                imp_uid,
                merchant_uid,
            } = response;

            if (success) {
                await sendMemberPaymentRequest({
                    url: `${MEMBER_RESERVATION_API_PATH}`,
                    method: "POST",
                    withCredentials: true,
                    body: {
                        impUid: imp_uid,
                        roomId: roomId,
                        couponId: couponRadioId,
                        merchantUid: merchant_uid,
                        payMethod: paymentRadioSelectedValue === '신용카드' ? "KGINICIS" : "KAKAO",
                        peopleCount: GuestCount,
                        checkInDate: moment(checkInDate).format('YYYY.MM.DD'),
                        checkOutDate: moment(checkOutDate).format('YYYY.MM.DD')
                    }
                });
            } else {
                setOpen(false)
                setAlertOpen(true)
                setAlertMessage(error_msg)
            }
        }
        IMP.request_pay(data, callback);
    }

    useEffect(() => {
        if (!memberPaymentResponseData) return;
        if (memberPaymentResponseData.isSuccess === true) { navigation('/reservations?category=reservation'); }
        else if (memberPaymentResponseData.isSuccess === false) {
            setOpen(false)
            setAlertOpen(true)
            setAlertMessage(memberPaymentResponseData.message)
        }
    }, [memberPaymentResponseData])

    //비회원 결제

    function noneMemberRequestPay() {
        const { IMP } = window;
        IMP.init("imp62564523");

        const data = {
            pg: paymentRadioSelectedValue === '신용카드' ? "html5_inicis" : "kakaopay.TC0ONETIME",
            pay_method: "card",
            merchant_uid:`${noneMemberMerchantUid}`,
            customer_uid: mobile ?`${noneMemberCustomerUid}`: null,
            name: `${houseName} / ${Name}`,
            amount: TotalPrice - DiscountPrice,
            buyer_name: `${nonMemberName}`,
            buyer_tel: `${nonMemberNumber}`,
            m_redirect_url: `https://shimpyo.o-r.kr/none-member-mobile-order-complete/${houseId}`,
        }

        console.log("data:", data)

        async function callback(response: RequestPayResponse) {
            const {
                success,
                error_code,
                error_msg,
                imp_uid,
                merchant_uid,
            } = response;
            if (success) {
                await sendNoneMemberPaymentRequest({
                    url: `${NON_MEMBER_RESERVATION_API_PATH}`,
                    method: "POST",
                    body: {
                        impUid: imp_uid,
                        roomId: roomId,
                        merchantUid: merchant_uid,
                        payMethod: paymentRadioSelectedValue === '신용카드' ? "KGINICIS" : "KAKAO",
                        name: `${nonMemberName}`,
                        phoneNumber: `${nonMemberNumber}`,
                        peopleCount: GuestCount,
                        checkInDate: moment(checkInDate).format('YYYY.MM.DD'),
                        checkOutDate: moment(checkOutDate).format('YYYY.MM.DD')
                    }
                });
            } else {
                setOpen(false)
                setAlertOpen(true)
                setAlertMessage(error_msg)
            }
        }
        IMP.request_pay(data, callback);
    }

    const SendNoneMemberTextAfterPayRequestFunction = async (noneMemberPaymentResponseData: any) => {
        try {
            await sendNoneMemberTextAfterPayRequest({
                url: `${NON_MEMBER_RESERVATION_TEXT_API_PATH}`,
                method: "POST",
                body: {
                    phoneNumber: `${nonMemberNumber}`,
                    reservationCode: `${noneMemberPaymentResponseData.result.merchantUid}`
                }
            });
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (!noneMemberPaymentResponseData) return;
        if (noneMemberPaymentResponseData.isSuccess === true) {
            SendNoneMemberTextAfterPayRequestFunction(noneMemberPaymentResponseData)
            navigation('/check/non-member');
        }
        else if (noneMemberPaymentResponseData.isSuccess === false) {
            setOpen(false)
            setAlertOpen(true)
            setAlertMessage(noneMemberPaymentResponseData.message)
        }
    }, [noneMemberPaymentResponseData])


    return (
        <div style={{ width: "330px", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
            <PaymentInfoWrapper>
                <TitleBookingInfo loginState={isLoggedIn}>
                    <Typography fontFamily='Noto Sans KR'>{houseName}</Typography>
                    <Typography fontFamily='Noto Sans KR' sx={{ marginLeft: "10px", marginRight: "10px" }}>/</Typography>
                    <Typography fontFamily='Noto Sans KR'>{Name}</Typography>
                </TitleBookingInfo>
                <BookingInfo>
                    <Typography fontFamily='Noto Sans KR'>{moment(checkInDate).format('M월 D일')} - {moment(checkOutDate).format('M월 D일')}</Typography>
                    <Typography fontFamily='Noto Sans KR' sx={{ textDecoration: "underline" }}>₩ {price ? price.toLocaleString() : 0} x {DaysDifference}박</Typography>
                </BookingInfo>
                <BookingInfo style={{ marginBottom: "20px" }}>
                    <Typography fontFamily='Noto Sans KR'>총 합계</Typography>
                    <Typography fontFamily='Noto Sans KR' sx={{ textDecoration: "underline" }}>₩ {TotalPrice ? TotalPrice.toLocaleString() : null}</Typography>
                </BookingInfo>

                <Divider />

                {isLoggedIn ?
                    <CustomizedAccordion elevation={0} sx={{ marginTop: "10px" }}>
                        <CustomizedAccordionSummary
                            expandIcon={<CustomizedExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography fontFamily='Noto Sans KR'>쿠폰 할인</Typography>
                            <Typography fontFamily='Noto Sans KR' sx={{ marginRight: "10px", color: couponRadioSelectedValue === '' ? "#d9d9d9" : "#000000" }}>₩ {couponRadioSelectedValue === '' ? 0 : DiscountPrice.toLocaleString()}</Typography>
                        </CustomizedAccordionSummary>
                        <CustomizedAccordionDetails>
                            {
                                couponListArray.length > 0
                                    ?
                                    <List>
                                        {couponListArray.map((couponListItem, index) =>
                                        (
                                            <ListItem disablePadding key={index}>
                                                <CustomizedListItemButton onClick={() => handleRadioClick(couponListItem.name, couponListItem.discount, couponListItem.couponId)}>
                                                    <CustomizedRadio
                                                        checked={couponRadioSelectedValue === couponListItem.name}
                                                        name="radio-buttons"
                                                        inputProps={{ 'aria-label': 'A' }}
                                                    />
                                                    <ListItemText
                                                        primary={
                                                            <Typography fontFamily='Noto Sans KR' >
                                                                {couponListItem.name}
                                                            </Typography>
                                                        }
                                                        secondary={
                                                            <div style={{ display: "flex", flexDirection: "row", width: "100%", justifyContent: "flex-start" }}>
                                                                <Typography fontFamily='Noto Sans KR' fontSize="12px" fontWeight="300"  >
                                                                    {couponListItem.discount}% 할인
                                                                </Typography>
                                                                <div style={{ width: "5%" }} />
                                                                <Typography fontFamily='Noto Sans KR' fontSize="12px" fontWeight="300" >
                                                                    {moment(couponListItem.expiredDate).format('M월 D일')} 만료
                                                                </Typography>
                                                            </div>
                                                        } />
                                                </CustomizedListItemButton>
                                            </ListItem>
                                        )
                                        )}
                                    </List>
                                    :
                                    <div style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}>
                                        <Typography fontFamily='Noto Sans KR' sx={{ marginRight: "10px", color: "#d9d9d9" }} fontSize="14px">
                                            사용 가능한 쿠폰이 없습니다
                                        </Typography>
                                    </div>
                            }
                        </CustomizedAccordionDetails>
                    </CustomizedAccordion>
                    : null}

                <CustomizedAccordion elevation={0} sx={{ marginTop: "10px", marginBottom: "10px" }}>
                    <CustomizedAccordionSummary
                        expandIcon={<CustomizedExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography fontFamily='Noto Sans KR'>결제 수단</Typography>
                        <Typography fontFamily='Noto Sans KR' sx={{ fontSize: paymentRadioSelectedValue ? "16px" : "14px", marginRight: "10px", color: paymentRadioSelectedValue ? "#000000" : "#d9d9d9" }}>{paymentRadioSelectedValue ? paymentRadioSelectedValue : "결제 수단을 선택해주세요"}</Typography>
                    </CustomizedAccordionSummary>
                    <CustomizedAccordionDetails>
                        <List>
                            <ListItem disablePadding onClick={() => handlePaymentRadio('신용카드')}>
                                <CustomizedListItemButton>
                                    <CustomizedRadio
                                        checked={paymentRadioSelectedValue === '신용카드'}
                                        name="radio-buttons"
                                        inputProps={{ 'aria-label': 'A' }}
                                    />
                                    <ListItemText primary="신용카드" />
                                </CustomizedListItemButton>
                            </ListItem>
                            <ListItem disablePadding onClick={() => handlePaymentRadio('카카오 페이')}>
                                <CustomizedListItemButton>
                                    <CustomizedRadio
                                        checked={paymentRadioSelectedValue === '카카오 페이'}
                                        name="radio-buttons"
                                        inputProps={{ 'aria-label': 'B' }}
                                    />
                                    <ListItemText primary="카카오 페이" />
                                </CustomizedListItemButton>
                            </ListItem>
                        </List>
                    </CustomizedAccordionDetails>
                </CustomizedAccordion>

                <Divider />
                <BookingTotal>
                    <TotalDetail>청구액</TotalDetail>
                    <TotalAmount>₩ {(TotalPrice - DiscountPrice).toLocaleString()}</TotalAmount>
                </BookingTotal>
                <ColorButton disabled={paymentRadioSelectedValue === ''} label="결제" onClick={isLoggedIn ? memberRequestPay : noneMemberRequestPay} />
            </PaymentInfoWrapper >
        </div>
    )
}

export default PaymentInfoBox

const CustomizedExpandMoreIcon = styled(ExpandMoreIcon)`
color:#d9d9d9;
`

const SwipableWrapper = styled.div`
display:flex;
flex-direction: row;
`

const PaymentInfoWrapper = styled.div`
display:flex;
flex-direction: column;
align-self:flex-start;
position:relative;
width:330px;
// border-radius: 10px;
padding: 24px;
background-color:white;
`



const TitleBookingInfo = styled.div<{ loginState: boolean }>`
${props => props.loginState === true ? null : `margin-top: 20px;`}
margin-bottom:10px;
display:flex;
flex-direction:row;
`

const BookingInfo = styled.div`
margin-bottom:10px;
display:flex;
flex-direction:row;
justify-content:space-between;
`

const BookingTotal = styled(Typography)`
  display: flex;
  justify-content: space-between;
  font-size: 16px;
  color: #00adb5;
  font-family: 'Noto Sans KR';
  font-weight: 600;
  margin-top:20px;
`;

const TotalDetail = styled.div``;
const TotalAmount = styled.div``;

const CustomizedAccordion = styled(Accordion)`
:before {
    background-color:white;
}
`

const CustomizedAccordionSummary = styled(AccordionSummary)`
padding: 0px;
min-height:40px;
&& .MuiAccordionSummary-content {
display:flex;
flex-direction:row;
justify-content:space-between;
margin:0px;
align-items:center;
}

`

const CustomizedAccordionDetails = styled(AccordionDetails)`
padding: 0px;
`

const CustomizedListItemButton = styled(ListItemButton)`
padding: 0px;
`

const CustomizedRadio = styled(Radio)`
&.Mui-checked {
    color: #00adb5;
  }
`

const BookingBtn = styled(Button)`
background-color:#00adb5;
color: #ffffff;
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 25px;
  margin-top:20px;
  :hover {
    background-color: #00c5cf;
  }
  &:disabled{
    background-color: #00959c;
    color:#d9d9d9;
  }
`;

// memberpay data
// const data = {
//     pg: "html5_inicis",
//     pay_method: "card",
//     merchant_uid: `${memberUid}`,
//     name: "회원구매",
//     amount: 100,
//     buyer_email: "i2pss@naver.com",
//     buyer_name: "포트원 기술지원팀",
//     buyer_tel: "010-1234-5678",
//     buyer_addr: "서울특별시 강남구 삼성동",
//     buyer_postcode: "123-456",
// }

// nonmemberpay data
// const data = {
//     pg: "html5_inicis",
//     pay_method: "card",
//     merchant_uid: `${noneMemberUid}`,
//     name: `${houseName} / ${Name}`,
//     amount: 100,
//     amount: TotalPrice - DiscountPrice,
//     buyer_name: "포트원 기술지원팀",
//     buyer_tel: "010-1234-5678",
//     buyer_addr: "서울특별시 강남구 삼성동",
//     buyer_postcode: "123-456",
// }