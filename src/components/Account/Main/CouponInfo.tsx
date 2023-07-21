import styled from 'styled-components';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import useAuthorizedRequest from '../../../hooks/useAuthorizedRequest';
import { useEffect, useState } from 'react';
import { changeDateType, formatDate } from '../../../utils/changeFormat';

interface CouPonResultData {
  couponId: number;
  name: string;
  description: string;
  expiredDate: string;
  discount: string;
}

export default function CouponInfo() {
  const { responseData, sendRequest } = useAuthorizedRequest<CouPonResultData[]>({});
  const [couponInfo, setCouponInfo] = useState<CouPonResultData[]>([]);
  const [isOpenCouponDetail, setIsOpenCouponDetail] = useState<boolean>(false);

  const requestCouponInfo = async () => {
    await sendRequest({ url: '/user/coupons' });
  };

  const toggleCouponDetail = () => {
    setIsOpenCouponDetail(prev => !prev);
  };

  useEffect(() => {
    requestCouponInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!responseData) return;

    if (responseData.isSuccess) {
      setCouponInfo(responseData.result);
    }
  }, [responseData]);
  return (
    <StyleCouponBox>
      <StyleCouponButton onClick={toggleCouponDetail}>
        <StyleTotalCouponNumber>{`내 보유 쿠폰 총 ${couponInfo.length}장`}</StyleTotalCouponNumber>
        {isOpenCouponDetail ? <IoIosArrowUp size={20} /> : <IoIosArrowDown size={20} />}
      </StyleCouponButton>
      {isOpenCouponDetail && (
        <StyleCouponDetailBox>
          <StyleListBox>
            {couponInfo.map(coupon => (
              <StyleCouponList key={coupon.couponId}>
                <span>{`${coupon.name} ${coupon.discount}%`}</span>
                <span style={{ color: '#717171' }}>{`(${formatDate(changeDateType(coupon.expiredDate))})`}</span>
              </StyleCouponList>
            ))}
          </StyleListBox>
        </StyleCouponDetailBox>
      )}
    </StyleCouponBox>
  );
}

const StyleCouponBox = styled.div`
  margin-top: 30px;
  margin-bottom: 30px;
`;

const StyleCouponButton = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border: 2px solid black;
  border-radius: 10px;
  cursor: pointer;
  padding: 1rem;
`;

const StyleTotalCouponNumber = styled.span``;

const StyleCouponDetailBox = styled.div`
  margin-top: 1rem;
  border: 2px solid black;
  border-radius: 10px;
  padding: 1rem;
`;

const StyleCouponList = styled.li`
  display: flex;
  flex-direction: column;
  gap: 3px;
`;

const StyleListBox = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
