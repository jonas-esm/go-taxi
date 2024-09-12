import { type GeocodeFeature } from '@mapbox/mapbox-sdk/services/geocoding'

import { onTripDetailsCalc } from '@/utils/fetch-address.utils'

// const onSubmit = async (data: any) => {
//     console.log(data);
//     const from = placesFrom.find((place) => place.id === data.from),
//         to = placesTo.find((place) => place.id === data.to);
//     const tripDirectionRes = await onTripDetailsCalc(from, to);
//     setTripDirectionInfo(tripDirectionRes);
//     console.log(tripDirectionRes);
// };

const getTripDetials = async (from: GeocodeFeature, to: GeocodeFeature) => {
  return await onTripDetailsCalc(from, to, process.env.MAPBOX_TOKEN!)
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const res = await getTripDetials(body?.from, body?.to)

    return Response.json(res)
  } catch (error: any) {
    console.log(error)

    return Response.json({ error: `${error}` }, { status: error?.status || 400 })
  }
}
