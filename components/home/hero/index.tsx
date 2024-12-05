import React from 'react'

import { Stack, Typography, useTheme } from '@mui/material'
import { useTranslations } from 'next-intl'

function HeroSection() {
  const { palette, typography } = useTheme()
  const t = useTranslations('header')

  return (
    <Stack justifyContent={'center'} alignItems={'center'} spacing={1}>
      <Typography variant='h3'>
        {t('welcome')}{' '}
        <Typography
          display={'inline'}
          //   variant="h3"
          fontSize={typography.h3.fontSize}
          fontWeight={700}
          color={palette.primary.main}
        >
          GO TAXI
        </Typography>
      </Typography>
      <Typography variant='h1' fontWeight={400}>
        {t('tagline')}
      </Typography>
      <Typography variant='h3'>{t('subTagline')}</Typography>
    </Stack>
  )
}

export default HeroSection
