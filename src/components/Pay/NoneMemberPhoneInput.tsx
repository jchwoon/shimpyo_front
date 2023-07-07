import Input from '../shared/UI/Input';
// import ColorButton from '../shared/UI/ColorButton';
import { useState, useCallback, ChangeEvent } from 'react';
import styled from '@emotion/styled';
import { StyleNumberTypeInput } from '../style/shareStyle';
import usePhoneCertification from '../../hooks/usePhoneCertification';
import { useRecoilState } from 'recoil';
import { phoneValueAtom } from '../../recoil/userAtoms';


import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
// import './styles.css';
import { Pagination } from 'swiper/modules';
import Typography from '@mui/material/Typography';

interface PhoneInputProps {
    getValid: (valid: boolean) => void;
}

interface ColorButtonProps {
    label: string;
    disabled?: boolean;
    onClick: () => void;
}

function ColorButton({ label, disabled = false, onClick }: ColorButtonProps) {
    return (
        <StyleColorButton onClick={onClick} disabled={disabled}>
            {label}
        </StyleColorButton>
    );
}

export default function NoneMemberPhoneInput({ getValid }: PhoneInputProps) {
    const [phoneValue, setPhoneValue] = useRecoilState(phoneValueAtom);
    const [codeValue, setCodeValue] = useState('');

    const {
        codeNumberError,
        codeNumberErrorMessage,
        handleSubmitConfirmNumber,
        handleValidityPhone,
        isPhoneOk,
        phoneError,
        phoneErrorMessage,
        sendCodeNumberButtonText,
        isLoading,
        initialState,
    } = usePhoneCertification({ codeValue, phoneValue, isUser: false });

    const onPhoneValueChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setPhoneValue(value);
        initialState();
        getValid(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onCodeValueChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setCodeValue(value);
    }, []);

    const handleSendCodeNumber = () => {
        handleValidityPhone();
    };

    const handleCheckCodeNumber = async () => {
        const isCodeOkay = handleSubmitConfirmNumber();
        getValid(isCodeOkay);
    };

    return (
        <div style={{ width: "336px", height: "364px", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <div>
                <Typography fontFamily='Noto Sans KR' fontWeight="300" fontSize="14px">
                    비회원 정보 입력
                </Typography>
                <div style={{ marginBottom: "10px" }}>
                    <Input
                        type="text"
                        placeholder="예약자 성함"
                    />
                </div>
                <div style={{ display: "flex", flexDirection: "row", alignItems: "flex-start", marginBottom: "10px" }}>
                    <Input onChange={onPhoneValueChange} placeholder="휴대폰 번호" inputMode="tel" type="number" error={phoneError} errorMessage={phoneErrorMessage} />
                    <StyledColorButtonWrapper>
                        <ColorButton disabled={isLoading} onClick={handleSendCodeNumber} label={sendCodeNumberButtonText === "인증번호 발송" ? "발송" : "재발송"} />
                    </StyledColorButtonWrapper>
                </div >
                <div style={{ display: "flex", flexDirection: "row", alignItems: "flex-start", marginBottom: "20px" }}>
                    <Input
                        type="number"
                        onChange={onCodeValueChange}
                        placeholder="인증번호 입력"
                        disabled={!isPhoneOk}
                    />
                    <StyledColorButtonWrapper>
                        <ColorButton disabled={!isPhoneOk} label="확인" onClick={handleCheckCodeNumber} />
                    </StyledColorButtonWrapper>
                </div>
            </div>
        </div>
    );
}

const StyledColorButtonWrapper = styled.div`
margin-left:10px;
`

const StyleColorButton = styled.button`
  background: ${props => (props.disabled ? '#ccc' : 'linear-gradient(90deg, #00adb5, #009ca6);')};
  color: #fff;
  border: none;
  font-weight: 500;
  font-size: 16px;
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  border-radius: 0.3rem;
  text-align: center;
  width: 60px;
  height: 56px;
  padding: 0.75rem 0
`;
