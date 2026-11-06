import { Outlet, Navigate } from 'react-router'
import { useAppSelector } from '../../redux/hooks'
import { selectIsAuth } from '../../redux/slices/authSlice'

type Props = {
  mode: 'private' | 'public'
}

const AuthGuard: React.FC<Props> = ({ mode = 'private' }) => {
  const isAuth = useAppSelector(selectIsAuth)

  if (mode === 'private' && !isAuth) {
    return <Navigate to="/login" replace />
  }

  if (mode === 'public' && isAuth) {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}

export default AuthGuard
