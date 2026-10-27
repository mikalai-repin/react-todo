import { Button, ListItem } from '@mui/material'
import type { Todo, UpdateTodoDto } from '../../../../types'
import { useEditTodo } from '../../../../api'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { updateTodoSchema } from '../../../../schemas'
import FormTextField from '../../../FormTextField'

type EditItemProps = {
  todo: Todo
  clickAction: () => void
}

const EditedItem: React.FC<EditItemProps> = ({ todo, clickAction }) => {
  const { mutate, isPending } = useEditTodo()

  const {
    control,
    handleSubmit,
    setError,
    formState: { isDirty },
  } = useForm<Partial<UpdateTodoDto>>({
    mode: 'onChange',
    delayError: 500,
    defaultValues: {
      title: todo.title,
    },
    resolver: yupResolver(updateTodoSchema),
  })

  const onSubmit = (value: UpdateTodoDto) => {
    if (isDirty) return clickAction()

    mutate(
      { ...value, id: todo.id },
      {
        onSuccess: () => clickAction(),
        onError: (error) => setError('title', { message: error.message }),
      }
    )
  }

  return (
    <ListItem divider>
      <form className="editForm" noValidate onSubmit={handleSubmit(onSubmit)}>
        <FormTextField
          name="title"
          control={control}
          size="small"
          fullWidth
          autoFocus
          disabled={isPending}
        />
        <Button
          type="submit"
          variant="contained"
          size="small"
          disabled={isPending}
          loading={isPending}
        >
          Сохранить
        </Button>
        <Button size="small" onClick={clickAction} disabled={isPending}>
          Отмена
        </Button>
      </form>
    </ListItem>
  )
}

export default EditedItem
