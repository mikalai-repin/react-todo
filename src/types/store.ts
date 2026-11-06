import type { Todo } from './todo'

export type TodosState = { todos: Todo[]; loading?: boolean; error?: string }
