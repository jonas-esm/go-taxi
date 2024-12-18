import React from 'react'

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { type DatePickerProps } from '@mui/x-date-pickers/DatePicker'
import { type Control, Controller } from 'react-hook-form'
import { InputAdornment, lighten, TextField, useTheme } from '@mui/material'
import { Icon } from '@iconify-icon/react/dist/iconify.mjs'
import { MobileTimePicker } from '@mui/x-date-pickers'

interface CustomTimePickerProps extends DatePickerProps<Date, boolean> {
  name: string
  control: Control<any, any>
  helperText?: string
}

const CustomTimePicker: React.FC<CustomTimePickerProps> = ({
  name,
  control,
  helperText

  // ...rest
}) => {
  const { palette } = useTheme()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, ref, ...rest }, fieldState: { error } }) => (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <MobileTimePicker
            {...rest}
            onChange={onChange}
            slots={{
              textField: params => (
                <TextField
                  {...params}
                  error={!!error}
                  helperText={error?.message}
                  variant='standard'
                  slotProps={{
                    input: {
                      ...params.InputProps,
                      startAdornment: (
                        <InputAdornment
                          position='start'
                          style={{
                            marginTop: -4,
                            color: lighten(palette.text.primary, 0.6)
                          }}
                        >
                          <Icon icon={'solar:clock-circle-linear'} width={24} />
                        </InputAdornment>
                      ),
                      sx: {
                        height: 66
                      }
                    }
                  }}
                />
              )
            }}
            slotProps={{
              textField: {
                variant: 'standard',
                error: !!error,
                helperText: error?.message || helperText
              }
            }}
          />
        </LocalizationProvider>
      )}
    />
  )
}

export default CustomTimePicker
