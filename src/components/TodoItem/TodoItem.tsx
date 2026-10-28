import type { Todo } from '../../types'
import { memo, useState } from 'react'
import { EditedItem, ViewItem } from './components'

type Props = {
  todo: Todo
}

const TodoItem: React.FC<Props> = ({ todo }) => {
  const [isEditing, setIsEditing] = useState(false)

  if (isEditing) {
    return <EditedItem todo={todo} clickAction={() => setIsEditing(false)} />
  }

  return <ViewItem todo={todo} clickAction={() => setIsEditing(true)} />
}

export default memo(TodoItem)
