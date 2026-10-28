import Button from '@mui/material/Button'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import Skeleton from '@mui/material/Skeleton'
import Typography from '@mui/material/Typography'
import type { TodoFilter } from '../../types'

type Props = {
  activeCount: number
  isLoading?: boolean
  filter: TodoFilter
  updateFilter: (value: TodoFilter) => void
}

const TodoFooter: React.FC<Props> = ({
  activeCount,
  isLoading = false,
  filter,
  updateFilter,
}) => {
  const handleChange = (_: React.MouseEvent, value: TodoFilter | null) => {
    if (value) updateFilter(value)
  }

  return (
    <div className="footer">
      <Typography variant="body2">
        Осталось задач:{' '}
        {isLoading ? (
          <Skeleton
            variant="text"
            width={16}
            sx={{ display: 'inline-block', verticalAlign: 'middle' }}
          />
        ) : (
          activeCount
        )}
      </Typography>

      <ToggleButtonGroup
        value={filter}
        exclusive
        size="small"
        onChange={handleChange}
      >
        <ToggleButton value="all">Все</ToggleButton>
        <ToggleButton value="active">Активные</ToggleButton>
        <ToggleButton value="completed">Завершённые</ToggleButton>
      </ToggleButtonGroup>
    </div>
  )
}

export default TodoFooter
