import { useSelector, useDispatch } from 'react-redux'
import { createAsyncThunk } from '@reduxjs/toolkit'
import type { AppDispatch, RootState } from './store'

export const useAppSelector = useSelector.withTypes<RootState>()
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: RootState
  dispatch: AppDispatch
  rejectValue: string
}>()
