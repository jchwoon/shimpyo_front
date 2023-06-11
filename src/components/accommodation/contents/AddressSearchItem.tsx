import { useState } from 'react';
import styled from 'styled-components';
import { BsFillBuildingFill } from 'react-icons/bs';

import { Prediction } from './AddressSearchList';

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
  const [addInfo, setAddInfo] = useState({
    latitude: 0,
    longitude: 0,
    postalCode: '',
  });

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

        const newAddInfo = {
          latitude: response.results[0].geometry.location.lat(),
          longitude: response.results[0].geometry.location.lng(),
          postalCode: postalCode,
        };
        setAddInfo(newAddInfo);
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
