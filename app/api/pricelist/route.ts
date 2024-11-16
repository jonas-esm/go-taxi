import { type GeocodeFeature } from '@mapbox/mapbox-sdk/services/geocoding'

import axios from 'axios'

import { onTripDetailsCalc } from '@/utils/fetch-address.utils'

// const onSubmit = async (data: any) => {
//     console.log(data);
//     const from = placesFrom.find((place) => place.id === data.from),
//         to = placesTo.find((place) => place.id === data.to);
//     const tripDirectionRes = await onTripDetailsCalc(from, to);
//     setTripDirectionInfo(tripDirectionRes);
//     console.log(tripDirectionRes);
// };

export async function GET(request: Request) {
  try {
    const res = await axios.get('https://app.nocodb.com/api/v2/tables/mvs08v7m6f8cc0f/records', {
      headers: {
        'xc-token': process.env.NOCODP_TOKEN
      },
      params: { offset: '0', limit: '25', where: '', viewId: 'vw91xi6awv6076t6' }
    })

    return Response.json(res.data)
  } catch (error: any) {
    console.log(error)

    return Response.json({ error: `${error}` }, { status: error?.status || 400 })
  }
}
