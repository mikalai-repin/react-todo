import { getTodoList } from '../../api'
import type { TodoFilter } from '../../types'
import { createAppAsyncThunk } from '../hooks'

export const fetchTodos = createAppAsyncThunk(
  'todos/fetchTodos',
  async (filter: TodoFilter, thunkAPI) => {
    try {
      return await getTodoList(filter)
    } catch (e) {
      return thunkAPI.rejectWithValue((e as Error).message)
    }
  }
)
