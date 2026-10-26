import * as yup from 'yup'
import type { LoginData, SignUpData } from '../types'

export const authSchema: yup.ObjectSchema<LoginData> = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
})

export const signUpSchema: yup.ObjectSchema<SignUpData> = authSchema.shape({
  name: yup.string().required(),
})
