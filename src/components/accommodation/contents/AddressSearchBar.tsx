import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { MdLocationPin } from 'react-icons/md';

import AddressSearchList from './AddressSearchList';

export default function AddressSearchBar() {
  const [searchWord, setSearchWord] = useState<string>('');
  const [searchResult, setSearchResult] = useState({});

  const [focus, setFocus] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const scriptRef = useRef<HTMLScriptElement | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWord(e.target.value);
    setSearchResult({});
  };

  const handleOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setSearchWord('');
    setSearchResult({});
    inputRef.current?.focus();
  };

  const handleOnFocus = () => {
    setFocus(true);
  };

  const handleOnBlur = () => {
    setFocus(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchWord(searchWord);
      const script = document.createElement('script');
      scriptRef.current = script;
      script.async = true;
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}&libraries=places&callback=initAutocomplete`;
      document.head.appendChild(script);
    }, 500);

    window.initAutocomplete = () => {
      const autocomplete = new window.google.maps.places.AutocompleteService();
      const request = {
        input: searchWord,
        type: ['street_address', 'geocode'],
        componentRestrictions: {
          country: 'KR',
        },
      };
      autocomplete
        .getPlacePredictions(request)
        .then((predictions: any) => {
          setSearchResult(predictions);
          console.log(predictions);
        })
        .catch((err: Error) => {
          console.log(err);
        });
    };

    return () => {
      clearTimeout(timer);
      delete window.initAutocomplete;
      if (scriptRef.current && scriptRef.current.parentNode) {
        scriptRef.current.parentNode.removeChild(scriptRef.current);
      }
    };
  }, [searchWord]);

  return (
    <StyledPositionDiv>
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
            onFocus={handleOnFocus}
            onBlur={handleOnBlur}
          ></StyledInput>
        </StyledFlexDiv>
        {searchWord.length > 0 && <StyledCancelButton onClick={handleOnClick}>X</StyledCancelButton>}
      </StyledBarContainer>
      <AddressSearchList searchResult={searchResult} focus={focus} />
    </StyledPositionDiv>
  );
}

const StyledPositionDiv = styled.div`
  position: relative;
`;

const StyledBarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  z-index: 100;
  width: 100%;
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
