import styled from 'styled-components';
import Section from '../ReUse/Section';
import SectionListBox from '../ReUse/SectionListBox';
import { AiFillCopy } from 'react-icons/ai';
import { MdLocationOn } from 'react-icons/md';
import SectionMenuListBox from '../ReUse/SectionMenuListBox';
import { useSetRecoilState } from 'recoil';
import { alarmAtoms } from '../../../recoil/modalAtoms';

interface GuideSectionProps {
  address: string;
  lat: number;
  lng: number;
}

export default function GuideSection({ address, lat, lng }: GuideSectionProps) {
  const setAlarmOpen = useSetRecoilState(alarmAtoms);

  const handleCopyAddress = () => {
    const copy = address;
    navigator.clipboard
      .writeText(copy)
      .then(() => {
        setAlarmOpen(true);
      })
      .catch(error => {
        console.error('복사 에러:', error);
      });
  };

  const openGoogleMap = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
    window.open(url, '_blank', 'noopener noreferrer');
  };
  return (
    <Section title="찾아가는 방법">
      <SectionListBox content={address} title="주소" />
      <StyleLine />
      <SectionMenuListBox onClick={handleCopyAddress} icon={AiFillCopy} content="주소 복사하기" />
      <StyleLine />
      <SectionMenuListBox onClick={openGoogleMap} icon={MdLocationOn} content="찾아가는 방법 보기" />
    </Section>
  );
}

const StyleLine = styled.div`
  height: 1px;
  width: 100%;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  background-color: rgb(200, 200, 200);
`;
