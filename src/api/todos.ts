import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import { api } from './api'
import type {
  CreateTodoDto,
  Todo,
  TodoFilter,
  TodoResponse,
  UpdateTodoDto,
} from '../types'

const TODOS_QUERY_KEY = 'todos'

const getFilterParams = (
  filter: TodoFilter
): Partial<Pick<Todo, 'completed'>> => {
  if (filter === 'all') return {}

  return { completed: filter === 'completed' }
}

export const getTodoList = async (filter: TodoFilter = 'all') => {
  const params = getFilterParams(filter)

  const { data } = await api.get<TodoResponse>('/api/todos', {
    params: { ...params, limit: 100 },
  })
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

export const useTodosList = (filter: TodoFilter = 'all') => {
  return useQuery({
    queryKey: [TODOS_QUERY_KEY, filter],
    queryFn: () => getTodoList(filter),
    placeholderData: keepPreviousData,
  })
}

export const useCreateTodo = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createTodo,
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: [TODOS_QUERY_KEY] })
    },
  })
}

export const useEditTodo = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: editTodo,
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: [TODOS_QUERY_KEY] })
    },
  })
}

export const useDeleteTodo = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: [TODOS_QUERY_KEY] })
    },
  })
}

export const useActiveCount = () =>
  useQuery({
    queryKey: [TODOS_QUERY_KEY, 'active-count'],
    queryFn: () =>
      api.get<TodoResponse>('/api/todos', {
        params: { completed: false, limit: 1 },
      }),
    select: ({ data }) => data.meta.total,
  })
