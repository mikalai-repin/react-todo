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
  showFieldError?: boolean
} & Omit<TextFieldProps, 'name'>

const FormTextField = <T extends FieldValues>({
  control,
  name,
  showFieldError = true,
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
          {...(showFieldError && {
            error: !!fieldState.error,
            helperText: fieldState.error?.message,
          })}
        />
      )}
    />
  )
}

export default FormTextField
