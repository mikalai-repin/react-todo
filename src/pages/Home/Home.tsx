import { Typography, Paper, Alert } from '@mui/material'
import { useTodosList } from '../../api'
import { TodoForm, TodoList, TodoFooter } from '../../components'
import styles from './Home.module.css'

const Home: React.FC = () => {
  const { data, isLoading, isError, error } = useTodosList()

  return (
    <div className={styles.wrapper}>
      <Paper className={styles.card}>
        <Typography variant="h4" component="h1">
          Задачи
        </Typography>

        <TodoForm position="top" />
        {isError && <Alert severity="error">{error.message}</Alert>}
        <TodoList todos={data?.data ?? []} isLoading={isLoading} />

        <TodoFooter activeCount={10} filter="all" />
      </Paper>
    </div>
  )
}

export default Home
