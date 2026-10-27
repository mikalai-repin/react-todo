import Button from '@mui/material/Button'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import Typography from '@mui/material/Typography'
import type { TodoFilter } from '../../types'

type Props = {
  activeCount: number
  filter: TodoFilter
}

const TodoFooter: React.FC<Props> = ({ activeCount, filter }) => {
  return (
    <div className="footer">
      <Typography variant="body2">Осталось задач: {activeCount}</Typography>

      <ToggleButtonGroup value={filter} exclusive size="small">
        <ToggleButton value="all">Все</ToggleButton>
        <ToggleButton value="active">Активные</ToggleButton>
        <ToggleButton value="completed">Завершённые</ToggleButton>
      </ToggleButtonGroup>

      <Button size="small" color="error">
        Очистить завершённые
      </Button>
    </div>
  )
}

export default TodoFooter
