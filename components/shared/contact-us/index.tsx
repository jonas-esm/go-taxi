import React from 'react'

import { Icon } from '@iconify-icon/react/dist/iconify.mjs'
import type { MenuProps } from '@mui/material'
import { alpha, Box, Divider, Menu, MenuItem, styled } from '@mui/material'

import Button from '../button'

const StyledMenu = styled((props: MenuProps) => (
  <StyledMenu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right'
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right'
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color: 'rgb(55, 65, 81)',
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0'
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5)
      },
      '&:active': {
        backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity)
      }
    },
    ...theme.applyStyles('dark', {
      color: theme.palette.grey[300]
    })
  }
}))

function ContactUs() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Button
        id='demo-customized-button'
        aria-controls={open ? 'demo-customized-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        variant='contained'
        disableElevation
        fullWidth
        onClick={handleClick}
        endIcon={<Icon icon={'tabler:chevron-down'} />}
      >
        Contact Us
      </Button>
      <Menu
        id='demo-customized-menu'
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button'
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem
          onClick={() => {
            window.open('https://api.whatsapp.com/send?phone=31682200741', '_blank')
            handleClose()
          }}
          disableRipple
        >
          <Icon icon='ic:baseline-whatsapp' width={24} style={{ marginRight: 8, color: 'green' }} />
          On Whatsapp
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem
          onClick={() => {
            window.open('tel:+31682200741', '_blank')
            handleClose()
          }}
          disableRipple
        >
          <Icon icon='ic:round-call' width={24} style={{ marginRight: 8, color: 'grey' }} />
          Regular Call
        </MenuItem>
      </Menu>
    </Box>
  )
}

export default ContactUs
