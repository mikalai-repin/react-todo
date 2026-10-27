import { useForm } from 'react-hook-form'
import { useCreateTodo } from '../../api'
import type { CreateTodoDto } from '../../types'
import { yupResolver } from '@hookform/resolvers/yup'
import { todoSchema } from '../../schemas'
import { Alert, Button, ToggleButton, ToggleButtonGroup } from '@mui/material'
import FormTextField from '../FormTextField'

type Props = {
  position: InsertPosition
}

const TodoForm: React.FC<Props> = ({ position }) => {
  const { mutate, isPending, error, isError } = useCreateTodo()

  const { control, handleSubmit } = useForm<CreateTodoDto>({
    mode: 'onChange',
    delayError: 500,
    defaultValues: {
      title: '',
      description: '',
    },
    resolver: yupResolver(todoSchema),
  })

  const onSubmit = (data: CreateTodoDto) => {
    if (!data.description) {
      delete data.description
    }

    mutate(data)
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
        />
        <Button
          type="submit"
          variant="contained"
          className="addButton"
          disabled={isPending}
        >
          Добавить
        </Button>
      </div>

      <ToggleButtonGroup value={position} exclusive size="small">
        <ToggleButton value="top">Добавлять сверху</ToggleButton>
        <ToggleButton value="bottom">Добавлять снизу</ToggleButton>
      </ToggleButtonGroup>
    </form>
  )
}

export default TodoForm
