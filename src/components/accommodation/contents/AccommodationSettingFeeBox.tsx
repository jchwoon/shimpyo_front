import { useState, useEffect, ChangeEvent, useCallback } from 'react';
import styled from 'styled-components';

import { FaPlus } from 'react-icons/fa';
import { FaMinus } from 'react-icons/fa';

export default function AccommodationSettingFeeBox() {
  const [price, setPrice] = useState<string>('');
  const [isMinusDisabled, setIsMinusDisabled] = useState<boolean>(false);
  const [isPlusDisabled, setIsPlusDisabled] = useState<boolean>(false);
  const MAX_PRICE = 99999999999;

  const handleOnChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === '' || !isNaN(Number(e.target.value))) {
      const newPrice = e.target.value === '' ? 0 : Number(e.target.value);

      if (newPrice >= MAX_PRICE) {
        setPrice(MAX_PRICE.toString());
      } else {
        setPrice(newPrice.toString());
      }
    }
  }, []);

  const handlePlusOnClick = useCallback(() => {
    setPrice(preState => {
      const currentValue = preState ? parseInt(preState) : 0;
      const increment = 1000;

      const newPrice = currentValue + increment;
      if (newPrice >= MAX_PRICE) {
        return MAX_PRICE.toString();
      } else {
        return newPrice.toString();
      }
    });
  }, []);

  const handleMinusOnClick = useCallback(() => {
    setPrice(preState => {
      const newPrice = preState ? parseInt(preState) - 1000 : 0;
      return newPrice >= 0 ? newPrice.toString() : '0';
    });
  }, []);

  useEffect(() => {
    if (price === '' || price === '0') {
      setIsMinusDisabled(true);
    } else {
      setIsMinusDisabled(false);
    }

    if (price === MAX_PRICE.toString()) {
      setIsPlusDisabled(true);
    } else {
      setIsPlusDisabled(false);
    }
  }, [price]);

  return (
    <StyledContainer>
      <StyledCounterContainer>
        <StyledCounterBtn disabled={isMinusDisabled} onClick={handleMinusOnClick}>
          <StyledMinusIcon />
        </StyledCounterBtn>
        <StyledFeeResult placeholder={'₩00'} onChange={handleOnChange} value={price} />
        <StyledCounterBtn disabled={isPlusDisabled} onClick={handlePlusOnClick}>
          <StyledPlusIcon />
        </StyledCounterBtn>
      </StyledCounterContainer>
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  width: 550px;
  height: 250px;
  background-color: rgba(0, 0, 0, 0.04);
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.1);
`;

const StyledCounterContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

const StyledCounterBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  background-color: white;
  border-radius: 100%;
  border: 1px solid rgba(0, 0, 0, 0.2);

  &:hover {
    cursor: pointer;
    border-color: black;
  }

  &:disabled {
    border-color: rgba(0, 0, 0, 0.1);
    cursor: not-allowed;
  }
`;

const StyledFeeResult = styled.input`
  margin: 0 30px;
  text-align: center;
  width: 300px;
  height: 100px;
  border-radius: 10px;
  font-size: 40px;
`;

const StyledMinusIcon = styled(FaMinus)`
  size: 10px;
  color: rgba(0, 0, 0, 0.4);

  ${StyledCounterBtn}:hover & {
    color: black;
  }

  ${StyledCounterBtn}:disabled & {
    color: rgba(0, 0, 0, 0.1);
  }
`;

const StyledPlusIcon = styled(FaPlus)`
  size: 10px;
  color: rgba(0, 0, 0, 0.4);

  ${StyledCounterBtn}:hover & {
    color: black;
  }
`;
