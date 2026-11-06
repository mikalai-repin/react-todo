import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

export const TOKEN_KEY = 'token'

type AuthState = { token: string | null }

const initialState: AuthState = {
  token: localStorage.getItem(TOKEN_KEY),
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload
    },
    logout: (state) => {
      state.token = null
    },
  },
})

export const selectIsAuth = (state: RootState) => !!state.auth.token

export const { setToken, logout } = authSlice.actions
export default authSlice.reducer
