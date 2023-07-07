import AccountInfoList, { AccountInfoListProps } from '../ReUse/AccountInfoList';

interface EmailInfoProps extends Pick<AccountInfoListProps, 'infoContent'> {}

export default function EmailInfo({ infoContent }: EmailInfoProps) {
  const editComponent = <div>hi</div>;
  return <AccountInfoList title="이메일 주소" editComponent={editComponent} infoContent={infoContent} />;
}
