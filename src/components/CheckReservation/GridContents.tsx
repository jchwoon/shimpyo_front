import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { BsDot } from 'react-icons/bs';
import ColorButton from '../shared/UI/ColorButton';
import { reservationDetailModalAtom, reviewManageModalAtom, reviewModalAtom } from '../../recoil/modalAtoms';
import { useSetRecoilState } from 'recoil';
import { reviewAverageScoreAtom, reviewContentAtom, reviewIdAtom } from '../../recoil/reviewAtoms';
import useAuthorizedRequest from '../../hooks/useAuthorizedRequest';

type ListType = {
  reservationId: number;
  houseImageUrl: string;
  houseName: string;
  houseOwnerName: string;
  houseType: string;
  checkInDate: string;
  checkOutDate: string;
  reservationStatus: State;
  existReview?: boolean;
};

interface GridContentsProps {
  contentsArray?: ListType[];
  visited?: boolean;
}

type AverageScore = 'GOOD' | 'NORMAL' | 'BAD';

interface targetReviewData {
  reservationId: number;
  reviewId: number;
  memberImageUrl: string;
  contents: string;
  reviewRating: AverageScore;
}

type State = 'COMPLETE' | 'USING' | 'FINISHED' | 'CANCEL';

function getStateMessage(state: State): string {
  switch (state) {
    case 'COMPLETE':
      return '예약완료';
    case 'USING':
      return '이용중';
    case 'FINISHED':
      return '이용완료';
    case 'CANCEL':
      return '취소됨';
    default:
      return '';
  }
}

export default function GridContents({ contentsArray, visited }: GridContentsProps) {
  const setIsReviewModalOpen = useSetRecoilState(reviewModalAtom);
  const setIsReviewManageModalOpen = useSetRecoilState(reviewManageModalAtom);
  const [searchParams, setSearchParams] = useSearchParams();
  const { responseData, sendRequest } = useAuthorizedRequest<targetReviewData[]>({});
  const setContent = useSetRecoilState(reviewContentAtom);
  const setAverageScore = useSetRecoilState(reviewAverageScoreAtom);
  const setReviewId = useSetRecoilState(reviewIdAtom);
  const setReservationDetailModal = useSetRecoilState(reservationDetailModalAtom);
  const navigation = useNavigate();

  const getReviewData = async () => {
    await sendRequest({ url: '/user/reviews' });
  };

  const openModalHandler = (reservationId: number, modalType: 'write' | 'manage') => {
    setSearchParams(searchParams => {
      searchParams.set('reservationId', reservationId + '');
      return searchParams;
    });

    if (modalType === 'manage') {
      getReviewData();
      setIsReviewManageModalOpen(true);
    } else {
      setIsReviewModalOpen(true);
    }
  };

  const showDetailReservation = (reservationId: number, state: State) => {
    if (state === 'COMPLETE' || state === 'USING') {
      navigation(`detail/${reservationId}`);
    } else {
      setSearchParams(searchParams => {
        searchParams.set('reservationId', String(reservationId));
        return searchParams;
      });
      setReservationDetailModal(true);
    }
  };

  useEffect(() => {
    if (!responseData) return;

    if (responseData.isSuccess) {
      const reservationId = searchParams.get('reservationId');
      if (reservationId) {
        const findReview = responseData.result.find(review => review.reservationId === Number(reservationId));
        if (findReview) {
          setContent(findReview?.contents);
          setAverageScore(findReview?.reviewRating);
          setReviewId(findReview?.reviewId);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responseData, searchParams]);
  return (
    <>
      {contentsArray?.map(item => (
        <div key={item.reservationId} style={{ display: 'flex', flexDirection: 'column' }}>
          <StyleGridItem onClick={() => showDetailReservation(item.reservationId, item.reservationStatus)}>
            <StyleAccommodation
              loading="lazy"
              src={`${item.houseImageUrl ? item.houseImageUrl : '/images/image.png'}`}
              alt={item.houseName}
            />
            <StyleContent>
              {item.reservationStatus && (
                <StyleReservationStatus>
                  <span>{getStateMessage(item.reservationStatus)}</span>
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

          {visited && (
            <StyleButtonBox>
              {item.existReview ? (
                <ColorButton
                  label="후기 수정하기"
                  onClick={() => {
                    openModalHandler(item.reservationId, 'manage');
                  }}
                />
              ) : (
                <ColorButton
                  label="후기 작성하기"
                  onClick={() => {
                    openModalHandler(item.reservationId, 'write');
                  }}
                />
              )}
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
