import { FC } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom'
import Home from '../pages/Home'
import Navbar from '../components/Navbar'

const AppRoutes: FC = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='*' element={<Navigate to='/' />} />
    </Routes>
  )
}

const AppRouter: FC = () => {
  return (
    <Router>
      <Navbar />
      <AppRoutes />
    </Router>
  )
}

export default AppRouter
