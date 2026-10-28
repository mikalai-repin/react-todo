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

      const isAuthRequest = error.config?.url?.startsWith('/api/auth')

      if (error.response.status === 401 && !isAuthRequest) {
        localStorage.removeItem('token')
        window.location.replace(`${import.meta.env.BASE_URL}login`)
      }

      const { message } = error.response.data
      const text = Array.isArray(message) ? message.join(', ') : message

      return Promise.reject(new Error(text || 'Что-то пошло не так'))
    }
    return Promise.reject(error)
  }
)
