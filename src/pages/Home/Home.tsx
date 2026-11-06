import { Typography, Paper, Alert, Button } from '@mui/material'
import { useActiveCount, useLogout, useTodosList } from '../../api'
import { TodoForm, TodoList, TodoFooter } from '../../components'
import { useEffect, useState } from 'react'
import type { TodoFilter } from '../../types'
import styles from './Home.module.css'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { fetchTodos } from '../../redux/services/todos'

const Home: React.FC = () => {
  const [filter, setFilter] = useState<TodoFilter>('all')
  // const { data, isLoading, isError, error, isPlaceholderData } =
  //   useTodosList(filter)

  const { todos, loading, error } = useAppSelector((store) => store.todos)
  const dispatch = useAppDispatch()

  useEffect(() => {
    const dispatchPromise = dispatch(fetchTodos(filter))
    return () => dispatchPromise.abort()
  }, [filter, dispatch])

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
        {!!error && <Alert severity="error">{error}</Alert>}
        <TodoList
          todos={todos ?? []}
          isLoading={loading}
          isPlaceholderData={false}
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
