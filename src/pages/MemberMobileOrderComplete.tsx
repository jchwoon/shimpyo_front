import { useSearchParams } from 'react-router-dom';
import { activeRoomNumber, paymentRadioSelected } from '../recoil/detailPageAtoms';
import { useRecoilValue, useRecoilState } from "recoil";
import {
    AdultGuest,
    ChildGuest,
    InfantGuest,
    FirstPickedDate,
    SecondPickedDate,
} from '../recoil/navBarAtoms';
import { couponRadio } from '../recoil/detailPageAtoms';
import { nameValueAtom, phoneValueAtom, loginStateAtom } from '../recoil/userAtoms';
import { MEMBER_RESERVATION_API_PATH } from '../constants/api/reservationApi';
import moment from 'moment';
import { useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { AxiosError } from 'axios';
import useAuthorizedRequest from '../hooks/useAuthorizedRequest';

interface ResultData {
    accessToken: string;
}

export default function MemberMobileOrderComplete() {
    const [searchParams] = useSearchParams();
    const imp_uid = searchParams.get('imp_uid');
    const imp_success = searchParams.get('imp_success');
    const merchant_uid = searchParams.get('merchant_uid');
    const error_code = searchParams.get('error_code');
    const error_msg = searchParams.get('error_msg');

    const roomId = useRecoilValue(activeRoomNumber)
    const paymentRadioSelectedValue = useRecoilValue(paymentRadioSelected)

    const couponRadioId = useRecoilValue(couponRadio)

    const AdultGuestNumber = useRecoilValue(AdultGuest);
    const ChildGuestNumber = useRecoilValue(ChildGuest);
    const InfantGuestNumber = useRecoilValue(InfantGuest);

    const GuestCount = AdultGuestNumber + ChildGuestNumber + InfantGuestNumber;

    const checkInDate = useRecoilValue(FirstPickedDate);
    const checkOutDate = useRecoilValue(SecondPickedDate);

    const [isLoggedIn, setIsLoggedIn] = useRecoilState(loginStateAtom);

    const handleUnAutorization = (error: AxiosError) => {
        setIsLoggedIn(false);
        navigation('/');
        console.error(error.message);
    };
    const { responseData: memberPaymentResponseData, sendRequest: sendMemberPaymentRequest } = useAuthorizedRequest<ResultData>({
        onUnauthorized: handleUnAutorization,
    });

    const navigation = useNavigate();

    const { houseId } = useParams()

    console.log("imp_success:", imp_success)

    useEffect(() => {
        if (imp_success === "true") {
            sendMemberPaymentRequest({
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
        } else if (imp_success === "false") {
            navigation(`/detail/${houseId}?response_message=${error_msg}`)
        }
    }, [imp_success])

    if (imp_success === "true") {
        sendMemberPaymentRequest({
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
    } else if (imp_success === "false") {
        navigation(`/detail/${houseId}?response_message=${error_msg}`)
    }

    useEffect(() => {
        if (!memberPaymentResponseData) return;
        if (memberPaymentResponseData.isSuccess === true) { navigation('/reservations?category=reservation'); }
        else if (memberPaymentResponseData.isSuccess === false) {
            navigation(`/detail/${houseId}?response_message=${memberPaymentResponseData.message}`)
        }
    }, [memberPaymentResponseData])


    return <div>hello</div>
}