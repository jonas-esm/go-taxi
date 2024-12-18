import React, { useMemo } from 'react'

import { Box, Stack, Typography, useTheme, type Palette } from '@mui/material'

import { Controller, useFormContext } from 'react-hook-form'

import { Icon } from '@iconify-icon/react/dist/iconify.mjs'

import { toast } from 'react-toastify'

import { useTranslations } from 'next-intl'

import { carTypeOptions } from '@/utils/car-selector-data'
import { formatTime, formatDistance } from '@/utils/fetch-address.utils'

import type { ReservationFormData } from '..'
import { usePriceListQuery } from '@/services/address.service'

const getTextColor = (item: { id: string }, value: string, palette: Palette) => ({
  color: item.id !== value ? palette.text.primary : '#fff'
})

function CarTypeSelector({ isFetchingTripDetails }: { isFetchingTripDetails?: boolean }) {
  const { palette } = useTheme()
  const { control, getValues, setValue } = useFormContext<ReservationFormData>()
  const { data: priceList } = usePriceListQuery()
  const t = useTranslations('home')

  const tripCostList = useMemo(() => {
    const familyRatePerKm = priceList?.data?.list?.find(item => item.category === 'public_family')?.per_km || 0
    const economyRatePerKm = priceList?.data?.list?.find(item => item.category === 'public_economy')?.per_km || 0
    const luxuryRatePerKm = priceList?.data?.list?.find(item => item.category === 'public_luxury')?.per_km || 0
    const distance = getValues().tripDetails?.routes[0].distance || 0

    const prices = {
      FAMILY: (familyRatePerKm * distance) / 1000,
      LUXURY: (luxuryRatePerKm * distance) / 1000,
      ECONOMY: (economyRatePerKm * distance) / 1000
    }

    return prices
  }, [priceList, getValues().tripDetails?.routes[0].distance])

  return (
    <Controller
      control={control}
      name='carType'
      render={({ field: { value, onChange } }) => (
        <Stack>
          {carTypeOptions(t).map((item, ind) => (
            <Box
              key={ind}
              sx={{
                px: 3,
                py: 4,
                borderRadius: 1.5,
                background: item.id === value ? palette.info.main : '#F7F8FA',

                mb: 2,
                border: `1px solid ${palette.background.paper}`,

                cursor: 'pointer',
                ' &:hover':
                  item.id !== value
                    ? {
                        background: '#f8f8f8',
                        border: `1px solid ${palette.primary.main}`
                      }
                    : undefined
              }}
              onClick={() => {
                if (!(+tripCostList?.[item.id as 'LUXURY' | 'FAMILY' | 'ECONOMY'] > 0)) {
                  toast.error('Please fill the address fields for the pickup and the destination points first.', {
                    position: 'bottom-center'
                  })

                  return
                }

                onChange(item.id)
                setValue('amount', +tripCostList?.[item.id as 'LUXURY' | 'FAMILY' | 'ECONOMY']?.toFixed(2))
                setValue('tripCost', +tripCostList?.[item.id as 'LUXURY' | 'FAMILY' | 'ECONOMY']?.toFixed(2))
              }}
            >
              <Stack direction={'row'} justifyContent={'space-between'}>
                {item.carImage}
                <Box marginInlineEnd={'auto'} marginInlineStart={2}>
                  <Stack direction={'row'}>
                    <Typography color={getTextColor(item, value, palette).color} variant='h4' mr={2}>
                      {item.label}
                    </Typography>

                    {/* {item.peopleIcon} */}
                    <item.peopleIcon color={getTextColor(item, value, palette).color} />
                    <Typography
                      color={getTextColor(item, value, palette).color}
                      display={'inline'}
                      ml={1}
                      sx={getTextColor(item, value, palette)}
                    >
                      {item.capacity}
                    </Typography>
                  </Stack>
                  <Typography color={getTextColor(item, value, palette).color}>{item.discription}</Typography>
                </Box>

                {isFetchingTripDetails ? (
                  <Icon
                    icon={'eos-icons:three-dots-loading'}
                    color={palette.primary.main}
                    style={{
                      color: palette.primary.main,
                      fontSize: 40
                    }}
                  />
                ) : tripCostList?.[item.id as 'LUXURY' | 'FAMILY' | 'ECONOMY'] ? (
                  <Box ml={'auto'} color={getTextColor(item, value, palette)}>
                    {/* <div className='text-black '>{formatTime(getValues().tripDetails?.routes[0].duration || 0)}</div> */}
                    {/* <div className='text-black'>{formatDistance(getValues().tripDetails?.routes[0].distance || 0)}</div> */}
                    <div className='text-black'>
                      {(+tripCostList?.[item.id as 'LUXURY' | 'FAMILY' | 'ECONOMY']?.toFixed(2)).toLocaleString('en')}€
                    </div>
                  </Box>
                ) : null}
              </Stack>
            </Box>
          ))}
        </Stack>
      )}
    />
  )
}

export default CarTypeSelector
