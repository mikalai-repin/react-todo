import { TextField, type TextFieldProps } from '@mui/material'
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from 'react-hook-form'

type Props<T extends FieldValues> = {
  control: Control<T>
  name: Path<T>
} & Omit<TextFieldProps, 'name'>

const FormTextField = <T extends FieldValues>({
  control,
  name,
  ...props
}: Props<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <TextField
          {...field}
          {...props}
          error={!!fieldState.error}
          helperText={fieldState.error?.message}
        />
      )}
    />
  )
}

export default FormTextField
