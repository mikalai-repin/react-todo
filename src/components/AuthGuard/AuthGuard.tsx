import { Outlet, Navigate } from 'react-router'

type Props = {
  mode: 'private' | 'public'
}

const AuthGuard: React.FC<Props> = ({ mode = 'private' }) => {
  const isAuth = !!localStorage.getItem('token')

  if (mode === 'private' && !isAuth) {
    return <Navigate to="/login" replace />
  }

  if (mode === 'public' && isAuth) {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}

export default AuthGuard
