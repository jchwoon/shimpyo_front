import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import axios from 'axios';

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

  const fetchAddressData = async () => {
    axios.defaults.withCredentials = false;
    axios.defaults.headers.common['Authorization'] = `KakaoAK ${'7f1558f4d3769fd396465bb676afe75c'}`;
    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

    try {
      const response = await axios.get(`https://dapi.kakao.com/v2/local/search/address.json?query=${searchWord}`);
      console.log(response.data.documents);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAddressData();
  }, [searchWord]);

  return (
    <StyledBarContainer>
      <StyledFlexDiv>
        <MdLocationPin size="25px" />
        <StyledInput
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
  width: 100%;
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
