import { Typography } from "@mui/material";
import styled from "@emotion/styled";
import { Divider } from "@mui/material";
import PaySelect from "../PaySelect";

export default function SideContainer() {
    return (
        <>
            <Container>
                <TitleContainer>
                    <CustomizedTypography sx={{ fontSize: "26px", fontWeight: "bold" }} >확인 및 결제</CustomizedTypography>
                </TitleContainer>
                <InfoContainer>
                    <CustomizedTypography sx={{ fontSize: "22px", fontWeight: 600 }}>예약 정보</CustomizedTypography>
                    <DateInfoContainer>
                        <CustomizedTypography sx={{ fontSize: "15px", fontWeight: 600 }}>날짜</CustomizedTypography>
                        <CustomizedTypography sx={{ fontSize: "15px", fontWeight: 500 }}>7월</CustomizedTypography>
                    </DateInfoContainer>
                    <GuestInfoContainer>
                        <CustomizedTypography sx={{ fontSize: "15px", fontWeight: 600 }}>게스트</CustomizedTypography>
                        <CustomizedTypography sx={{ fontSize: "15px", fontWeight: 500 }}>1명</CustomizedTypography>
                    </GuestInfoContainer>
                </InfoContainer>
                <Divider />
                <DiscountContainer>
                    <CustomizedTypography sx={{ fontSize: "22px", fontWeight: 600 }}>할인 적용</CustomizedTypography>
                    <CouponContainer>
                        <CustomizedTypography sx={{ fontSize: "15px", fontWeight: 600 }}>쿠폰</CustomizedTypography>
                        <CustomizedTypography sx={{ fontSize: "15px", fontWeight: 500 }}>0원</CustomizedTypography>
                    </CouponContainer>
                </DiscountContainer>
                <Divider />
                <PaymentContainer>
                    <CustomizedTypography sx={{ fontSize: "22px", fontWeight: 600 }}>결제 수단</CustomizedTypography>
                    <PaySelect />
                </PaymentContainer>
            </Container>
        </>
    );
}

const CustomizedTypography = styled(Typography)`
// font-size: 22px;
// font-weight: 600;
font-family: Noto Sans KR;
`

const Container = styled.div`
display:flex;
flex-direction:column;
border:solid;
width: 50%;
padding: 20px;
`

const TitleContainer = styled.div`
margin-bottom:20px;
`

const InfoContainer = styled.div`
margin-bottom:20px;
`

const DateInfoContainer = styled.div`
margin-top:10px;
margin-bottom:10px;
`

const GuestInfoContainer = styled.div`
margin-top:10px;
margin-bottom:10px;
`

const DiscountContainer = styled.div`
margin-top:20px;
`

const CouponContainer = styled.div`
margin-top:10px;
margin-bottom:10px;
`

const PaymentContainer = styled.div`
margin-top:20px;
`