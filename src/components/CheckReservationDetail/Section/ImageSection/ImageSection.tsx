import styled from 'styled-components';
import ImageBox from './ImageBox';
import { useState } from 'react';
import SectionListBox from '../../ReUse/SectionListBox';
import Section from '../../ReUse/Section';
import { BsHouseDoor } from 'react-icons/bs';
import { GrUserManager } from 'react-icons/gr';

interface ImageSectionProps {
  imageList: string[];
  checkIn: string;
  checkOut: string;
  houseId: number;
  hostname: string;
}

export default function ImageSection({ imageList, checkIn, checkOut, houseId, hostname }: ImageSectionProps) {
  return (
    <StyleSection>
      <ImageBox imageList={imageList} />
      <Section>
        <StyleDateBox>
          <div style={{ borderRight: '1px solid rgb(200, 200, 200)' }}>
            <div style={{ marginBottom: '1rem', fontSize: '16px', fontWeight: 'bold' }}>체크인</div>
            <div>{checkIn}</div>
          </div>
          <div>
            <div style={{ marginBottom: '1rem', fontSize: '16px', fontWeight: 'bold' }}>체크아웃</div>
            <div>{checkOut}</div>
          </div>
        </StyleDateBox>
        <StyleLine />
        <SectionListBox button icon={BsHouseDoor} content="숙소 상세 보기" title="숙소" />
        <StyleLine />
        <SectionListBox button icon={GrUserManager} content={hostname} title="호스트 정보 보기" />
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
