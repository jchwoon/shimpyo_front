import AccountInfoList from '../ReUse/AccountInfoList';

export default function ChangePasswordInfo() {
  const editComponent = <div>hi</div>;
  return <AccountInfoList title="비밀번호" editComponent={editComponent} infoContent="비밀번호 업데이트" />;
}
