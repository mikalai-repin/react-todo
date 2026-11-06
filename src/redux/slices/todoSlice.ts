import { createSlice } from '@reduxjs/toolkit'
import type { TodosState } from '../../types'
import { fetchTodos } from '../services/todos'

const initialState: TodosState = {
  todos: [],
}

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.todos.push(action.payload)
    },
    removeTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload)
    },
    toggleTodo: (state, action) => {
      const todo = state.todos.find((todo) => todo.id === action.payload)
      if (todo) {
        todo.completed = !todo.completed
      }
    },
    updateTodo: (state, action) => {
      const todo = state.todos.find((todo) => todo.id === action.payload.id)
      if (todo) {
        todo.title = action.payload.text
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.todos = action.payload.data
        state.loading = false
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.error = action.payload
        state.loading = false
      })
  },
})

export const { addTodo, removeTodo, toggleTodo, updateTodo } = todoSlice.actions
export default todoSlice.reducer
