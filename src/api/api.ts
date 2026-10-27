import axios from 'axios'
import type { ApiErrorResponse } from '../types'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError<ApiErrorResponse>(error)) {
      if (!error.response) {
        return Promise.reject(new Error('Нет соединения с сервером'))
      }
      const { message } = error.response.data
      const text = Array.isArray(message) ? message.join(', ') : message

      return Promise.reject(new Error(text || 'Something went wrong'))
    }
    return Promise.reject(error)
  }
)
