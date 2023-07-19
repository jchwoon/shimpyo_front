import { useRecoilValue } from 'recoil';
import { currentRoomDataIndexState } from '../../../recoil/hostingManageAtoms';
import RoomEditInfoItem from './RoomEditInfoItem';

export default function RoomEditInfo() {
  const currentRoomDataIndex = useRecoilValue(currentRoomDataIndexState);

  return <RoomEditInfoItem idx={currentRoomDataIndex} key={`roomitem ${currentRoomDataIndex}`}></RoomEditInfoItem>;
}
