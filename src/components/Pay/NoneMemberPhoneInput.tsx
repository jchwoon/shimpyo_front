import Input from '../shared/UI/Input';
import { useState, useCallback, ChangeEvent } from 'react';
import styled from '@emotion/styled';
import usePhoneCertification from '../../hooks/usePhoneCertification';
import { useRecoilState } from 'recoil';
import { phoneValueAtom } from '../../recoil/userAtoms';

import { swipePageState } from '../../recoil/detailPageAtoms';

// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css';
// import 'swiper/css/pagination';
// import './styles.css';
// import { Pagination } from 'swiper/modules';

import Typography from '@mui/material/Typography';

import { Divider } from '@mui/material';
import { boolean } from 'yargs';

// interface PhoneInputProps {
//     getValid: (valid: boolean) => void;
// }

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

function ExtendedColorButton({ label, disabled = false, onClick }: ColorButtonProps) {
    return (
        <StyleColorButton onClick={onClick} disabled={disabled} style={{width:"100%"}}>
            {label}
        </StyleColorButton>
    );
}

export default function NoneMemberPhoneInput(
    // { getValid }: PhoneInputProps
    ) {
    const [nameValue, setNameValue] = useState('')
    const [phoneValue, setPhoneValue] = useRecoilState(phoneValueAtom);
    const [codeValue, setCodeValue] = useState('');

    const [isPhoneValid, setIsPhoneValid] = useState(false);
    const getPhoneValid = (valid: boolean) => {
        setIsPhoneValid(valid);
    };

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

    const onNameValueChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setNameValue(value);
    }

    const onPhoneValueChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setPhoneValue(value);
        initialState();
        getPhoneValid(false);
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
        getPhoneValid(isCodeOkay);
    };

    const inputChange = Boolean(nameValue!=='' || phoneValue)

    const isValid = Boolean(nameValue!=='' && isPhoneValid)

    const [swipePage, setSwipePage] = useRecoilState(swipePageState);

    return (
        <div style={{ width: "330px", display: "flex", justifyContent: "center", alignItems: "center",backgroundColor:"white" }}>
            <div style={{width:"100%", height:"100%", padding:"24px", display: "flex", flexDirection:"column", justifyContent: "center",}}>
                <Typography fontFamily='Noto Sans KR' color="#cccccc" fontWeight="400" fontSize="12px" align='center' sx={{marginBottom:"10px"}}>
                    비회원인 경우 예약 필수 정보를 입력해주세요
                </Typography>
                <div style={{ marginBottom: "10px" }}>
                    <Input
                        type="text"
                        placeholder="예약자 성함"
                        onChange={onNameValueChange}
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
                        disabled={isLoading}
                        error={codeNumberError}
                        errorMessage={codeNumberErrorMessage}
                    />
                    <StyledColorButtonWrapper>
                        <ColorButton 
                        disabled={!isPhoneOk} 
                        label="확인" 
                        onClick={handleCheckCodeNumber} 
                        // onClick={()=>setSwipePage(2)}
                        />
                    </StyledColorButtonWrapper>
                </div>
                <Divider/>
                    <div style={{height:"99px", width:"282px", overflow:"hidden"}}>
                        <div style={{height:"198px", width:"282px", display:"flex", flexDirection:"column", position:"relative", transition: "0.3s ease",
                        bottom: inputChange ? "99px" : "0px"}}>
                            <div style={{height:"99px", width:"282px"}}>
                                <Typography fontFamily='Noto Sans KR' color="#cccccc" fontWeight="400" fontSize="12px" align='center' sx={{marginTop:"15px", marginBottom:"10px"}}>
                                회원에게는 쿠폰 및 여러 혜택이 주어집니다
                                </Typography>
                                <ExtendedColorButton label="로그인" onClick={()=>{}}/>
                            </div>
                            <div style={{height:"99px", width:"282px"}}>
                                <Typography fontFamily='Noto Sans KR' color="#cccccc" fontWeight="400" fontSize="12px" align='center' sx={{marginTop:"15px", marginBottom:"10px"}}>
                                비회원으로 예약을 진행합니다
                                </Typography>
                                <ExtendedColorButton disabled={!isValid || isLoading} label="확인" onClick={()=>setSwipePage(2)}/>
                            </div>
                        </div>
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
