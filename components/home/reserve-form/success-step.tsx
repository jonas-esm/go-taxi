'use client'
import React from 'react'

import { useRouter } from 'next/navigation'

import { Avatar, Box, Divider, Grid2, Slide, Stack, Typography, useTheme } from '@mui/material'

import { Icon } from '@iconify-icon/react/dist/iconify.mjs'

import { useFormContext } from 'react-hook-form'

import { useSelector } from 'react-redux'

import { useTranslations } from 'next-intl'

import FormContainer from './form-container'

import Button from '@/components/shared/button'
import { type RootState } from '@/redux/store/store'
import ContactUs from '@/components/shared/contact-us'

function SuccessStep({ setActiveStep }: { setActiveStep: (step: 0 | 1 | 2) => void }) {
  const theme = useTheme()
  const tripState = useSelector((state: RootState) => state.trip)

  const { reset, getValues } = useFormContext()
  const router = useRouter()
  const payment = useSelector((state: RootState) => state.payment)
  const t = useTranslations('successCard')

  return (
    <Slide appear in direction='left'>
      <Box>
        <FormContainer isSuccess>
          <Typography variant='h3' mt={6} color={theme.palette.success.main} textAlign={'center'}>
            {t('thankYouMessage')}
          </Typography>
          <Typography textAlign={'center'} mt={2}>
            {t('contactMessage')}:{tripState.phoneNumber}
          </Typography>
          <Divider sx={{ my: 6 }} />
          <Stack direction={'row'} alignItems={'center'}>
            <Button
              onClick={() => {
                reset()
                setActiveStep(0)
                router.push('/en')
              }}
              sx={{ flex: 1 }}
              variant='outlined'
            >
              {t('bookNewRideButton')}
            </Button>
            <Divider orientation='vertical' flexItem sx={{ mx: 6, height: 64 }} />
            {/* <Button sx={{ flex: 1 }}>Call Us</Button> */}
            <Box flex={1}>
              <ContactUs />
            </Box>
          </Stack>
        </FormContainer>
      </Box>
    </Slide>
  )
}

export default SuccessStep
