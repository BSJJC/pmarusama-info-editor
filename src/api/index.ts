/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosResponse } from 'axios';

type TRequestConfig = {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  data?: any;
};

async function makeRequest(config: TRequestConfig): Promise<any> {
  try {
    const response: AxiosResponse = await axios({
      method: config.method,
      url: config.url,
      data: config.data,
    });

    return response.data;
  } catch (error) {
    console.error('Error making request:', error);
    throw error;
  }
}

const API = {
  getAllShops: async function () {
    const config: TRequestConfig = {
      url: 'http://localhost:5000/api/informationShopImage/all',
      method: 'GET',
    };

    return makeRequest(config);
  },

  uploadShopImage: async function (formData: any) {
    const config: TRequestConfig = {
      url: 'http://localhost:5000/api/informationShopImage/create',
      method: 'POST',
      data: formData,
    };

    return makeRequest(config);
  },

  deleteShopImage: async function (url: string) {
    const config: TRequestConfig = {
      url,
      method: 'DELETE',
    };

    return makeRequest(config);
  },

  submitForm: async function (
    date: number,
    title: string,
    informationType: 'form' | 'url',
    data: unknown,
  ) {
    const config: TRequestConfig = {
      url: 'http://localhost:5000/create',
      method: 'DELETE',
      data: {
        date,
        title,
        informationType,
        data,
      },
    };

    return makeRequest(config);
  },
};

export default API;
