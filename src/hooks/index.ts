import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from '../redux/configureStore'

export const useAppDispatch = () => useDispatch<AppDispatch>() // eslint-disable-line
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
