import { TOKEN_FIELD } from '@/common/constants';
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';

export interface ResType<T> {
  code: number;
  msg: string;
  data: T;
}

export interface ResTypeNoData {
  data(data: any): { payload: import("../store/appSlice").User; type: "appSlice/addUser"; };
  code: number;
  msg: string;
}

export interface PaginationType {
  currentPage: number;
  pageSize: number;
}

export interface PaginationResType<T> {
  total: number;
  data: T;
}

interface FetchOptions<T> extends Omit<AxiosRequestConfig, 'data'> {
  headers?: {
    // Authorization: string;
  };
  data?: T | unknown;
}

const instance = axios.create({
  baseURL: '',
})

instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig<AxiosRequestConfig>) => {
    config.headers['Content-Type'] = 'application/json';

    return config
  },
  (error: AxiosError) => {
    console.error('interceptors.request error:', error)
    return Promise.reject(error)
  },
)

instance.interceptors.response.use(
  (response: any) => {
    if (response.status === 500) {
      return {
        code: response.status,
        msg: response.statusText as string,
        data: null,
      };
    }

    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
)

export const fetchWithAuth = async <T>(
  url: string,
  options: FetchOptions<T> = {},
  method = 'POST',
): Promise<ResType<T>> => {

  try {
    const axiosConfig: AxiosRequestConfig = {
      ...options,
      method,
      headers: {
        ...options.headers,
      },
      data: method === 'POST' ? options.data : undefined,
    };

    const response: AxiosResponse = await instance(url, axiosConfig);

    return response.data;
  } catch (error: any) {
    const res = error as AxiosError;
    if (res.response?.status === 401) {
      Cookies.remove(TOKEN_FIELD);
      Cookies.remove('exp');
      // TODO: for test
      // window.location.href = '/';
      return { code: 0, msg: res.response.statusText } as ResType<T>;
    }

    return { code: -1, msg: (res?.response?.data as any)?.msg || res?.response?.statusText || 'req error', data: null } as ResType<T>;
  }
};
