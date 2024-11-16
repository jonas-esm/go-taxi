import axios from 'axios'
import { format } from 'date-fns'

import { sendWhatsappMessage } from '@/services/meta-dev.service'
import { formatDistance, formatTime } from '@/utils/fetch-address.utils'

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
  fromAddress: string
  toAddress: string
  period: string
  distance: string
  dateTime: string
  phoneNumber: string
  notes: string
  amount: string
  paymentMethod: string
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
      console.log("Couldn't send email", error?.response?.data || error?.response || error)
    }

    try {
      await sendWhatsappMessage({
        name: body.fullName || 'N/A',
        phone: body.phoneNumber || 'N/A',
        amount: body.amount || 'N/A',
        carType: body.carType || 'N/A',
        distance: body.distance ? formatDistance(+body.distance) : 'N/A',
        duration: body.period ? formatTime(+body.period) : 'N/A',
        googleDirection: `https://www.google.com/maps/dir/${body.fromCoordinates}/${body.toCoordinates} `,
        method: body.paymentMethod || 'N/A',
        startAddress: body.fromAddress || 'N/A',
        targetAddress: body.toAddress || 'N/A',
        tripDate: format(body.dateTime, 'dd/MM/yyyy : hh:mm a') || 'N/A'
      })
    } catch (error) {
      console.log("Couldn't send whatsapp message", error?.response?.data || error?.response || error)
    }

    console.log('**********RESPONSE****************', res.data)

    return Response.json(res.data)
  } catch (error: any) {
    console.log(error)

    return Response.json({ error: `${error}` }, { status: error?.status || 400 })
  }
}
