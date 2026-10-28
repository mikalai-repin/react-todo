import * as yup from 'yup'
import type { CreateTodoDto, UpdateTodoDto } from '../types'

export const createTodoSchema: yup.ObjectSchema<CreateTodoDto> = yup.object({
  title: yup.string().trim().required().max(200),
})

export const updateTodoSchema: yup.ObjectSchema<UpdateTodoDto> =
  createTodoSchema.shape({
    completed: yup.boolean(),
  })
