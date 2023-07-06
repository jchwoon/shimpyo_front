import styled from 'styled-components';
import ImageBox from './ImageBox';
import { useEffect, useState } from 'react';
import SectionListBox from '../../ReUse/SectionListBox';
import Section from '../../ReUse/Section';
import { BsHouseDoor } from 'react-icons/bs';
import { GrUserManager } from 'react-icons/gr';
import { changeDateType, formatDate } from '../../../../utils/changeFormat';
import { useNavigate } from 'react-router-dom';

interface ImageSectionProps {
  imageList: string[];
  checkIn: string;
  checkOut: string;
  houseId: number;
  hostname: string;
  houseOwnerId: number;
  isOver?: boolean;
}

export default function ImageSection({
  imageList,
  checkIn,
  checkOut,
  houseId,
  hostname,
  houseOwnerId,
  isOver,
}: ImageSectionProps) {
  const navigation = useNavigate();
  const [changeCheckIn, setChangeCheckIn] = useState('');
  const [changeCheckOut, setChangeCheckOut] = useState('');

  const toHouseDetailPage = () => {
    navigation(`/detail/${houseId}`);
  };

  const toHostPage = () => {
    navigation(`/users/${houseOwnerId}`);
  };

  useEffect(() => {
    if (!checkIn || !checkOut) return;
    const changeCheckInToDateType = changeDateType(checkIn);
    const changeCheckOutToDateType = changeDateType(checkOut);

    setChangeCheckIn(formatDate(changeCheckInToDateType));
    setChangeCheckOut(formatDate(changeCheckOutToDateType));
  }, [checkIn, checkOut]);
  return (
    <StyleSection>
      <ImageBox imageList={imageList} />
      <Section>
        {!isOver && (
          <>
            <StyleDateBox>
              <div style={{ borderRight: '1px solid rgb(200, 200, 200)' }}>
                <div style={{ marginBottom: '1rem', fontSize: '16px', fontWeight: 'bold' }}>체크인</div>
                <div style={{ marginBottom: '1rem' }}>{changeCheckIn.split(' ').slice(0, 3).join(' ')}</div>
                <div>{changeCheckIn.split(' ').slice(3, 5).join(' ')}</div>
              </div>
              <div>
                <div style={{ marginBottom: '1rem', fontSize: '16px', fontWeight: 'bold' }}>체크아웃</div>
                <div style={{ marginBottom: '1rem' }}>{changeCheckOut.split(' ').slice(0, 3).join(' ')}</div>
                <div>{changeCheckOut.split(' ').slice(3, 5).join(' ')}</div>
              </div>
            </StyleDateBox>
            <StyleLine />
          </>
        )}
        <SectionListBox onClick={toHouseDetailPage} button icon={BsHouseDoor} content="숙소 상세 보기" title="숙소" />
        <StyleLine />
        <SectionListBox onClick={toHostPage} button icon={GrUserManager} content={hostname} title="호스트 정보 보기" />
      </Section>
    </StyleSection>
  );
}

const StyleSection = styled.section`
  display: flex;
  flex-direction: column;
`;

const StyleDateBox = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
  gap: 2rem;
  /* justify-content: space-around; */
  align-items: center;
  padding-bottom: 1.5rem;
`;

const StyleLine = styled.div`
  height: 1px;
  width: 100%;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  background-color: rgb(200, 200, 200);
`;
