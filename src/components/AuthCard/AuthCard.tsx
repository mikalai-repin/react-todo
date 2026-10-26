import { Box, Card, CardContent, Typography } from '@mui/material'
import styles from './AuthCard.module.css'

type Props = {
  title: string
  children: React.ReactNode
}

const AuthCard: React.FC<Props> = ({ title, children }) => {
  return (
    <Box className={styles.wrapper}>
      <Card className={styles.card}>
        <CardContent className={styles.content}>
          <Typography variant="h5" component="h1">
            {title}
          </Typography>
          {children}
        </CardContent>
      </Card>
    </Box>
  )
}

export default AuthCard
