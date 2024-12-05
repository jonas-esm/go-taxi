'use client'
import React, { useEffect, useState } from 'react'

import { useParams, useRouter, useSearchParams } from 'next/navigation'

import { type NextRouter } from 'next/router'

import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'

import { FormProvider, useForm } from 'react-hook-form'

import { Box, CircularProgress, IconButton } from '@mui/material'
import type { DirectionsResponse } from '@mapbox/mapbox-sdk/services/directions'
import * as dateFns from 'date-fns'
import { Icon } from '@iconify-icon/react/dist/iconify.mjs'
import type { GeocodeFeature } from '@mapbox/mapbox-sdk/services/geocoding'

import { useSearchParam } from 'react-use'

import PersonalInfoForm from './personal-info-form'
import AddressForm from './address-form/address-form'
import SuccessStep from './success-step'
import CheckoutWrapper from '../checkout/wrapper'

export interface ReservationFormData {
  from: GeocodeFeature | null
  fromSearch: string
  to: GeocodeFeature | null
  toSearch: string
  date: Date | null
  time: Date | null
  dateTime: Date | null
  fullName: string
  phoneNumber: string
  notes: string
  tripDetails?: DirectionsResponse<string>
  carType: string
  tripCost?: number
  amount?: number
}

const steps = ({ setActiveStep }: { setActiveStep: (step: 0 | 1 | 2 | 3) => void }) => ({
  '0': <AddressForm setActiveStep={setActiveStep} />,
  '1': <PersonalInfoForm setActiveStep={setActiveStep} />,
  '2': <CheckoutWrapper setActiveStep={setActiveStep} />,
  '3': <SuccessStep setActiveStep={setActiveStep} />
})

const getUrlStep = (searchParams: URLSearchParams) => {
  const stepQuery = searchParams.get('step') !== null ? +searchParams.get('step')! : 0

  return stepQuery

  //   if (stepQuery !== null && +stepQuery >= 0 && +stepQuery < 4) {
  //     if ([0, 1, 2, 3].indexOf(+stepQuery) > -1 && +stepQuery !== activeStep) {
  //       console.log(stepQuery)
  //       setActiveStep(+stepQuery as 1 | 2 | 3)

  //       const currentParams = new URLSearchParams(searchParams.toString())

  //       currentParams.delete('step')
  //       console.log(window?.location?.pathname + '?' + currentParams.toString())
  //       router.push(window?.location?.pathname + '?' + currentParams.toString())
  //     }
  //   }
}

const removeQuery = (searchParams: URLSearchParams, query: string, router: AppRouterInstance) => {
  const currentParams = new URLSearchParams(searchParams.toString())

  currentParams.delete(query)
  router.push(window?.location?.pathname + '?' + currentParams.toString())
}

export function TripReserveForm() {
  //   const queryParamStep = useSearchParam('step')
  const router = useRouter()
  const searchParams = useSearchParams()

  const queryStep = searchParams.get('step') || 0

  const [activeStep, setActiveStep] = useState<0 | 1 | 2 | 3>((+queryStep as 0 | 1 | 2) || 0)

  const methods = useForm<ReservationFormData>({
    defaultValues: {
      from: null,
      to: null,
      date: new Date(),
      time: dateFns.add(new Date(), {
        hours: 0.5,
        minutes: 60 - new Date().getMinutes()
      }),
      dateTime: new Date(),
      fullName: '',
      phoneNumber: '',
      notes: '',
      carType: '',
      fromSearch: '',
      toSearch: ''
    }
  })

  useEffect(() => {
    const stepQuery = getUrlStep(searchParams)

    if (stepQuery > 0 && stepQuery < 4) {
      if (stepQuery !== activeStep) {
        setActiveStep(stepQuery as 1 | 2 | 3)

        removeQuery(searchParams, 'step', router)
      }
    }
  }, [searchParams, activeStep])

  if (activeStep > 3 || activeStep < 0) {
    return (
      <div>
        <CircularProgress />
      </div>
    )
  }

  return (
    <div>
      {activeStep !== 0 && (
        <Box
          sx={{
            position: 'fixed',
            top: 12,
            left: 8,
            zIndex: 99999999
          }}
        >
          <IconButton size='medium' color='primary' onClick={() => setActiveStep(0)}>
            <Icon icon={'tabler:arrow-left'} />
          </IconButton>
        </Box>
      )}
      <FormProvider {...methods}>{steps({ setActiveStep })[`${activeStep}`]}</FormProvider>
    </div>
  )
}
