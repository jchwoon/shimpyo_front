import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import useAuthorizedRequest from '../../hooks/useAuthorizedRequest';
import { useParams } from 'react-router-dom';
import AccommodationInfoItem from './accommodation/AccommodationInfoItem';
import AccommodationDeleteButton from './accommodation/AccommodationDeleteButton';
import AccommodationEditPicture from './accommodation/AccommodationEditPicture';
import { useRecoilState } from 'recoil';
import {
  accommodationDataState,
  originalAccommodationDataState,
  originalPatchHouseReqState,
  originalRoomDataState,
  patchHouseReqState,
  roomDataState,
} from '../../recoil/hostingManageAtoms';
import AccommodationPicture from './accommodation/AccommodationPicture';
import AccommodationContents from './accommodation/AccommodationContents';
import AccommodationEditContents from './accommodation/AccommodationEditContents';
import AccommodationAmenity from './accommodation/AccommodationAmenity';
import AccommodationEditAmenity from './accommodation/AccommodationEditAmenity';
import AddressInputContents from './accommodation/AccommodationEditAddress';
import RoomInfo from './room/RoomInfo';
import RoomEditInfo from './room/RoomEditInfo';
import RoomInfoItem from './room/RoomInfoItem';

export interface AccommodationData {
  houseId: number;
  name: string;
  type: 'HOTEL' | 'MOTEL' | 'GUEST' | 'PENSION';
  options: Array<'wifi' | 'pc' | 'parking' | 'bbq'>;
  contents: string;
  postCode: string;
  sido: string;
  sigungu: string;
  fullAddress: string;
  lat: number;
  lng: number;
  houseImages: Array<string>;
  likeReviewCount: number;
  totalReviewCount: number;
  [key: string]: any;
}

export interface RoomData {
  roomId: number;
  name: string;
  price: number;
  minPeople: number;
  maxPeople: number;
  bedCount: number;
  bedroomCount: number;
  bathroomCount: number;
  totalCount: number;
  checkIn: string;
  checkOut: string;
  roomImages: Array<string>;
}

interface MoveBarProps {
  selectedIndex: number;
}

export default function HostingManageMain() {
  const { houseId } = useParams();
  const { sendRequest, responseData } = useAuthorizedRequest<any>({});
  const photoRef = useRef<HTMLDivElement>(null);
  const basicInfoRef = useRef<HTMLDivElement>(null);
  const amenityRef = useRef<HTMLDivElement>(null);
  const locationRef = useRef<HTMLDivElement>(null);
  const roomRef = useRef<HTMLDivElement>(null);
  const [scrollEventActive, setScrollEventActive] = useState<boolean>(true);

  const [originalAccommodationData, setOriginalAccommodationData] = useRecoilState(originalAccommodationDataState);
  const [originalRoomData, setOriginalRoomData] = useRecoilState(originalRoomDataState);
  const [originalPatchHouseReq, setOriginalPatchHouseReq] = useRecoilState(originalPatchHouseReqState);

  const [accommodationData, setAccommodationData] = useRecoilState(accommodationDataState);
  const [roomData, setRoomData] = useRecoilState(roomDataState);
  const [patchHouseReq, setPatchHouseReq] = useRecoilState(patchHouseReqState);

  const [selectedItemIndex, setSelectedItemIndex] = useState<number>(0);

  const scrollToElement = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      setScrollEventActive(false);
      window.scrollTo({
        top: ref.current.offsetTop,
        behavior: 'smooth',
      });
      setTimeout(() => {
        setScrollEventActive(true);
      }, 1000);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (!scrollEventActive) return;
      const scrollPositionTop = document.documentElement.scrollTop || document.body.scrollTop;

      if (photoRef.current && scrollPositionTop >= photoRef.current.offsetTop) {
        setSelectedItemIndex(0);
      }
      if (basicInfoRef.current && scrollPositionTop >= basicInfoRef.current.offsetTop) {
        setSelectedItemIndex(1);
      }
      if (amenityRef.current && scrollPositionTop >= amenityRef.current.offsetTop) {
        setSelectedItemIndex(2);
      }
      if (locationRef.current && scrollPositionTop >= locationRef.current.offsetTop) {
        setSelectedItemIndex(3);
      }
      if (roomRef.current && scrollPositionTop >= roomRef.current.offsetTop) {
        setSelectedItemIndex(4);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrollEventActive]);

  useEffect(() => {
    const fetchData = async () => {
      await sendRequest({ url: `/api/houses/${houseId}` });
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!responseData) return;
    if (responseData.isSuccess) {
      setAccommodationData(responseData.result.house);
      setRoomData(responseData.result.rooms);
      setOriginalAccommodationData(responseData.result.house);
      setOriginalRoomData(responseData.result.rooms);

      const { name, type, options, contents, postCode, sido, sigungu, fullAddress, lat, lng }: AccommodationData =
        responseData.result.house;
      const option = { wifi: false, pc: false, parking: false, bbq: false };
      if (options.length > 0) {
        options.forEach((v, i) => (option[v] = true));
      }

      const newPatchData = {
        name,
        type,
        option,
        contents,
        address: { postCode, sido, sigungu, fullAddress, lat, lng },
        patchImageReqs: [],
      };

      setPatchHouseReq(newPatchData);
      setOriginalPatchHouseReq(newPatchData);
    }
  }, [responseData]);

  return (
    <StyledFlexDiv>
      <StyledManageContainer>
        <StyledTitleContainer>
          <StyledName>{accommodationData?.name}</StyledName>
          <AccommodationDeleteButton houseId={houseId}></AccommodationDeleteButton>
        </StyledTitleContainer>
        <StyledContentsContainer>
          <StyledMenu>
            <StyledSubName>숙소 기본 정보</StyledSubName>
            <StyledNav>
              <StyledUl>
                {[
                  ['사진', photoRef],
                  ['숙소 기본 정보', basicInfoRef],
                  ['편의시설', amenityRef],
                  ['위치', locationRef],
                  ['객실', roomRef],
                ].map((item, index) => (
                  <StyledLi
                    key={index}
                    onClick={() => {
                      setSelectedItemIndex(index);
                      scrollToElement(item[1] as React.RefObject<HTMLDivElement>);
                    }}
                  >
                    <>{item[0]}</>
                  </StyledLi>
                ))}
              </StyledUl>
              <StyledMoveBar selectedIndex={selectedItemIndex} />
            </StyledNav>
          </StyledMenu>
          <StyledInfo>
            <AccommodationInfoItem
              houseId={houseId}
              editContents={<AccommodationEditPicture images={accommodationData?.houseImages as string[]} />}
              Ref={photoRef}
              label="사진"
            >
              <AccommodationPicture />
            </AccommodationInfoItem>
            <AccommodationInfoItem
              houseId={houseId}
              editContents={<AccommodationEditContents />}
              Ref={basicInfoRef}
              label="숙소기본정보"
            >
              <AccommodationContents />
            </AccommodationInfoItem>
            <AccommodationInfoItem
              houseId={houseId}
              editContents={<AccommodationEditAmenity />}
              Ref={amenityRef}
              label="편의시설"
            >
              <AccommodationAmenity />
            </AccommodationInfoItem>
            <AccommodationInfoItem
              houseId={houseId}
              editContents={<AddressInputContents />}
              Ref={locationRef}
              label="위치"
            >
              {accommodationData?.fullAddress}
            </AccommodationInfoItem>
            <RoomInfoItem houseId={houseId} editContents={<RoomEditInfo />} Ref={roomRef} label="객실">
              <RoomInfo />
            </RoomInfoItem>
          </StyledInfo>
        </StyledContentsContainer>
      </StyledManageContainer>
    </StyledFlexDiv>
  );
}

const StyledFlexDiv = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledManageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 0 30px;
  box-sizing: border-box;
`;

const StyledTitleContainer = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 30px;
  justify-content: space-between;
  align-items: center;
`;
const StyledName = styled.h1`
  font-size: 35px;
  font-weight: 600;
  padding: 40px 0 20px 20px;
  box-sizing: border-box;
`;

const StyledContentsContainer = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: 1075px) {
    display: grid;
    grid-template-columns: 1fr 2fr;
  }
`;

const StyledMenu = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  @media (min-width: 1075px) {
    position: sticky;
    top: 80px;
    width: 200px;
    height: 100px;
  }
`;

const StyledNav = styled.div`
  position: relative;
`;

const StyledSubName = styled.h2`
  font-size: 20px;
  font-weight: 600;
  padding: 12px 16px;
  box-sizing: border-box;
`;

const StyledUl = styled.ul`
  display: grid;
  grid-template-columns: none;
  grid-template-rows: 1fr 1fr 1fr 1fr;
  margin-left: 16px;
  border-left: 0.833px solid rgba(0, 0, 0, 0.2);
`;

const StyledLi = styled.li`
  cursor: pointer;
  box-sizing: border-box;
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
  padding: 12px 0 12px 20px;
  transition: border-left 0.3s ease-in-out;
`;

const StyledMoveBar = styled.div<MoveBarProps>`
  position: absolute;
  width: 2px;
  height: 15px;
  background-color: black;
  top: 0;
  left: 16px;
  transition: transform 300ms ease;
  transform: ${({ selectedIndex }) => `translateY(${15 + 40 * selectedIndex}px)`};
`;

const StyledInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  padding: 20px;
  box-sizing: border-box;

  @media (min-width: 1075px) {
    padding: 0;
  }
`;
