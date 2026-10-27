import * as yup from 'yup'
import type { CreateTodoDto } from '../types'

export const todoSchema: yup.ObjectSchema<CreateTodoDto> = yup.object({
  title: yup.string().trim().required().max(200),
  description: yup.string().optional().trim(),
})
