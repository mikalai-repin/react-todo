import Button from '@mui/material/Button'
import { Alert, Typography } from '@mui/material'
import { useForm, type SubmitHandler } from 'react-hook-form'
import type { LoginData } from '../../types'
import { authSchema } from '../../schemas'
import { yupResolver } from '@hookform/resolvers/yup'
import { useLogin } from '../../api'
import { FormTextField, AuthCard } from '../../components'
import { Link } from 'react-router'

const Login: React.FC = () => {
  const { mutate, isPending, isError, error } = useLogin()

  const { control, handleSubmit } = useForm<LoginData>({
    mode: 'onChange',
    delayError: 500,
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(authSchema),
  })

  const onSubmit: SubmitHandler<LoginData> = (data) => {
    mutate(data)
  }

  return (
    <AuthCard title="Login">
      {isError && <Alert severity="error">{error.message}</Alert>}

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <FormTextField
          control={control}
          name="email"
          label="Email"
          type="email"
        />
        <FormTextField
          control={control}
          name="password"
          label="Password"
          type="password"
        />
        <Button
          type="submit"
          variant="contained"
          fullWidth
          disabled={isPending}
        >
          Sign in
        </Button>
      </form>

      <Typography variant="body2" align="center" sx={{ mt: 2 }}>
        Нет аккаунта? <Link to="/register">Зарегистрироваться</Link>
      </Typography>
    </AuthCard>
  )
}

export default Login
