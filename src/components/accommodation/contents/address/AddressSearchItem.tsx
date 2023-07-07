import styled from 'styled-components';
import { BsFillBuildingFill } from 'react-icons/bs';

import { Prediction } from './AddressSearchList';
import { accommodationState, stepState } from '../../../../recoil/accommodationAtoms';
import { useRecoilState } from 'recoil';

interface AddressSearchItemProps {
  element: Prediction;
}

interface GeocoderAddressComponent {
  long_name: string;
  types: string[];
}
interface GeocoderResponse {
  results: [
    {
      address_components: Array<GeocoderAddressComponent>;
      geometry: { location: { lat: () => number; lng: () => number } };
    },
  ];
}

export default function AddressSearchItem({ element }: AddressSearchItemProps) {
  const [accommodation, setAccommodation] = useRecoilState(accommodationState);
  const [stepNumber, setStepNumber] = useRecoilState(stepState);

  /**
   * 위도와 경도, 우편번호 정보를 얻기위한 함수
   */
  const getGeocodeData = () => {
    const geocoder = new window.google.maps.Geocoder();
    const request = { address: element.description, language: 'KR' };
    geocoder
      .geocode(request)
      .then((response: GeocoderResponse) => {
        let postalCode;
        const result = response.results[0].address_components;
        if (result && result.length > 0 && result[result.length - 1].types[0] === 'postal_code') {
          postalCode = result[result.length - 1].long_name;
        } else {
          postalCode = '';
        }

        const newAccommodation = {
          ...accommodation,
          address: {
            sido: element.terms[element.terms.length - 2]?.value || '',
            sigungu: element.terms[element.terms.length - 3]?.value || '',
            fullAddress: element.description,
            lat: response.results[0].geometry.location.lat(),
            lng: response.results[0].geometry.location.lng(),
            postCode: String(postalCode),
          },
        };
        setAccommodation(newAccommodation);
        setStepNumber(preState => preState + 1);
      })
      .catch((err: Error) => {
        console.log(err);
      });
  };
  return (
    <StyledItem onClick={getGeocodeData}>
      <BsFillBuildingFill size={20} />
      <StyledFlexContainer>
        <StyledItemTitle>{element.structured_formatting.main_text}</StyledItemTitle>
        <StyledItemContent>{element.structured_formatting.secondary_text}</StyledItemContent>
      </StyledFlexContainer>
    </StyledItem>
  );
}

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

const StyledItemTitle = styled.div`
  font-size: 15px;
`;

const StyledItemContent = styled.div`
  font-size: 10px;
`;

const StyledFlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
`;
