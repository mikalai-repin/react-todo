import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import styles from './Home.module.css'
import { useTodosList } from '../../api'
import { TodoForm, TodoList, TodoFooter } from '../../components'

const Home: React.FC = () => {
  const { data } = useTodosList()

  return (
    <div className={styles.wrapper}>
      <Paper className={styles.card}>
        <Typography variant="h4" component="h1">
          Задачи
        </Typography>

        <TodoForm position="top" />
        <TodoList todos={data?.data ?? []} />

        <TodoFooter activeCount={10} filter="all" />
      </Paper>
    </div>
  )
}

export default Home
