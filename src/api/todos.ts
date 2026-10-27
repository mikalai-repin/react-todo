import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from './api'
import type { CreateTodoDto, Todo, TodoResponse } from '../types'

export const getTodoList = async () => {
  const { data } = await api.get<TodoResponse>('/api/todos')
  return data
}

export const createTodo = async (todo: CreateTodoDto) => {
  const { data } = await api.post<Todo>('/api/todos', todo)
  return data
}

export const useTodosList = () => {
  return useQuery({
    queryKey: ['todos'],
    queryFn: getTodoList,
  })
}

export const useCreateTodo = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createTodo,
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
  })
}
