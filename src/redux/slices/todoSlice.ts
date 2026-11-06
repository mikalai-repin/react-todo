import { createSlice } from '@reduxjs/toolkit'
import type { TodosState } from '../../types'

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
})

export const { addTodo, removeTodo, toggleTodo, updateTodo } = todoSlice.actions
export default todoSlice.reducer
