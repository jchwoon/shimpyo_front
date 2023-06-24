import axios from 'axios';
import { ChangeEvent } from 'react';

export default function Test() {
  const formData = new FormData();
  const tmp = {
    name: '가든호텔 마포점',
    type: 'HOTEL',
    option: {
      wifi: true,
      pc: true,
      parking: false,
      bbq: false,
    },
    rooms: [
      {
        name: '싱글룸',
        price: 80000,
        minPeople: 2,
        maxPeople: 4,
        bedCount: 1,
        bedroomCount: 1,
        bathroomCount: 1,
        totalCount: 8,
        checkIn: '15:00',
        checkOut: '12:00',
        imageCount: 2,
      },
      {
        name: '더블룸',
        price: 90000,
        minPeople: 3,
        maxPeople: 6,
        bedCount: 2,
        bedroomCount: 1,
        bathroomCount: 1,
        totalCount: 5,
        checkIn: '15:00',
        checkOut: '12:00',
        imageCount: 3,
      },
      {
        name: '패밀리룸',
        price: 150000,
        minPeople: 4,
        maxPeople: 8,
        bedCount: 4,
        bedroomCount: 2,
        bathroomCount: 2,
        totalCount: 2,
        checkIn: '15:00',
        checkOut: '12:00',
        imageCount: 5,
      },
    ],
    address: {
      postCode: '04175',
      sido: '서울특별시',
      sigungu: '마포구',
      fullAddress: '서울 마포구 마포대로 58',
      lat: 36.366701,
      lng: 31.36941,
    },
    contents: '저희 가든 호텔은 ~@$#@$@#$% 입니다.^^',
  };

  const fetchData = async () => {
    try {
      const response = await axios.post('http://13.125.50.85:8081/user/houses', formData, {
        headers: {
          Authorization:
            'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0MTIzQGdtYWlsLmNvbSIsImlzTWVtYmVyIjp0cnVlLCJpZCI6MiwiZXhwIjoxNjg3MjAxMjg0LCJpYXQiOjE2ODcxOTUyODQsInVzZXJuYW1lIjoidGVzdDEyM0BnbWFpbC5jb20ifQ.CXPFpVJVW9FijwlUp53hlgO04_zXdI-JtZvua6LIiR8',
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log(response.data);

      for (let value of formData.values()) {
        console.log(value);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleOnSubmit = () => {
    formData.append('houseReq', new Blob([JSON.stringify(tmp)], { type: 'application/json' }));
    fetchData();
  };

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files?.[0]) formData.append('houseImages', files[0]);
  };
  const handleOnChangeR = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files?.[0]) formData.append('roomImages', files[0]);
  };

  return (
    <>
      <input type="file" onChange={handleOnChange} />
      <input type="file" onChange={handleOnChange} />
      <input type="file" onChange={handleOnChange} />
      <input type="file" onChange={handleOnChange} />
      <input type="file" onChange={handleOnChange} />
      <input type="file" onChange={handleOnChangeR} />
      <input type="file" onChange={handleOnChangeR} />
      <input type="file" onChange={handleOnChangeR} />
      <input type="file" onChange={handleOnChangeR} />
      <input type="file" onChange={handleOnChangeR} />
      <input type="file" onChange={handleOnChangeR} />
      <input type="file" onChange={handleOnChangeR} />
      <input type="file" onChange={handleOnChangeR} />
      <input type="file" onChange={handleOnChangeR} />
      <input type="file" onChange={handleOnChangeR} />
      <button onClick={handleOnSubmit}>요청</button>
    </>
  );
}
