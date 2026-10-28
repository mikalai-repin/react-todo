import { Typography, Paper, Alert } from '@mui/material'
import { useTodosList } from '../../api'
import { TodoForm, TodoList, TodoFooter } from '../../components'
import styles from './Home.module.css'
import { useMemo, useState } from 'react'
import type { TodoFilter } from '../../types'

const Home: React.FC = () => {
  const [filter, setFilter] = useState<TodoFilter>('all')
  const { data, isLoading, isError, error } = useTodosList(filter)

  const updateFilter = (value: TodoFilter) => {
    setFilter(value)
  }

  const activeCount = useMemo(() => {
    const todos = data?.data || []
    return todos.filter((todo) => !todo.completed).length
  }, [data?.data])

  return (
    <div className={styles.wrapper}>
      <Paper className={styles.card}>
        <Typography variant="h4" component="h1">
          Задачи
        </Typography>

        <TodoForm />
        {isError && <Alert severity="error">{error.message}</Alert>}
        <TodoList todos={data?.data ?? []} isLoading={isLoading} />

        <TodoFooter
          activeCount={activeCount}
          isLoading={isLoading}
          filter={filter}
          updateFilter={updateFilter}
        />
      </Paper>
    </div>
  )
}

export default Home
