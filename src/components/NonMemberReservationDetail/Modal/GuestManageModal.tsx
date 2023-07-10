import { useRecoilState } from 'recoil';
import Modal from '../../shared/Modal';
import { guestManageModalAtom } from '../../../recoil/modalAtoms';
import styled from 'styled-components';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import ColorButton from '../../shared/UI/ColorButton';
import { useEffect, useState } from 'react';
import useAuthorizedRequest from '../../../hooks/useAuthorizedRequest';
import { useParams } from 'react-router-dom';

const IconStyle = {
  border: '1px solid rgb(200,200,200)',
  padding: '0.5rem',
  borderRadius: '100%',
};

interface GuestManageModalProps {
  maxPeople: number;
  minPeople: number;
  peopleCount: number;
}

export default function GuestManageModal({ peopleCount, minPeople, maxPeople }: GuestManageModalProps) {
  const { codeNumber } = useParams();
  const [guestModalState, setGuestModalState] = useRecoilState(guestManageModalAtom);
  const [guestCount, setGuestCount] = useState(peopleCount);
  const { responseData, sendRequest } = useAuthorizedRequest({});

  const plustGuestCount = () => {
    if (guestCount === maxPeople) return;
    setGuestCount(prev => prev + 1);
  };

  const minusGuestCount = () => {
    if (guestCount === minPeople) return;
    setGuestCount(prev => prev - 1);
  };

  const initialState = () => {
    setGuestCount(peopleCount);
  };

  const submitFixGuestNumber = async () => {
    if (peopleCount === guestCount) return;

    await sendRequest({
      url: `/api/non-member-reservations/${codeNumber}`,
      body: { peopleCount: guestCount },
      method: 'PATCH',
    });
  };

  useEffect(() => {
    if (!responseData) return;

    if (responseData.isSuccess) {
      setGuestModalState(false);
      window.location.reload();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responseData]);

  useEffect(() => {
    if (!peopleCount) return;
    setGuestCount(peopleCount);
  }, [peopleCount]);

  const body = (
    <div>
      <div style={{ paddingTop: '10px' }}>{`최대 숙박 가능 인원: ${maxPeople}`}</div>
      <StyleButtonBox>
        <div>{`인원 ${guestCount}명`}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <StyleButton disabled={guestCount === minPeople}>
            <AiOutlineMinus onClick={minusGuestCount} style={{ ...IconStyle }} />
          </StyleButton>
          <StyleButton disabled={guestCount === maxPeople}>
            <AiOutlinePlus onClick={plustGuestCount} style={{ ...IconStyle }} />
          </StyleButton>
        </div>
      </StyleButtonBox>
      <ColorButton label="수정하기" onClick={submitFixGuestNumber} />
    </div>
  );
  return (
    <Modal
      title="인원"
      label="게스트 관리"
      body={body}
      isOpen={guestModalState}
      onClose={() => {
        setGuestModalState(false);
        initialState();
      }}
    />
  );
}

const StyleButtonBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
  padding: 1rem;
  border-top: 1px solid rgb(200, 200, 200);
  border-bottom: 1px solid rgb(200, 200, 200);
`;

const StyleButton = styled.button`
  border: none;
  outline: none;
  background: none;
  cursor: pointer;
  padding: 0;
  margin: 0;
`;
