import { getCoordinateAddress, onSearchPlace } from '@/utils/fetch-address.utils'

const searchForPlaces = async (searchTerm: string) => {
  if (searchTerm?.length > 1) {
    const opt = await onSearchPlace(searchTerm)

    return opt
  } else return []
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    let res: any

    if (typeof body?.searchTerm === 'string') {
      res = await searchForPlaces(body?.searchTerm)
    } else {
      res = await getCoordinateAddress(body?.searchTerm)
    }

    return Response.json(res)
  } catch (error: any) {
    console.log(error)

    return Response.json({ error: `${error}` }, { status: error?.status || 400 })
  }
}
