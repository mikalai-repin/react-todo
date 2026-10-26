import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router'
import { auth, signUp } from './api'

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
