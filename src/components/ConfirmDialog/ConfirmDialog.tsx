import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material'

type Props = {
  open: boolean
  title: string
  text?: React.ReactNode
  confirmText?: string
  loading?: boolean
  error?: Error | null
  onConfirm: () => void
  onClose: () => void
}

const ConfirmDialog: React.FC<Props> = ({
  open,
  title,
  text,
  confirmText = 'Удалить',
  loading = false,
  error,
  onConfirm,
  onClose,
}) => {
  return (
    <Dialog open={open} onClose={loading ? undefined : onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        {error && <Alert severity="error">{error.message}</Alert>}
        {text && <DialogContentText>{text}</DialogContentText>}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>
          Отмена
        </Button>
        <Button
          color="error"
          variant="contained"
          onClick={onConfirm}
          loading={loading}
        >
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ConfirmDialog
