import type { ReactNode } from 'react'
import { forwardRef } from 'react'

import { Icon } from '@iconify-icon/react'
import type { SelectProps } from '@mui/material'
import { Box, CircularProgress, FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material'

type SelectInputProps = SelectProps & {
  errorMessage?: string
  fontSize?: string
  loading?: boolean
  options: any[]
  getOptionLabel?: (option: any) => string | ReactNode | void
  getOptionValue?: (option: any) => string | void
  onChange?: (e: any) => void
}

// eslint-disable-next-line react/display-name
export const SelectInput = forwardRef<SelectProps, SelectInputProps>(
  (
    {
      options = [],
      errorMessage,
      getOptionLabel = option => (typeof option === 'string' ? option : option.label),
      getOptionValue = option => (typeof option === 'string' ? option : option.value),
      fullWidth,
      disabled,
      loading,
      sx,
      size = 'small',
      fontSize = '1rem',
      ...props
    },
    selectRef
  ) => {
    const getLabel = (item: any) => (typeof getOptionLabel === 'function' ? getOptionLabel(item) : item)

    const getValue = (item: any) => (typeof getOptionValue === 'function' ? getOptionValue(item) : item)

    return (
      <FormControl
        fullWidth={fullWidth}
        disabled={disabled}
        sx={sx}
        size={size}
        variant='outlined'
        error={Boolean(errorMessage)}
      >
        <InputLabel
          error={Boolean(errorMessage)}
          size={size as any}
          style={{
            fontSize
          }}
          variant='outlined'
        >
          {props?.label}
        </InputLabel>

        <Select
          {...props}
          ref={selectRef}
          IconComponent={props => (
            <Box display='flex' height={'100%'} position={'relative'}>
              {loading ? (
                <CircularProgress size={15} {...props} />
              ) : (
                <Icon icon={'ri:arrow-down-s-fill'} fontSize={18} {...props} />
              )}
            </Box>
          )}
          inputProps={{
            ...props.inputProps,
            sx: {
              ...props.inputProps?.sx,
              fontSize
            }
          }}
          componentsProps={{
            root: {
              style: {
                fontSize
              }
            }
          }}
          size={size}
          error={Boolean(errorMessage)}
        >
          {options?.map((item, index) => (
            <MenuItem key={index} disabled={item.disabled} value={getValue(item)}>
              {getLabel(item)}
            </MenuItem>
          ))}
        </Select>

        {errorMessage && (
          <FormHelperText sx={{ color: 'error.main' }} id=''>
            {errorMessage}
          </FormHelperText>
        )}
      </FormControl>
    )
  }
)
