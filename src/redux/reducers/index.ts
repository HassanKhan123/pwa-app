import { combineReducers } from 'redux'
import user from '../slices/userSlice'

const reducers = combineReducers({
  user,
})

export default reducers
