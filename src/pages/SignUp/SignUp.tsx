import Button from '@mui/material/Button'
import { Alert, Typography } from '@mui/material'
import { useForm, type SubmitHandler } from 'react-hook-form'
import type { SignUpData } from '../../types'
import { signUpSchema } from '../../schemas'
import { yupResolver } from '@hookform/resolvers/yup'
import { useSignUp } from '../../api'
import { FormTextField, AuthCard } from '../../components'
import { Link } from 'react-router'

const SignUp: React.FC = () => {
  const { mutate, isPending, isError, error } = useSignUp()

  const { control, handleSubmit } = useForm<SignUpData>({
    mode: 'onChange',
    delayError: 500,
    defaultValues: {
      email: '',
      password: '',
      name: '',
    },
    resolver: yupResolver(signUpSchema),
  })

  const onSubmit: SubmitHandler<SignUpData> = (data) => {
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
        <FormTextField control={control} name="name" label="Name" type="text" />
        <Button
          type="submit"
          variant="contained"
          fullWidth
          disabled={isPending}
        >
          Sign up
        </Button>
      </form>

      <Typography variant="body2" align="center" sx={{ mt: 2 }}>
        Уже есть аккаунт? <Link to="/login">Войти</Link>
      </Typography>
    </AuthCard>
  )
}

export default SignUp
