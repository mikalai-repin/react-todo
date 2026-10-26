import axios from 'axios'
import type {
  LoginData,
  AuthResponse,
  SignUpData,
  ApiErrorResponse,
} from '../types'

export const api = axios.create({
  baseURL: import.meta.env.BASE_URL,
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

export const auth = async (loginData: LoginData): Promise<AuthResponse> => {
  const { data } = await api.post<AuthResponse>('/api/auth/login', loginData)

  return data
}

export const signUp = async (signUpData: SignUpData) => {
  const { data } = await api.post<AuthResponse>(
    '/api/auth/register',
    signUpData
  )

  return data
}
