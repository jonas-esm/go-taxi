import React from 'react'

import TextField, { type StandardTextFieldProps } from '@mui/material/TextField'
import { Controller } from 'react-hook-form'
import type { Control } from 'react-hook-form'
import { InputAdornment, lighten, useTheme } from '@mui/material'
import { Icon } from '@iconify-icon/react/dist/iconify.mjs'

interface CustomTextFieldProps extends StandardTextFieldProps {
  name: string
  control: Control<any, any>
  iconName?: string
}

const CustomTextField: React.FC<CustomTextFieldProps> = ({
  name,
  control,

  iconName,
  ...rest
}) => {
  const { palette } = useTheme()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value, ref, ...field }, fieldState: { error } }) => (
        <TextField
          {...rest}
          value={value}
          onChange={onChange}
          fullWidth
          size='medium'
          inputRef={ref} // Assign the ref to the Autocomplete component
          {...field}
          error={!!error}
          helperText={error?.message}
          variant='standard'
          slotProps={{
            input: {
              startAdornment: iconName ? (
                <InputAdornment
                  position='start'
                  style={{
                    color: lighten(palette.text.primary, 0.6)
                  }}
                >
                  <Icon icon={iconName} width={24} />
                </InputAdornment>
              ) : undefined,

              sx: {
                height: 66
              }
            }
          }}
        />
      )}
    />
  )
}

export default CustomTextField
