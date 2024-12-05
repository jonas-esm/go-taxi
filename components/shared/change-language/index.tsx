'use client'
import React from 'react'

import { Icon } from '@iconify-icon/react/dist/iconify.mjs'
import type { MenuProps } from '@mui/material'

import { alpha, Box, IconButton, Menu, MenuItem, styled } from '@mui/material'

const languegesMenuItemsProps = [
  { iconName: 'emojione:flag-for-saudi-arabia', title: 'Arabic', lang: 'ar' },
  { iconName: 'circle-flags:nl', title: 'Dutch', lang: 'nl' },
  { iconName: 'circle-flags:uk', title: 'English', lang: 'en' }
]

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

function ChangeLangualge() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const changeLanguage = (lng: string) => {
    // i18n.changeLanguage(lng) // Change language dynamically
  }

  return (
    <Box sx={{ width: '100%' }}>
      <IconButton
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        // variant='contained'
        // disableElevation
        onClick={handleClick}

        // endIcon={<Icon icon={'tabler:chevron-down'} />}
      >
        <Icon icon={'tabler:language'} />
      </IconButton>
      <Menu
        id='demo-customized-menu'
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button'
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {languegesMenuItemsProps.map((item, ind) => (
          <MenuItem
            key={ind}
            onClick={() => {
              changeLanguage(item.lang)
            }}
            disableRipple
          >
            <Icon icon={item.iconName} width={ind == 0 ? 24 : 20} style={{ marginRight: 8, color: 'green' }} />
            {item.title}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  )
}

export default ChangeLangualge
