import type { Todo } from '../../types'
import { useState } from 'react'
import { EditedItem, ViewItem } from './components'

type Props = {
  todo: Todo
}

const TodoItem: React.FC<Props> = ({ todo }) => {
  const [isEditing, setIsEditing] = useState(false)

  const handleClick = (value: boolean) => () => {
    setIsEditing(value)
  }

  if (isEditing) {
    return <EditedItem todo={todo} clickAction={handleClick(false)} />
  }

  return <ViewItem todo={todo} clickAction={handleClick(true)} />
}

export default TodoItem
