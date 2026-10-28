export type Todo = {
  id: number
  title: string
  description: string
  completed: boolean
  createdAt: string
  updatedAt: string
  userId: number
}

export type TodosMeta = Record<
  'total' | 'page' | 'limit' | 'totalPages',
  number
>

export type TodoResponse = {
  data: Todo[]
  meta: TodosMeta
}

export type CreateTodoDto = Pick<Todo, 'title'>

export type UpdateTodoDto = Partial<
  Pick<Todo, 'description' | 'title' | 'completed'>
>

export type TodoFilter = 'all' | 'active' | 'completed'
