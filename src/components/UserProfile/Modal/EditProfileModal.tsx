import { useRecoilState } from 'recoil';
import Modal from '../../shared/Modal';
import { editprofileModalAtom } from '../../../recoil/modalAtoms';
import styled from 'styled-components';
import { BsCameraFill } from 'react-icons/bs';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import BlackButton from '../../Account/ReUse/UI/BlackButton';
import useAuthorizedRequest from '../../../hooks/useAuthorizedRequest';
import Avatar from '../../shared/Avatar';

interface EditProfileModalProps {
  userProfileData: {
    profileImage: string;
    selfIntroduce: string;
  };
  fetchUserProfileData: () => void;
}

export default function EditProfileModal({ userProfileData, fetchUserProfileData }: EditProfileModalProps) {
  const { responseData, sendRequest } = useAuthorizedRequest({});
  const [isOpenEditProfileModal, setIsOpenEditProfileModal] = useRecoilState(editprofileModalAtom);
  const [introduceValue, setIntroduceValue] = useState<string>(userProfileData.selfIntroduce);
  const [fileImage, setFileImage] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const onChangeIntroduce = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setIntroduceValue(e.target.value);
  };

  const onChangeFile = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];

    setFileImage(URL.createObjectURL(file));
  };

  const onClickHideInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const editProfileInfo = async () => {
    const formData = new FormData();

    formData.append('profileImage', fileImage);
    formData.append('selfIntroduce', new Blob([JSON.stringify(introduceValue)], { type: 'application/json' }));

    await sendRequest({ url: '/user/change-profile', method: 'PATCH', body: formData });
  };

  const initialState = () => {
    setFileImage('');
    setIntroduceValue(userProfileData.selfIntroduce);
  };

  useEffect(() => {
    if (!responseData) return;

    if (responseData.isSuccess) {
      setIsOpenEditProfileModal(false);
      fetchUserProfileData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responseData]);

  const body = (
    <StyleContainer>
      <StyleImageContents>
        <StyleUserImage>
          <Avatar height="100%" width="100%" src={fileImage || userProfileData.profileImage} />
        </StyleUserImage>
        <StyleProfileImageEditButton onClickCapture={onClickHideInput}>
          <BsCameraFill size={20} />
          <span>수정</span>
          <input ref={fileInputRef} accept=".png, .jpeg .jpg" hidden type="file" onChange={onChangeFile} />
        </StyleProfileImageEditButton>
      </StyleImageContents>
      <StyleUserProfileDetailBox>
        <h2 style={{ fontSize: '20px', fontWeight: 'bold' }}>정채운 님의 소개</h2>
        <div style={{ marginTop: '20px' }}>
          <StyleTextBox>
            <div style={{ width: '100%' }}>
              <StyleIntroduceEditMode value={introduceValue} onChange={onChangeIntroduce} autoComplete="off">
                {userProfileData.selfIntroduce}
              </StyleIntroduceEditMode>
            </div>
          </StyleTextBox>
          <StyleLimitValue valueLength={introduceValue.length}>{`${introduceValue.length}/450자`}</StyleLimitValue>
        </div>
      </StyleUserProfileDetailBox>
      <div style={{ border: '1px solid rgb(200,200,200)', width: '100%', margin: '20px 0' }}></div>
    </StyleContainer>
  );

  const footer = (
    <div style={{ textAlign: 'end' }}>
      <BlackButton onClick={editProfileInfo} buttonType="button" disabled={introduceValue.length > 450} label="저장" />
    </div>
  );
  return (
    <Modal
      body={body}
      isOpen={isOpenEditProfileModal}
      label="프로필 수정"
      title="프로필을 수정해보세요"
      footer={footer}
      onClose={() => {
        setIsOpenEditProfileModal(false);
        initialState();
      }}
    />
  );
}

const StyleContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
`;

const StyleUserProfileDetailBox = styled.div`
  position: relative;
  width: 100%;
  margin-top: 30px;
`;

const StyleImageContents = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
`;

const StyleProfileImageEditButton = styled.div`
  position: absolute;
  bottom: 20px;
  display: flex;
  flex-direction: flex;
  cursor: pointer;
  align-items: center;
  padding: 0.3rem 0.5rem;
  gap: 0.5rem;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0px 3px 8px 4px rgba(100, 100, 100, 20%);
`;

const StyleUserImage = styled.div`
  width: 130px;
  height: 130px;
  border-radius: 100%;
  overflow: hidden;
`;

const StyleTextBox = styled.div`
  width: 100%;
  border-radius: 5px;
  border: 1px solid black;
  padding: 3px;
`;

const StyleIntroduceEditMode = styled.textarea`
  padding: 8px;
  font-size: 16px;
  border: none;
  min-width: 100%;
  max-width: 100%;
  min-height: 120px;
  outline: none;
  word-break: keep-all;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
`;

const StyleLimitValue = styled.div<{ valueLength: number }>`
  font-size: 13px;
  text-align: end;

  color: ${props => (props.valueLength > 450 ? 'red' : '')};
`;
