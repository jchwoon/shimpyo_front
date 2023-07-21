import styled from 'styled-components';
import AddressSearchItem from './AddressSearchItem';
import { FaLocationArrow } from 'react-icons/fa';
import { useRecoilState } from 'recoil';
import { accommodationState, stepState } from '../../../../recoil/accommodationAtoms';
import { getAddressFromLatLng } from '../../../../utils/getAddressFromLatLng';
import { Dispatch, SetStateAction } from 'react';

export interface Prediction {
  description: string;
  structured_formatting: {
    main_text: string;
    secondary_text: string;
  };
  terms: { offset: number; value: string }[];
}

export interface AddressSearchListProps {
  searchResult: { predictions?: Prediction[] };
  focus?: boolean;
  setNoDataCheck?: Dispatch<SetStateAction<boolean>>;
}

export default function AddressSearchList({ setNoDataCheck, searchResult, focus }: AddressSearchListProps) {
  const [stepNumber, setStepNumber] = useRecoilState(stepState);
  const [accommodation, setAccommodation] = useRecoilState(accommodationState);

  const MoveAddressWrite = () => {
    setStepNumber(preState => preState + 1);
  };

  const noDataOnFocus = () => {
    if (setNoDataCheck) setNoDataCheck(true);
  };

  const noDataOnBlur = () => {
    if (setNoDataCheck) setNoDataCheck(false);
  };

  const getLocation = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async position => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;

          const { formatted_address, address_components } = await getAddressFromLatLng(lat, lng);

          const newAccommodation = { ...accommodation };
          newAccommodation.address = {
            ...newAccommodation.address,
            fullAddress: formatted_address,
            lat: lat,
            lng: lng,
            postCode: address_components[address_components.length - 1].long_name || '',
            sido: address_components[address_components.length - 3].long_name || '',
            sigungu: address_components[address_components.length - 4].long_name || '',
          };
          setAccommodation(newAccommodation);

          setStepNumber(preState => preState + 1);
        },
        err => {
          alert('위치 정보를 가져올 수 없습니다.');
          console.log('위치 정보를 가져올 수 없습니다.', err);
        },
      );
    } else {
      alert('브라우저가 위치 정보를 지원하지 않습니다.');
      console.log('브라우저가 위치 정보를 지원하지 않습니다.');
    }
  };

  if (searchResult.predictions) {
    return (
      <StyledListContainer focus={focus} searchResult={searchResult}>
        {searchResult.predictions.map((element: any, idx) => {
          return <AddressSearchItem key={idx} element={element} />;
        })}
        <StyledItem onClick={MoveAddressWrite}>
          <StyledFlexContainer>
            {searchResult.predictions && <StyledItemTitle>주소를 직접 입력하겠습니다.</StyledItemTitle>}
          </StyledFlexContainer>
        </StyledItem>
      </StyledListContainer>
    );
  } else {
    return (
      <StyledListContainer focus={focus} searchResult={searchResult}>
        <StyledItem onClick={getLocation} onMouseOver={noDataOnFocus} onMouseLeave={noDataOnBlur}>
          <FaLocationArrow />
          <StyledFlexContainer>
            <StyledItemTitle>현재 위치 사용</StyledItemTitle>
          </StyledFlexContainer>
        </StyledItem>
      </StyledListContainer>
    );
  }
}

const StyledListContainer = styled.ul<AddressSearchListProps>`
  position: absolute;
  top: 30px;
  width: 100%;
  background-color: white;
  z-index: 10;
  border-radius: 0 0 10px 10px;
  margin-top: 40px;
  padding-top: 20px;
  overflow-y: auto;

  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.2);
  height: ${props => props.searchResult.predictions && props.searchResult.predictions.length > 1 && '200px'};
  /* visibility: ${props => (props.focus === false ? 'hidden' : 'visible')}; */
`;

const StyledItem = styled.li`
  display: flex;
  padding: 20px;
  cursor: pointer;
  align-items: center;
  line-height: 15px;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

const StyledFlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
`;

const StyledItemTitle = styled.div`
  font-size: 15px;
  text-decoration: underline;
`;
