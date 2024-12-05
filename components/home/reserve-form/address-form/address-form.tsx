'use client'
import React, { useEffect, useState } from 'react'

import { Box, Card, Divider, Slide, Stack, Typography, useTheme } from '@mui/material'

import { useFormContext } from 'react-hook-form'

import { useDebounce, useGeolocation } from 'react-use'

import FormContainer from '../form-container'
import Button from '@/components/shared/button'

import type { ReservationFormData } from '..'
import CustomAutocomplete from '@/components/shared/autocomplete'
import { useSearchAddressQuery, useTripDetialsQuery } from '@/services/address.service'
import CustomDatePicker from '@/components/shared/date-picker'
import CustomTimePicker from '@/components/shared/time-picker'
import CarTypeSelector from './car-type-selector'

function AddressForm({ setActiveStep }: { setActiveStep: (step: 0 | 1 | 2) => void }) {
  const { palette } = useTheme()
  const { control, setValue, watch } = useFormContext<ReservationFormData>()

  // const [debounceSearchFrom, isWaitingFrom] = useCustomDebounce(watch().fromSearch, 1000)

  // const [debounceSearchTo, isWaitingTo] = useCustomDebounce(watch().toSearch, 1000)

  const [debounceSearchFrom, setDebounceSearchFrom] = useState<string>('')
  const [debounceSearchTo, setDebounceSearchTo] = useState('')

  const userLocation = useGeolocation()

  const [isFromReady] = useDebounce(
    () => {
      setDebounceSearchFrom(watch().fromSearch)
    },
    1000,
    [watch().fromSearch]
  )

  const [isToReady] = useDebounce(
    () => {
      setDebounceSearchTo(watch().toSearch)
    },
    1000,
    [watch().toSearch]
  )

  const { data: userLocationPlacesRes, isFetching: isUserLocationPlacesFetching } = useSearchAddressQuery({
    searchTerm: userLocation.longitude && userLocation.latitude ? [userLocation.longitude, userLocation.latitude] : ''
  })

  const { data: fromPlacesRes, isFetching: isFromPlacesFetching } = useSearchAddressQuery({
    searchTerm: debounceSearchFrom
  })

  const { data: toPlacesRes, isFetching: isToPlacesFetching } = useSearchAddressQuery({
    searchTerm: debounceSearchTo
  })

  const { data: tripDetailsRes, isFetching: isFetchingTripDetails } = useTripDetialsQuery({
    from: watch().from,
    to: watch().to
  })

  useEffect(() => {
    if (tripDetailsRes?.data?.uuid && watch().tripDetails?.uuid !== tripDetailsRes?.data?.uuid) {
      setValue('tripDetails', tripDetailsRes?.data)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tripDetailsRes?.data])

  useEffect(() => {
    if (userLocationPlacesRes?.data?.length) {
      setValue('from', userLocationPlacesRes?.data?.[0])
    }
  }, [userLocationPlacesRes?.data])

  //   useEffect(() => {
  //     console.log(window?.location)

  //     if (window?.location?.search?.length > 0) {
  //       router.push('/en')
  //     }
  //   }, [])

  return (
    <Slide appear in direction='right'>
      <Box>
        <FormContainer>
          <Typography mb={2}>Reserve your trip</Typography>
          <Card sx={{ background: '#fff' }}>
            <Box sx={{ px: 6, pt: 1, pb: 2 }}>
              <Stack>
                <Box>
                  <CustomAutocomplete
                    name='from'
                    options={fromPlacesRes?.data || []}
                    iconName={'iconoir:search'}
                    textFieldProps={{
                      placeholder: 'From...?'
                    }}
                    autoCompleteProps={{
                      onInputChange: (e, value) => {
                        // console.log(e);
                        if (e?.type === 'change') {
                          setValue('fromSearch', value)
                        }
                      },

                      // inputValue: watch().fromSearch,
                      loading: isFromPlacesFetching,
                      getOptionLabel: option => option.place_name,
                      getOptionKey: option => option.id
                    }}
                  />
                </Box>
                <Box>
                  <CustomAutocomplete
                    name='to'
                    options={toPlacesRes?.data || []}
                    iconName={'iconoir:search'}
                    textFieldProps={{
                      placeholder: 'To..?'
                    }}
                    autoCompleteProps={{
                      onInputChange: (e, value) => {
                        if (e?.type === 'change') {
                          setValue('toSearch', value)
                        }
                      },
                      getOptionLabel: option => option.place_name,
                      getOptionKey: option => option.id,

                      // inputValue:
                      //     watch().to?.label ||
                      //     watch().toSearch,
                      loading: isToPlacesFetching

                      // blurOnSelect: true,
                      // selectOnFocus: true,
                    }}
                  />
                </Box>
                <Box>
                  <Stack direction={'row'} spacing={8}>
                    <CustomDatePicker
                      name='date'
                      views={['year', 'month', 'day']} // Limit views to year, month, and date
                    />
                    <Box
                      flex={1}
                      my={'auto'}
                      color={palette.text.disabled}
                      display={'flex'}
                      flexDirection={'column'}
                      alignItems={'center'}
                      justifyContent={'center'}
                    >
                      <Divider
                        orientation='vertical'
                        sx={{
                          maxHeight: 22
                        }}

                        // flexItem
                      />
                    </Box>

                    <CustomTimePicker control={control} name='time' />
                  </Stack>
                </Box>
              </Stack>
            </Box>
          </Card>
        </FormContainer>

        <Box>
          <Typography mt={6} mb={2} ml={2}>
            Choose car that suits you
          </Typography>
          <CarTypeSelector isFetchingTripDetails={isFetchingTripDetails} />
          <Button
            sx={{ mt: 4 }}
            fullWidth
            //@ts-ignore
            onClick={() => setActiveStep(p => p + 1)}
            size='large'
          >
            Proceed
          </Button>
        </Box>
      </Box>
    </Slide>
  )
}

export default AddressForm
