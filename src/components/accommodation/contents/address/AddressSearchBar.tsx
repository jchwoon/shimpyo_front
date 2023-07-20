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
    setTimeout(() => {
      setFocus(false);
    }, 100);
  };

  useEffect(() => {
    let autocompleteService;
    const script = document.createElement('script');

    const loadGoogleMapsAPI = () => {
      script.async = true;
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}&libraries=places&callback=initAutocomplete`;
      scriptRef.current = script;
    };

    const handleAutocomplete = () => {
      autocompleteService = new window.google.maps.places.AutocompleteService();
      const request = {
        input: searchWord,
        type: ['street_address', 'geocode'],
        componentRestrictions: {
          country: 'KR',
        },
      };
      autocompleteService
        .getPlacePredictions(request)
        .then((predictions: any) => {
          setSearchResult(predictions);
        })
        .catch((err: Error) => {
          console.log(err.message);
        });
    };

    //디바운스 역할
    const timer = setTimeout(() => {
      setSearchWord(searchWord);
    }, 500);

    if (!window.google) {
      loadGoogleMapsAPI();
    } else {
      handleAutocomplete();
    }

    return () => {
      clearTimeout(timer);

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
  border: 1px solid rgba(0, 0, 0, 0.3);

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
  width: 90%;
`;

const StyledInput = styled.input`
  border: none;
  padding: none;
  margin-left: 10px;
  width: 100%;
  border-radius: 10px;
  &:focus {
    outline: none;
  }
`;

const StyledCancelButton = styled.button`
  font-weight: bold;
  border: none;
  width: 20px;
  border-radius: 50%;
  color: rgba(0, 0, 0, 0.5);
  background-color: rgba(0, 0, 0, 0.2);
  cursor: pointer;

  &:hover {
    background-color: rgba(0, 0, 0, 0.4);
  }
`;
