import { useForm } from 'react-hook-form'
import { useCreateTodo } from '../../api'
import type { CreateTodoDto } from '../../types'
import { yupResolver } from '@hookform/resolvers/yup'
import { createTodoSchema } from '../../schemas'
import { Alert, Button } from '@mui/material'
import FormTextField from '../FormTextField'

const TodoForm: React.FC = () => {
  const { mutate, isPending, error, isError } = useCreateTodo()

  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm<CreateTodoDto>({
    mode: 'onChange',
    delayError: 500,
    defaultValues: {
      title: '',
    },
    resolver: yupResolver(createTodoSchema),
  })

  const onSubmit = (data: CreateTodoDto) => {
    mutate(data, { onSuccess: () => reset() })
  }

  return (
    <form className="form" noValidate onSubmit={handleSubmit(onSubmit)}>
      {isError && <Alert severity="error">{error.message}</Alert>}

      <div className="formRow">
        <FormTextField
          name="title"
          control={control}
          placeholder="Что нужно сделать?"
          size="small"
          fullWidth
          showFieldError={false}
          disabled={isPending}
        />
        <Button
          type="submit"
          variant="contained"
          className="addButton"
          disabled={isPending || !isValid}
          loading={isPending}
        >
          Добавить
        </Button>
      </div>
    </form>
  )
}

export default TodoForm
