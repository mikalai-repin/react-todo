import { List, ListItem, Skeleton, Typography } from '@mui/material'
import type { Todo } from '../../types'
import TodoItem from '../TodoItem'

type Props = {
  todos: Todo[]
  isLoading?: boolean
}

const TodoList: React.FC<Props> = ({ todos = [], isLoading = false }) => {
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
    <>
      {todos.length > 0 ? (
        <List disablePadding>
          {todos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </List>
      ) : (
        <Typography className="empty">Задач пока нет</Typography>
      )}
    </>
  )
}

export default TodoList
