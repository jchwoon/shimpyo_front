import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { BsDot } from 'react-icons/bs';
import ColorButton from '../shared/UI/ColorButton';
import { reviewModalAtom } from '../../recoil/modalAtoms';
import { useSetRecoilState } from 'recoil';

type ListType = {
  reservationId: number;
  houseImageUrl: string;
  houseName: string;
  houseOwnerName: string;
  houseType: string;
  checkInDate: string;
  checkOutDate: string;
  reservationStatus?: string;
  existReview?: boolean;
};

interface GridContentsProps {
  contentsArray?: ListType[];
  visited?: boolean;
}

export default function GridContents({ contentsArray, visited }: GridContentsProps) {
  const setIsReviewModalOpen = useSetRecoilState(reviewModalAtom);
  return (
    <>
      {contentsArray?.map(item => (
        <div key={item.reservationId} style={{ display: 'flex', flexDirection: 'column' }}>
          <Link to={`detail?reservationId=${item.reservationId}`}>
            <StyleGridItem>
              <StyleAccommodation
                loading="lazy"
                src={`${item.houseImageUrl ? item.houseImageUrl : '/images/image.png'}`}
                alt={item.houseName}
              />
              <StyleContent>
                {item.reservationStatus && (
                  <StyleReservationStatus>
                    <span>{item.reservationStatus}</span>
                  </StyleReservationStatus>
                )}
                <div style={{ position: 'relative' }}>
                  <h3>{item.houseName}</h3>
                  <BsDot style={{ position: 'absolute', right: '-28px', top: '-2px' }} size={25} />
                  <span style={{ position: 'absolute', right: '-58px', top: '2px' }}>{item.houseType}</span>
                </div>
                <div>
                  <span>{`${item.checkInDate}`}</span>
                  <span style={{ rotate: '90deg' }}>~</span>
                  <span>{`${item.checkOutDate}`}</span>
                </div>
              </StyleContent>
            </StyleGridItem>
          </Link>

          {visited && (
            <StyleButtonBox>
              <ColorButton
                label={`${item.existReview ? '후기 수정하기' : '후기 작성하기'}`}
                onClick={() => setIsReviewModalOpen(true)}
              />
            </StyleButtonBox>
          )}
        </div>
      ))}
    </>
  );
}

const StyleGridItem = styled.div`
  cursor: pointer;
  border-radius: 10px;
  border: 1px solid rgb(220, 220, 220);
  overflow: hidden;
  background-color: white;
  height: 290px;

  display: flex;
  flex-direction: column;
  box-shadow: 4px 6px 4px -1px rgb(0 0 0 / 0.1), 4px 6px 4px -2px rgb(0 0 0 / 0.1);
`;

const StyleAccommodation = styled.img`
  height: 55%;
  object-fit: cover;
  object-position: center;
`;

const StyleContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem;
  height: 100%;
  font-family: Noto Sans KR;
  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.2rem;
  }
  h3 {
    font-weight: bold;
    font-size: 18px;
  }
`;

const StyleReservationStatus = styled.div`
  padding: 0.3rem;
  border-radius: 5px;
  font-size: 15px;
  color: white;
  background-color: #009ca6;
`;

const StyleButtonBox = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  margin-top: 0.3;
`;
