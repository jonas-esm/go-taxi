import React from 'react'

import Image from 'next/image'

import { IconButton, Stack, Typography, useTheme } from '@mui/material'
import { Icon } from '@iconify-icon/react/dist/iconify.mjs'

import { useTranslations } from 'next-intl'

import LogoSvg from '../../../assets/logo.svg'

const Footer = () => {
  const theme = useTheme()
  const t = useTranslations('footer')

  return (
    <Stack py={4}>
      <Image src={LogoSvg} alt='logo' />
      <Typography variant='h4' mt={4}>
        {t('contactUs')}
      </Typography>
      <Typography color={theme.palette.text.disabled} mb={1}>
        {t('description')}
      </Typography>
      <Stack direction={'row'} gap={4} alignItems={'center'} ml={-2}>
        <IconButton
          onClick={() => {
            window?.open('https://wa.link/x2xzox', '_blank', 'noreferrer')
          }}
        >
          <Icon icon={'logos:whatsapp-icon'} />
        </IconButton>
      </Stack>
    </Stack>
  )
}

export default Footer
