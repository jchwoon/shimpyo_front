import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

import { MdLocationPin } from 'react-icons/md';

export default function AddressSearchBar() {
  const [searchWord, setSearchWord] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWord(e.target.value);
  };

  const handleOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setSearchWord('');
    inputRef.current?.focus();
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://maps.googleapis.com/maps/api/js?${process.env.REACT_APP_GOOGLE_API_KEY}&libraries=places&callback=initAutocomplete`;
    document.head.appendChild(script);

    window.initAutocomplete = () => {
      const searchbar = document.getElementById('searchbar') as HTMLInputElement;
      const option = {
        types: ['establishment'],
        componentRestrictions: {
          country: ['KR'],
        },
        fields: ['address_components', 'adr_address', 'formatted_address'],
      };
      const autocomplete = new window.google.maps.places.Autocomplete(searchbar, option);

      autocomplete.addListener('place_changed', onPlaceChanged);

      function onPlaceChanged() {
        let place = autocomplete.getPlace();
        console.log(place);
      }
    };

    return () => {
      delete window.initAutocomplete;
      document.head.removeChild(script);
    };
  }, [searchWord]);

  return (
    <StyledBarContainer>
      <StyledFlexDiv>
        <MdLocationPin size="25px" />
        <StyledInput
          id="searchbar"
          type="text"
          ref={inputRef}
          value={searchWord}
          onChange={handleChange}
          placeholder="주소를 입력하세요."
        ></StyledInput>
      </StyledFlexDiv>
      {searchWord.length > 0 && <StyledCancelButton onClick={handleOnClick}>X</StyledCancelButton>}
    </StyledBarContainer>
  );
}

const StyledBarContainer = styled.div`
  display: flex;
  position: relative;
  justify-content: space-between;
  align-items: center;
  width: 500px;
  height: 70px;
  padding: 20px;
  background-color: white;
  border-radius: 30px;

  &:focus-within {
    outline: 2px solid black;
    border-radius: 10px;
  }

  &:first-child {
    padding: 10px;
  }
`;

const StyledFlexDiv = styled.div`
  display: flex;
`;

const StyledInput = styled.input`
  border: none;
  padding: none;
  margin-left: 10px;
  width: 390px;
  border-radius: 10px;
  &:focus {
    outline: none;
  }
`;

const StyledCancelButton = styled.button`
  font-weight: bold;
  border: none;
  border-radius: 50%;
  color: rgba(0, 0, 0, 0.5);
  background-color: rgba(0, 0, 0, 0.2);
  cursor: pointer;

  &:hover {
    background-color: rgba(0, 0, 0, 0.4);
  }
`;
