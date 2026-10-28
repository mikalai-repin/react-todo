import {
  Button,
  Checkbox,
  IconButton,
  LinearProgress,
  ListItem,
  ListItemText,
} from '@mui/material'
import type { Todo } from '../../../../types'
import { useDeleteTodo, useToggleCheckbox } from '../../../../api'
import { useState } from 'react'
import ConfirmDialog from '../../../ConfirmDialog'
import styles from './ViewItem.module.css'

type Props = {
  todo: Todo
  clickAction: () => void
}

const ViewItem: React.FC<Props> = ({ todo, clickAction }) => {
  const toggle = useToggleCheckbox()
  const deleteTodo = useDeleteTodo()
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)

  const loading = toggle.isPending || deleteTodo.isPending

  const handleToggle = () => {
    toggle.mutate(todo.id)
  }

  const openConfirm = () => {
    deleteTodo.reset()
    setIsConfirmOpen(true)
  }

  const deleteItem = () => {
    deleteTodo.mutate(todo.id, { onSuccess: () => setIsConfirmOpen(false) })
  }

  return (
    <ListItem
      divider
      className={loading ? `${styles.item} ${styles.loading}` : styles.item}
      secondaryAction={
        <IconButton
          edge="end"
          aria-label="Удалить задачу"
          onClick={openConfirm}
        >
          ×
        </IconButton>
      }
    >
      <Checkbox
        checked={todo.completed}
        disabled={loading}
        onChange={handleToggle}
        edge="start"
      />

      <ListItemText
        className={styles.title}
        primary={todo.title}
        secondary={toggle.error?.message}
        slotProps={{
          primary: { className: todo.completed ? 'completed' : undefined },
          secondary: { color: 'error' },
        }}
      />

      <Button size="small" className="editButton" onClick={clickAction}>
        Изменить
      </Button>

      {loading && <LinearProgress className={styles.progress} />}

      <ConfirmDialog
        open={isConfirmOpen}
        title="Удалить задачу?"
        text={`«${todo.title}» будет удалена без возможности восстановления.`}
        loading={deleteTodo.isPending}
        error={deleteTodo.error}
        onConfirm={deleteItem}
        onClose={() => setIsConfirmOpen(false)}
      />
    </ListItem>
  )
}

export default ViewItem
