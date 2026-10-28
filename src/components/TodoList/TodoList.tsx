import {
  LinearProgress,
  List,
  ListItem,
  Skeleton,
  Typography,
} from '@mui/material'
import type { Todo } from '../../types'
import TodoItem from '../TodoItem'
import styles from './TodoList.module.css'

type Props = {
  todos: Todo[]
  isLoading: boolean
  isPlaceholderData: boolean
}

const TodoList: React.FC<Props> = ({
  todos = [],
  isLoading = false,
  isPlaceholderData = false,
}) => {
  if (isLoading) {
    return (
      <List>
        {Array.from({ length: 3 }, (_, i) => (
          <ListItem key={i} divider>
            <Skeleton variant="rounded" width={20} height={20} />
            <Skeleton sx={{ flexGrow: 1, ml: 2 }} />
          </ListItem>
        ))}
      </List>
    )
  }

  return (
    <div
      className={
        isPlaceholderData ? `${styles.wrapper} ${styles.stale}` : styles.wrapper
      }
    >
      {isPlaceholderData && <LinearProgress className={styles.progress} />}

      {todos.length > 0 ? (
        <List disablePadding>
          {todos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </List>
      ) : (
        <Typography className="empty">Задач пока нет</Typography>
      )}
    </div>
  )
}

export default TodoList
