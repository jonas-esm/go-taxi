import axios from 'axios'
import { format } from 'date-fns'

// const onSubmit = async (data: any) => {
//     console.log(data);
//     const from = placesFrom.find((place) => place.id === data.from),
//         to = placesTo.find((place) => place.id === data.to);
//     const tripDirectionRes = await onTripDetailsCalc(from, to);
//     setTripDirectionInfo(tripDirectionRes);
//     console.log(tripDirectionRes);
// };

const baseUrl = process.env.HOST_URL ? 'https://' + process.env.HOST_URL : 'http://localhost:3000'

type db_request_type = {
  'customer name': string
  'from location': string
  'to location': string
  'trip date': string
  'car type': string
  distance: string
  'time period': string
  phoneNumber: string
  notes: string
}

type bodyPayload = {
  carType: string
  fullName: string
  fromCoordinates: string
  toCoordinates: string
  period: string
  distance: string
  dateTime: string
  phoneNumber: string
  notes: string
}

export async function POST(request: Request) {
  try {
    const body: bodyPayload = await request.json()

    const db_payload: db_request_type = {
      'car type': body.carType,
      'customer name': body.fullName,
      'from location': body.fromCoordinates || '',
      'to location': body.toCoordinates || '',
      'time period': body.period,
      distance: body.distance,
      'trip date': body.dateTime,
      notes: body.notes,
      phoneNumber: body.phoneNumber
    }

    const res = await axios.post(process.env.BE_URL!, db_payload, {
      headers: {
        'xc-token': process.env.NOCODP_TOKEN
      }
    })

    const mailPayload = {
      customerName: body.fullName,
      fromCoordinates: body.fromCoordinates,
      toCoordinates: body.toCoordinates,
      notes: body.notes,
      phoneNumber: body.phoneNumber,
      date: format(body.dateTime, 'dd/MM/yyyy'),
      time: format(body.dateTime, 'hh:mm')
    }

    try {
      await axios.post(baseUrl + '/api/send-email', mailPayload)
    } catch (error) {
      console.log("Couldn't send email", error)
    }

    console.log('**********RESPONSE****************', res.data)

    return Response.json(res.data)
  } catch (error: any) {
    console.log(error)

    return Response.json({ error: `${error}` }, { status: error?.status || 400 })
  }
}
