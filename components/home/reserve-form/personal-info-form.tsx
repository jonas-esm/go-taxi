/* eslint-disable lines-around-comment */
import React, { useEffect, useState } from 'react'

import { Typography, Card, CardContent, Stack, Box, Slide } from '@mui/material'

import { useFormContext } from 'react-hook-form'

import FormContainer from './form-container'
import CustomTextField from '@/components/shared/text-input'

import type { ReservationFormData } from '.'
import Button from '@/components/shared/button'
import { usePostTripRequestMutation } from '@/services/address.service'

function PersonalInfoForm({ setActiveStep }: { setActiveStep: (step: 0 | 1 | 2) => void }) {
  const [isLoading, setIsLoading] = useState(false)

  const { control, handleSubmit } = useFormContext<ReservationFormData>()
  const { mutateAsync } = usePostTripRequestMutation()

  const onSubmit = async (formData: ReservationFormData) => {
    setIsLoading(true)
    console.log(formData)

    //@ts-ignore
    const tripDate =
      formData.date &&
      new Date(
        formData.date?.getFullYear?.(),
        formData.date?.getMonth?.(),
        formData.date?.getDate?.(),
        formData?.time?.getHours?.(),
        formData?.time?.getMinutes?.(),
        formData?.time?.getSeconds?.()
      )

    const payload = {
      ...formData,
      dateTime: tripDate?.toISOString(),
      period: formData.tripDetails?.routes?.[0]?.duration?.toString(),

      // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
      distance: formData.tripDetails?.routes?.[0]?.distance?.toString()!,
      toCoordinates: [formData.to?.geometry.coordinates?.[1], formData.to?.geometry.coordinates?.[0]].toString(),
      fromCoordinates: [
        formData?.from?.geometry.coordinates?.[1],
        formData?.from?.geometry.coordinates?.[0]
      ].toString(),
      fromAddress: formData?.from?.place_name,
      toAddress: formData?.to?.place_name,
      from: null,
      to: null,
      tripDetails: null,
      date: null,
      time: null
    }

    console.log(payload)

    try {
      //@ts-ignore
      const res = await mutateAsync(payload)

      console.log(res)
      setActiveStep(2)
    } catch (error) {
      console.log(error)
      alert('error')
    }

    setIsLoading(false)
  }

  useEffect(() => {
    window?.scrollTo({ behavior: 'smooth', top: -window?.scrollY })
  }, [])

  return (
    <Slide appear in direction='left'>
      <Box>
        <FormContainer>
          <Typography mb={2}> Enter your contact info</Typography>
          <Card sx={{ background: '#fff' }}>
            <CardContent sx={{ pt: 1 }}>
              <Stack>
                <Box>
                  <CustomTextField control={control} name='fullName' iconName='tabler:user' placeholder='Full Name' />
                </Box>
                <Box>
                  <CustomTextField
                    control={control}
                    name='phoneNumber'
                    iconName='solar:phone-calling-linear'
                    placeholder='Phone Number'
                  />
                </Box>
                <Box>
                  <CustomTextField control={control} name='notes' iconName='tabler:note' placeholder='Notes...' />
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </FormContainer>
        <Button
          sx={{ mt: 8 }}
          fullWidth
          size='large'
          loading={isLoading}
          //@ts-ignore
          onClick={handleSubmit(onSubmit, er => {
            console.log(er)
          })}
        >
          Submit
        </Button>
      </Box>
    </Slide>
  )
}

export default PersonalInfoForm
