import axios from 'axios'

export const sendWhatsappMessage = async ({
  name,
  amount,
  carType,
  distance,
  duration,
  googleDirection,
  method,
  phone,
  startAddress,
  targetAddress,
  tripDate
}: {
  name: string
  phone: string
  startAddress: string
  targetAddress: string
  googleDirection: string
  tripDate: string
  duration: string
  distance: string
  carType: string
  amount: string
  method: string
}) => {
  const data = {
    messaging_product: 'whatsapp',
    to: '201097540411',
    type: 'template',
    template: {
      name: 'trip_request_1',
      language: {
        code: 'en_US'
      },
      components: [
        {
          type: 'body',
          parameters: [
            {
              type: 'text',
              text: name
            },
            {
              type: 'text',
              text: phone
            },
            {
              type: 'text',
              text: startAddress
            },
            {
              type: 'text',
              text: targetAddress
            },
            {
              type: 'text',
              text: googleDirection
            },
            {
              type: 'text',
              text: tripDate
            },
            {
              type: 'text',
              text: duration
            },
            {
              type: 'text',
              text: distance
            },
            {
              type: 'text',
              text: carType
            },
            {
              type: 'text',
              text: amount
            },
            {
              type: 'text',
              text: method
            }
          ]
        }
      ]
    }
  }

  console.log(JSON.stringify(data))

  const config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://graph.facebook.com/v20.0/411434302063808/messages',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.META_LONG_LIVED_TOKEN}`
    },
    data: data
  }

  console.log(config)

  return axios.post('https://graph.facebook.com/v20.0/411434302063808/messages', data, {
    maxBodyLength: Infinity,
    headers: config.headers
  })

  //   return await axios.request(config)
}

export const getMetaToken = async () => {
  const metaAppId = process.env.FBD_APP_ID,
    metaAppSecret = process.env.FBD_APP_SECRET,
    shortLivedToken = process.env.FBD_APP_SHORT_TOKEN

  const config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `https://graph.facebook.com/oauth/access_token?grant_type=fb_exchange_token&client_id=${metaAppId}&client_secret=${metaAppSecret}&fb_exchange_token=${shortLivedToken}`,
    headers: {}
  }

  return await axios.request(config)
}

export const refreshMetaToken = () => {
  const metaAppId = process.env.FBD_APP_ID,
    metaAppSecret = process.env.FBD_APP_SECRET,
    longLivedToken = ''

  const config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `https://graph.facebook.com/oauth/access_token?grant_type=fb_exchange_token&client_id=${metaAppId}&client_secret=${metaAppSecret}&fb_exchange_token=${longLivedToken}`,
    headers: {}
  }

  return axios.request(config)
}

export const getTokenFromDb = () => {
  const options = {
    method: 'GET',
    url: 'https://app.nocodb.com/api/v2/tables/m4zbfe8ockwlz8b/records',
    params: { offset: '0', limit: '25', where: '', viewId: 'vwxhho4yx90o6mqx', sort: 'CreatedAt' },
    headers: {
      'xc-token': process.env.NOCODP_TOKEN
    }
  }

  return axios.request(options)
}

export const storeTokenInDb = (encryptedToken: string) => {
  const db_payload = {
    name: 'meta_long_lived_token',
    token: encryptedToken
  }

  return axios.post(`https://app.nocodb.com/api/v2/tables/m4zbfe8ockwlz8b/records`, db_payload, {
    headers: {
      'xc-token': process.env.NOCODP_TOKEN
    }
  })
}

// todo: handle get token and refresh token from meta service for whatsapp messages
