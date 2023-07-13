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

import { merchantUid, activeRoomName } from '../../recoil/detailPageAtoms';
import useAuthorizedRequest from "../../hooks/useAuthorizedRequest";
import useHttpRequest from "../../hooks/useHttpRequest";
import { accessTokenAtom } from "../../recoil/userAtoms";
import { loginStateAtom } from "../../recoil/userAtoms";
import { useRecoilState, useRecoilValue } from "recoil";
import { AxiosError } from 'axios';
import { MEMBER_RESERVATION_API_PATH, NON_MEMBER_RESERVATION_API_PATH } from "../../constants/api/reservationApi";

import { Navigate, useNavigate } from "react-router-dom";
import { useState } from 'react'

import { v4 as uuidv4 } from 'uuid';

interface ResultData {
    accessToken: string;
}

interface PaymentInfoBoxProp {
    houseName: string,
    checkInDate: string | null,
    checkOutDate: string | null,
    price: number | null
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

const PaymentInfoBox: React.FC<PaymentInfoBoxProp> = ({ houseName, checkInDate, checkOutDate, price }) => {

    const DaysDifference = moment(checkOutDate).diff(moment(checkInDate), "days")
    const TotalPrice = price ? price * DaysDifference : 0

    const [couponRadioSelectedValue, setCouponRadioSelectedValue] = React.useState(0);
    const [paymentRadioSelectedValue, setPaymentRadioSelectedValue] = React.useState('');

    const DiscountPrice = TotalPrice ? TotalPrice * couponRadioSelectedValue / 100 : 0

    const handleCouponRadio = (value: number) => {
        if (value === 0) { setCouponRadioSelectedValue(value) }
        else if (value === couponRadioSelectedValue) { setCouponRadioSelectedValue(0) }
        else { setCouponRadioSelectedValue(value) }
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
    const noneMemberUid = uuidv4()

    const Name = useRecoilValue(activeRoomName)

    function memberRequestPay() {
        const { IMP } = window;
        IMP.init("imp62564523");

        const data = {
            pg: "html5_inicis",
            pay_method: "card",
            merchant_uid: `${memberUid}`,
            name: "회원구매",
            amount: 100,
            // buyer_email: "i2pss@naver.com",
            buyer_name: "포트원 기술지원팀",
            buyer_tel: "010-1234-5678",
            // buyer_addr: "서울특별시 강남구 삼성동",
            // buyer_postcode: "123-456",
        }

        async function callback(response: RequestPayResponse) {
            const {
                success,
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
                        roomId: 80001,
                        merchantUid: merchant_uid,
                        payMethod: "KGINICIS",
                        peopleCount: 3,
                        checkInDate: "2023.07.08",
                        checkOutDate: "2023.07.09"
                    }
                });
            } else {
                console.log("회원 INCISC 결제 실패")
            }
        }
        IMP.request_pay(data, callback);
    }

    useEffect(() => {
        if (!memberPaymentResponseData) return;
        if (memberPaymentResponseData.isSuccess) { navigation('/reservations?category=reservation'); }
    }, [memberPaymentResponseData])


    function noneMemberRequestPay() {
        const { IMP } = window;
        IMP.init("imp62564523");

        const data = {
            pg: "html5_inicis",
            pay_method: "card",
            merchant_uid: `${noneMemberUid}`,
            name: `${houseName} / ${Name}`,
            amount: 100,
            // amount: TotalPrice - DiscountPrice,
            buyer_name: "포트원 기술지원팀",
            buyer_tel: "010-1234-5678",
            // buyer_addr: "서울특별시 강남구 삼성동",
            // buyer_postcode: "123-456",
        }

        async function callback(response: RequestPayResponse) {
            const {
                success,
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
                        roomId: 80001,
                        merchantUid: merchant_uid,
                        payMethod: "KGINICIS",
                        name: "박현준",
                        phoneNumber: "01029991157",
                        peopleCount: 3,
                        checkInDate: "2023.07.11",
                        checkOutDate: "2023.07.12"
                    }
                });
            } else {
                alert(`결제 실패: ${error_msg}`);
            }
        }
        IMP.request_pay(data, callback);
    }

    useEffect(() => {
        if (!noneMemberPaymentResponseData) return;
        if (noneMemberPaymentResponseData.isSuccess) { navigation('/check/non-member'); }
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
                            <Typography fontFamily='Noto Sans KR' sx={{ marginRight: "10px", color: couponRadioSelectedValue === 0 ? "#d9d9d9" : "#000000" }}>₩ {couponRadioSelectedValue === 0 ? 0 : DiscountPrice.toLocaleString()}</Typography>
                        </CustomizedAccordionSummary>
                        <CustomizedAccordionDetails>
                            <List>
                                <ListItem disablePadding>
                                    <CustomizedListItemButton onClick={() => handleCouponRadio(5)}>
                                        <CustomizedRadio
                                            checked={couponRadioSelectedValue === 5}
                                            name="radio-buttons"
                                            inputProps={{ 'aria-label': 'A' }}
                                        />
                                        <ListItemText primary="회원가입 5% 할인" />
                                    </CustomizedListItemButton>
                                </ListItem>
                                <ListItem disablePadding>
                                    <CustomizedListItemButton onClick={() => handleCouponRadio(3)}>
                                        <CustomizedRadio
                                            checked={couponRadioSelectedValue === 3}
                                            name="radio-buttons"
                                            inputProps={{ 'aria-label': 'B' }}
                                        />
                                        <ListItemText primary="리뷰 작성 3% 할인" />
                                    </CustomizedListItemButton>
                                </ListItem>
                            </List>
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