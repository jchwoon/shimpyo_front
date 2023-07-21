import { useSearchParams } from 'react-router-dom';
import { activeRoomNumber, paymentRadioSelected } from '../recoil/detailPageAtoms';
import { useRecoilValue } from "recoil";
import {
    AdultGuest,
    ChildGuest,
    InfantGuest,
    FirstPickedDate,
    SecondPickedDate,
} from '../recoil/navBarAtoms';
import { nameValueAtom, phoneValueAtom } from '../recoil/userAtoms';
import useHttpRequest from '../hooks/useHttpRequest';
import { NON_MEMBER_RESERVATION_API_PATH, NON_MEMBER_RESERVATION_TEXT_API_PATH } from '../constants/api/reservationApi';
import moment from 'moment';
import { useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";

export default function NonneMemberMobileOrderComplete() {
    const [searchParams] = useSearchParams();
    const imp_uid = searchParams.get('imp_uid');
    const imp_success = searchParams.get('imp_success');
    const merchant_uid = searchParams.get('merchant_uid');
    const error_code = searchParams.get('error_code');
    const error_msg = searchParams.get('error_msg');

    const roomId = useRecoilValue(activeRoomNumber)
    const paymentRadioSelectedValue = useRecoilValue(paymentRadioSelected)

    const nonMemberName = useRecoilValue(nameValueAtom)
    const nonMemberNumber = useRecoilValue(phoneValueAtom)

    const AdultGuestNumber = useRecoilValue(AdultGuest);
    const ChildGuestNumber = useRecoilValue(ChildGuest);
    const InfantGuestNumber = useRecoilValue(InfantGuest);

    const GuestCount = AdultGuestNumber + ChildGuestNumber + InfantGuestNumber;

    const checkInDate = useRecoilValue(FirstPickedDate);
    const checkOutDate = useRecoilValue(SecondPickedDate);

    const { responseData: noneMemberPaymentResponseData, sendRequest: sendNoneMemberPaymentRequest } = useHttpRequest();
    const { responseData: noneMemberTextAfterPayResponseData, sendRequest: sendNoneMemberTextAfterPayRequest } = useHttpRequest();

    const navigation = useNavigate();

    const { houseId } = useParams()

    console.log("imp_success:", imp_success)

    if (imp_success === "true") {
        sendNoneMemberPaymentRequest({
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
    } else if (imp_success === "false") {
        navigation(`/detail/${houseId}?response_message=${error_msg}`)
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
        } else if (noneMemberPaymentResponseData.isSuccess === false) {
            navigation(`/detail/${houseId}?response_message=${noneMemberPaymentResponseData.message}`)
        }


    }, [noneMemberPaymentResponseData])

    return <div>hello</div>
}