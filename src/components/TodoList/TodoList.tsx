import { List, Typography } from '@mui/material'
import type { Todo } from '../../types'
import TodoItem from '../TodoItem'

type Props = {
  todos: Todo[]
}

const TodoList: React.FC<Props> = ({ todos = [] }) => {
  return (
    <>
      {todos.length > 0 ? (
        <List disablePadding>
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              //   isEditing={todo.id === editingId}
            />
          ))}
        </List>
      ) : (
        <Typography className="empty">Задач пока нет</Typography>
      )}
    </>
  )
}

export default TodoList
