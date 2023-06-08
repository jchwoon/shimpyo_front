import axios, { AxiosError } from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const throwErrorMessage = (axiosError: AxiosError) => {
  throw new Error(axiosError.message);
};

interface IUserData {
  email: string;
  password: string;
  nickname: string;
}

export const signUpHttp = async (userData: IUserData) => {
  try {
    const response = await axios.post(`${API_URL}/api/join`, userData);

    if (response.status === 201) {
      return response.data;
    }
  } catch (error) {
    throwErrorMessage(error as AxiosError);
  }
};

export const checkEmailHttp = async (email: string) => {
  try {
    const response = await axios.post(`${API_URL}/api/check-email?email=${email}`);

    if (response.status === 201) {
      return response.data;
    }
  } catch (error) {
    throwErrorMessage(error as AxiosError);
  }
};

export const checkNicknameHttp = async (nickname: string) => {
  try {
    const response = await axios.post(`${API_URL}/api/check-nickname?nickname=${nickname}`);

    if (response.status === 201) {
      return response.data;
    }
  } catch (error) {
    throwErrorMessage(error as AxiosError);
  }
};
