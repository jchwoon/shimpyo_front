import axios, { AxiosResponse, Method } from 'axios';
import { useState } from 'react';

const API_URL = process.env.REACT_APP_API_URL;

interface IresponseData<T> {
  isSuccess: boolean;
  code: number;
  message: string;
  result: T;
}

interface useHttpRequestProps {
  url: string;
  body?: any;
  method?: Method;
  withCredentials?: boolean;
}

//이 훅에서 권한이 필요한 요청과 권한이 필요없는 요청 에 대한 구분을 할 수있는 옵션을 제공
//
export default function useHttpRequest<T>() {
  const [isLoading, setIsLoading] = useState(false);
  const [responseData, setResponseData] = useState<IresponseData<T> | null>(null);
  const [error, setError] = useState<boolean>(false);

  const sendRequest = async ({ url, method = 'GET', body }: useHttpRequestProps) => {
    setIsLoading(true);
    setResponseData(null);
    setError(false);

    try {
      const response: AxiosResponse = await axios({
        url: `${API_URL}${url}`,
        method,
        data: body,
      });
      setResponseData(response.data);
    } catch (error: any) {
      setError(true);
      console.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, responseData, error, sendRequest };
}
