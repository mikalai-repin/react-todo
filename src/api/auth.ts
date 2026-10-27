import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router'
import type { AuthResponse, LoginData, SignUpData } from '../types'
import { api } from './api'

const auth = async (loginData: LoginData): Promise<AuthResponse> => {
  const { data } = await api.post<AuthResponse>('/api/auth/login', loginData)

  return data
}

const signUp = async (signUpData: SignUpData) => {
  const { data } = await api.post<AuthResponse>(
    '/api/auth/register',
    signUpData
  )

  return data
}

export const useLogin = () => {
  const navigate = useNavigate()

  return useMutation({
    mutationFn: auth,
    onSuccess: ({ access_token }) => {
      localStorage.setItem('token', access_token)
      navigate('/')
    },
  })
}

export const useSignUp = () => {
  const navigate = useNavigate()

  return useMutation({
    mutationFn: signUp,
    onSuccess: ({ access_token }) => {
      localStorage.setItem('token', access_token)
      navigate('/')
    },
  })
}
