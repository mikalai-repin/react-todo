import { Typography, Paper, Alert, Button } from '@mui/material'
import { useActiveCount, useLogout, useTodosList } from '../../api'
import { TodoForm, TodoList, TodoFooter } from '../../components'
import { useState } from 'react'
import type { TodoFilter } from '../../types'
import styles from './Home.module.css'

const Home: React.FC = () => {
  const [filter, setFilter] = useState<TodoFilter>('all')
  const { data, isLoading, isError, error, isPlaceholderData } =
    useTodosList(filter)

  const { data: activeCount, isLoading: isActiveCountLoading } =
    useActiveCount()

  const logout = useLogout()

  return (
    <div className={styles.wrapper}>
      <Paper className={styles.card}>
        <div className={styles.header}>
          <Typography variant="h4" component="h1">
            Задачи
          </Typography>
          <Button size="small" onClick={logout}>
            Выйти
          </Button>
        </div>

        <TodoForm />
        {isError && <Alert severity="error">{error.message}</Alert>}
        <TodoList
          todos={data?.data ?? []}
          isLoading={isLoading}
          isPlaceholderData={isPlaceholderData}
        />

        <TodoFooter
          activeCount={activeCount ?? 0}
          isLoading={isActiveCountLoading}
          filter={filter}
          updateFilter={setFilter}
        />
      </Paper>
    </div>
  )
}

export default Home
