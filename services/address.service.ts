import { type DirectionsResponse } from '@mapbox/mapbox-sdk/services/directions'
import type { GeocodeFeature } from '@mapbox/mapbox-sdk/services/geocoding'
import { useMutation, useQuery } from '@tanstack/react-query'

import axios from 'axios'

import { useFetch } from '@/hooks/fetch.hook'
import { ReservationFormData } from '@/components/home/reserve-form'

type postTripRequestType = {
  carType: string
  fullName: string
  fromCoordinates: string
  toCoordinates: string
  fromAddress: string
  toAddress: string
  period: string
  distance: string
  dateTime: string
  amount: string
  paymentMethod: string
}

export const useSearchAddressMutation = () => {
  const { api } = useFetch()

  return useMutation<{ data: GeocodeFeature[] }, any, { searchTerm: string }>({
    mutationFn: ({ searchTerm }) => api.post('/api/address', { searchTerm })
  })
}

export const usePostTripRequestMutation = () => {
  const { api } = useFetch()

  return useMutation<{ data: GeocodeFeature[] }, any, postTripRequestType>({
    mutationFn: data => api.post('/api/trip-reservation', data)
  })
}

export const useSearchAddressQuery = ({ searchTerm }: { searchTerm: string | number[] }) => {
  const { api } = useFetch()

  return useQuery<{ data: GeocodeFeature[] }>({
    queryKey: ['addresses-search', searchTerm],
    queryFn: () => api.post('/api/address', { searchTerm }),
    enabled: !!searchTerm
  })
}

export const useTripDetialsQuery = ({ from, to }: { from?: GeocodeFeature | null; to?: GeocodeFeature | null }) => {
  const { api } = useFetch()

  return useQuery<{ data: DirectionsResponse }>({
    queryKey: ['trip-details-calculation', from, to],
    queryFn: () => api.post('/api/trip', { from, to }),
    enabled: !!from && !!to && !!from.id && !!to.id
  })
}

export const usePriceListQuery = () => {
  return useQuery<{ data: { list: { category: string; per_km: number }[] } }>({
    queryKey: ['price-list'],
    queryFn: () => axios.get('/api/pricelist'),
    enabled: true,
    refetchOnWindowFocus: true,
    staleTime: 10 * 60 * 1000
  })
}
