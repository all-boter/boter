import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from 'axios'

const baseURL = ''

const instance = axios.create({
  baseURL,
})

instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig<AxiosRequestConfig>) => {
    return config
  },
  (error: AxiosError) => {
    console.error('interceptors.request error:', error)
    return Promise.reject(error)
  },
)

instance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  },
)

export function fetchWithAuth<T extends Promise<any>>(
  url: string,
  options = {},
  method = 'POST',
): Promise<T> {
  try {
    const config: AxiosRequestConfig = {
      method,
      ...options,
    }
    return instance(url, config) as Promise<T>
  } catch (error: any | { response?: AxiosResponse<T> }) {
    console.log('fetchWithAuth error', error)
    return error?.response as T
  }
}