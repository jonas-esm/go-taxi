import { useQuery } from '@tanstack/react-query'

import { useFetch } from '@/hooks/fetch.hook'

export const usePaymentIntentQuery = ({ amount }: { amount: number }) => {
  const { api } = useFetch()

  return useQuery<{ data: { client_secret: string } }, any>({
    queryKey: ['addresses-search', amount],
    queryFn: () => api.post('/api/address', { amount }),
    enabled: !!amount
  })
}
