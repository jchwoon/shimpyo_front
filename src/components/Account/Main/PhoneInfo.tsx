import AccountInfoList, { AccountInfoListProps } from '../ReUse/AccountInfoList';

interface PhoneInfoProps extends Pick<AccountInfoListProps, 'infoContent'> {}

export default function PhoneInfo({ infoContent }: PhoneInfoProps) {
  const editComponent = <div>hi</div>;
  return <AccountInfoList title="전화번호" editComponent={editComponent} infoContent={infoContent} />;
}
