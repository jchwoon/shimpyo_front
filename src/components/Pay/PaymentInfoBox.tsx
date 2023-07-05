import styled from "@emotion/styled"
import { Typography, Divider, Button, Card } from "@mui/material"
import React from "react"
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


interface PaymentInfoBoxProp {
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

const PaymentInfoBox: React.FC<PaymentInfoBoxProp> = ({ checkInDate, checkOutDate, price }) => {

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



    function requestPay() {
        const { IMP } = window;
        IMP.init("imp08502640");

        const data = {
            pg: "html5_inicis",
            pay_method: "card",
            merchant_uid: "57008833-33004",
            name: "당근 10kg",
            amount: 1004,
            buyer_email: "Iamport@chai.finance",
            buyer_name: "포트원 기술지원팀",
            buyer_tel: "010-1234-5678",
            buyer_addr: "서울특별시 강남구 삼성동",
            buyer_postcode: "123-456",
        }

        function callback(response: RequestPayResponse) {
            const {
                success,
                error_msg,
            } = response;

            if (success) {
                alert('결제 성공');
            } else {
                alert(`결제 실패: ${error_msg}`);
            }
        }

        IMP.request_pay(data, callback);
    }

    return (
        <PaymentInfoWrapper>
            <TitleBookingInfo>
                <Typography fontFamily='Noto Sans KR'>호텔 이름</Typography>
                <Typography fontFamily='Noto Sans KR' sx={{ marginLeft: "10px", marginRight: "10px" }}>/</Typography>
                <Typography fontFamily='Noto Sans KR'>디럭스 룸</Typography>
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

            <CustomizedAccordion elevation={0} sx={{ marginBottom: "10px" }}>
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
            {/* <div style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}> */}
            {/* <BookingBtn disabled={paymentRadioSelectedValue === ''}>
                <Typography fontFamily='Noto Sans KR' fontSize="17px">결제</Typography>
            </BookingBtn> */}
            <ColorButton disabled={paymentRadioSelectedValue === ''} label="결제" onClick={requestPay} />
            {/* </div> */}

        </PaymentInfoWrapper >
    )
}

export default PaymentInfoBox

const CustomizedExpandMoreIcon = styled(ExpandMoreIcon)`
color:#d9d9d9;
`

const PaymentInfoWrapper = styled(Card)`
display:flex;
flex-direction: column;
align-self:flex-start;
position:relative;
width:330px;
border-radius: 10px;
padding: 24px;
`

const TitleBookingInfo = styled.div`
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