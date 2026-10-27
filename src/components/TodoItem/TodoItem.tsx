import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import IconButton from '@mui/material/IconButton'
import ListItem from '@mui/material/ListItem'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import type { Todo } from '../../types'

type Props = {
  todo: Todo
  isEditing?: boolean
}

const TodoItem: React.FC<Props> = ({ todo, isEditing = false }) => {
  if (isEditing) {
    return (
      <ListItem divider>
        <form className="editForm" noValidate>
          <TextField
            defaultValue={todo.title}
            size="small"
            fullWidth
            autoFocus
          />
          <Button type="submit" variant="contained" size="small">
            Сохранить
          </Button>
        </form>
      </ListItem>
    )
  }

  return (
    <ListItem
      divider
      secondaryAction={
        <IconButton edge="end" aria-label="Удалить задачу">
          ×
        </IconButton>
      }
    >
      <Checkbox checked={todo.completed} edge="start" />
      <Typography
        className={todo.completed ? 'completed' : undefined}
        sx={{ flexGrow: 1 }}
      >
        {todo.title}
      </Typography>
      <Button size="small" className="editButton">
        Изменить
      </Button>
    </ListItem>
  )
}

export default TodoItem
