import { useMutation, useQueryClient } from '@tanstack/react-query'
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

const useAuthSuccess = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  return ({ access_token }: AuthResponse) => {
    localStorage.setItem('token', access_token)
    queryClient.removeQueries()
    navigate('/')
  }
}

export const useLogin = () => {
  const onSuccess = useAuthSuccess()

  return useMutation({
    mutationFn: auth,
    onSuccess: onSuccess,
  })
}

export const useSignUp = () => {
  const onSuccess = useAuthSuccess()

  return useMutation({
    mutationFn: signUp,
    onSuccess: onSuccess,
  })
}
