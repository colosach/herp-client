import axios from 'axios'
import type { AxiosInstance } from 'axios'

const BASE_URL: string = import.meta.env.VITE_ERP_SERVER_BASE_URL

// Create axios instance
export const axiosIntance: AxiosInstance = axios.create({
  baseURL: BASE_URL,  
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const axiosApiClient = {
  // GET request
  get: <T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    return axiosIntance.get<T>(url, config)
  },

  // POST request
  post: <T = any, D = any>(url: string, data?: D, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    return axiosIntance.post<T>(url, data, config)
  },

  // PUT request
  put: <T = any, D = any>(url: string, data?: D, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    return axiosIntance.put<T>(url, data, config)
  },

  // PATCH request
  patch: <T = any, D = any>(url: string, data?: D, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    return axiosIntance.patch<T>(url, data, config)
  },

  // DELETE request
  delete: <T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    return axiosIntance.delete<T>(url, config)
  },
}



