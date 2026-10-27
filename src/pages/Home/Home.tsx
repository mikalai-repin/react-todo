import List from '@mui/material/List'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import { TodoFooter, TodoItem } from './components'
import styles from './Home.module.css'
import { useTodosList } from '../../api'
import { TodoForm } from '../../components'

const editingId = 3

const Home: React.FC = () => {
  const { data } = useTodosList()

  return (
    <div className={styles.wrapper}>
      <Paper className={styles.card}>
        <Typography variant="h4" component="h1">
          Задачи
        </Typography>

        <TodoForm position="top" />

        {data && data.data?.length > 0 ? (
          <List disablePadding>
            {data.data.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                isEditing={todo.id === editingId}
              />
            ))}
          </List>
        ) : (
          <Typography className={styles.empty}>Задач пока нет</Typography>
        )}

        {/* <TodoFooter activeCount={activeCount} filter="all" /> */}
      </Paper>
    </div>
  )
}

export default Home
