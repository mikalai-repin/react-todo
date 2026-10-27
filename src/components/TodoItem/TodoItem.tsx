import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import IconButton from '@mui/material/IconButton'
import ListItem from '@mui/material/ListItem'
import Typography from '@mui/material/Typography'
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
