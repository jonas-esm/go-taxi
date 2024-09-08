import type { FC } from 'react'

import type { LoadingButtonProps } from '@mui/lab/LoadingButton'
import LoadingButton from '@mui/lab/LoadingButton'
import classNames from 'classnames'

const Button: FC<LoadingButtonProps> = ({ children, ...props }) => {
  return (
    <LoadingButton
      {...props}
      className={classNames('min-h-10', props?.className)}
      variant={props?.loading ? 'tonal' : props.variant || 'contained'}
    >
      {children}
    </LoadingButton>
  )
}

export default Button
