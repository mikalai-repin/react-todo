import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from './api'
import type { CreateTodoDto, Todo, TodoResponse, UpdateTodoDto } from '../types'

export const getTodoList = async () => {
  const { data } = await api.get<TodoResponse>('/api/todos')
  return data
}

export const createTodo = async (todo: CreateTodoDto) => {
  const { data } = await api.post<Todo>('/api/todos', todo)
  return data
}

export const editTodo = async ({
  id,
  ...todo
}: UpdateTodoDto & Pick<Todo, 'id'>) => {
  const { data } = await api.patch<Todo>(`/api/todos/${id}`, todo)
  return data
}

export const deleteTodo = async (id: number) => {
  const { data } = await api.delete<Todo>(`/api/todos/${id}`)
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

export const useEditTodo = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: editTodo,
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
  })
}

export const useDeleteTodo = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
  })
}
