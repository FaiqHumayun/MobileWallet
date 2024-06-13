import { Routes, Route } from 'react-router-dom'
import { PATH } from '../utils/constants/routes.constants'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Login from '../components/Auth/Login'
import Signup from '../components/Auth/Signup'
import Homepage from '../components/Homepage/Homepage'
import { ToastContainer } from 'react-toastify'

export default function AllRoutes() {
  const token = localStorage.getItem('token')
  const navigate = useNavigate()

  useEffect(() => {
    if (token) {
      navigate('/')
    }
  }, [token])

  return (
    <>
      <Routes>
        {token ? (
          <>
            <Route path={PATH.ROOT_PATH} element={<Homepage />} />
          </>
        ) : (
          <>
            <Route path={PATH.ROOT_PATH} element={<Login />} />
            <Route path={PATH.SIGNUP} element={<Signup />} />
          </>
        )}
      </Routes>
      <ToastContainer />
    </>
  )
}
