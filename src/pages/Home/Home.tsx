import { Typography, Paper, Alert } from '@mui/material'
import { useTodosList } from '../../api'
import { TodoForm, TodoList, TodoFooter } from '../../components'
import { useState } from 'react'
import type { TodoFilter } from '../../types'
import styles from './Home.module.css'

const Home: React.FC = () => {
  const [filter, setFilter] = useState<TodoFilter>('all')
  const { data, isLoading, isError, error, isPlaceholderData } =
    useTodosList(filter)

  const activeCount = data?.meta?.total ?? 0

  return (
    <div className={styles.wrapper}>
      <Paper className={styles.card}>
        <Typography variant="h4" component="h1">
          Задачи
        </Typography>

        <TodoForm />
        {isError && <Alert severity="error">{error.message}</Alert>}
        <TodoList
          todos={data?.data ?? []}
          isLoading={isLoading}
          isPlaceholderData={isPlaceholderData}
        />

        <TodoFooter
          activeCount={activeCount}
          isLoading={isLoading}
          filter={filter}
          updateFilter={setFilter}
        />
      </Paper>
    </div>
  )
}

export default Home
