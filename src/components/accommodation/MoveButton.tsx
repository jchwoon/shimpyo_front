import { startTransition } from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';

import { buttonConstants } from '../../constants/buttonContent';
import buttonContent from '../../constants/buttonContent';
import { accommodationState, addressCheckState, errorModalState, stepState } from '../../recoil/atoms';

interface buttonProps {
  step: keyof buttonConstants;
  isDisabled?: boolean;
}

export default function MoveButton({ step, isDisabled }: buttonProps) {
  const [stepNumber, setStepNumber] = useRecoilState(stepState);
  const [accommodation, setAccommodation] = useRecoilState(accommodationState);
  const [addressCheck, setAddressCheck] = useRecoilState(addressCheckState);
  const [errorModal, setErrorModal] = useRecoilState(errorModalState);

  const navigate = useNavigate();

  const handleOnClick = () => {
    if (step === 'START' || step === 'NEXT') {
      setStepNumber(stepNumber + 1);
    }

    if (step === 'PREV') {
      setStepNumber(stepNumber - 1);
    }

    if (step === 'FIN') {
      startTransition(() => {
        navigate('/hosting');
      });
    }
  };

  const CheckAddress = () => {
    if (step === 'PREV') {
      setStepNumber(stepNumber - 1);
      setAddressCheck(true);

      const newAccommodation = { ...accommodation };
      newAccommodation.address = {
        fullAddress: '',
        lng: 0,
        lat: 0,
        postCode: '',
        sido: '',
        sigungu: '',
      };

      return setAccommodation(newAccommodation);
    }

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}&libraries=places&callback=initCheckAddress`;
    document.head.appendChild(script);

    const removeScript = () => {
      script.remove();
      delete window.initCheckAddress;
    };

    window.initCheckAddress = () => {
      const geocode = new window.google.maps.Geocoder();
      const request = { address: accommodation.address.fullAddress };
      geocode
        .geocode(request)
        .then((response: any) => {
          if (
            accommodation.address.postCode ===
            response.results[0].address_components[response.results[0].address_components.length - 1].long_name
          ) {
            const newAccommodation = { ...accommodation };
            newAccommodation.address = {
              ...newAccommodation.address,
              lat: response.results[0].geometry.location.lat(),
              lng: response.results[0].geometry.location.lng(),
            };

            setAccommodation(newAccommodation);

            setStepNumber(preState => preState + 1);
            setAddressCheck(true);
            setErrorModal(false);
            removeScript();
          } else {
            setAddressCheck(false);
            setErrorModal(true);
            removeScript();
          }
        })
        .catch((err: Error) => {
          console.log(err);
          setAddressCheck(false);
          setErrorModal(true);
          removeScript();
        });
    };
  };

  if (stepNumber === 4) {
    return (
      <>
        <StyledBtn disabled={isDisabled} step={step} onClick={CheckAddress}>
          {buttonContent[step]}
        </StyledBtn>
      </>
    );
  } else {
    return (
      <StyledBtn disabled={isDisabled} step={step} onClick={handleOnClick}>
        {buttonContent[step]}
      </StyledBtn>
    );
  }
}

const StyledBtn = styled.button<buttonProps>`
  font-size: 16px;
  border-radius: 0.625em;
  border: 0;
  background-color: black;
  color: white;
  height: 3em;
  font-weight: bold;

  &:hover {
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.4);
  }

  &:disabled {
    background-color: rgba(0, 0, 0, 0.2);
    cursor: not-allowed;
  }

  ${props => {
    switch (props.step) {
      case 'START':
        return `
          width: 8em;
        `;
      case 'NEXT':
        return `
          width: 5.8em;
        `;

      case 'PREV':
        return `
          width: 5.8em;
          background-color: white;
          color: black;
          text-decoration: underline;
          &:hover{
            background-color: rgba(0,0,0,0.1);
          }
        `;

      case 'FIN':
        return `
          width: 5.8em;
          background-color: #f02a2a;
          color: white;
          &:hover {
            cursor: pointer;
            background-color: rgba(253, 1, 1, 0.4);
          }
        `;

      default:
        return `
          width: 5.8em;
          `;
    }
  }}
  @media (max-width: 360px) {
    font-size: 10px;
  }
`;
