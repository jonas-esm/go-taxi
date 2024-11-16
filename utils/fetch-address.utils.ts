import type { GeocodeFeature } from '@mapbox/mapbox-sdk/services/geocoding'
import geoCoding from '@mapbox/mapbox-sdk/services/geocoding'
import type { DirectionsRequest } from '@mapbox/mapbox-sdk/services/directions'
import directionApi from '@mapbox/mapbox-sdk/services/directions'
import type { Coordinates } from '@mapbox/mapbox-sdk/lib/classes/mapi-request'

export const formatTime = (duration: number) => {
  const hours = Math.floor(duration / 3600)
  const minutes = Math.floor((duration % 3600) / 60)
  const formattedHours = hours ? hours.toString() : ''
  const formattedMinutes = minutes.toString()

  return `${formattedHours ? formattedHours + ' hr ' : ''} ${formattedMinutes} min`
}

export const formatDistance = (distance: number) => {
  if (distance < 1000) {
    return `${distance} m`
  } else {
    const kilometers = distance / 1000

    return `${kilometers.toFixed(2)} km`
  }
}

export const onSearchPlace = async (value: string) => {
  // console.log("Searching for address ", value);

  const geoClient = geoCoding({
    //@ts-ignore
    accessToken: process.env.MAPBOX_TOKEN!
  })

  const forwoardedGeocode = geoClient.forwardGeocode({
    query: value,
    limit: 5,
    countries: ['eg', 'nl']
  })

  const geocodeRes = await forwoardedGeocode.send()

  // console.log(geocodeRes.body);

  return geocodeRes.body.features
}

export const getCoordinateAddress = async (coordinates: number[]) => {
  const geoClient = geoCoding({
    //@ts-ignore
    accessToken: process.env.MAPBOX_TOKEN!
  })

  const forwoardedGeocode = geoClient.reverseGeocode({
    //@ts-ignore
    query: coordinates
  })

  const geocodeRes = await forwoardedGeocode.send()

  // console.log(geocodeRes.body);

  return geocodeRes.body.features
}

export const onTripDetailsCalc = async (from: GeocodeFeature, to: GeocodeFeature, MAPBOX_TOKEN: string) => {
  const directionsClient = directionApi({
    //@ts-ignore
    accessToken: MAPBOX_TOKEN
  })

  const payload: DirectionsRequest = {
    profile: 'driving-traffic',
    waypoints: [{ coordinates: from.center as Coordinates }, { coordinates: to.center as Coordinates }]

    // waypoints: [
    //   {
    //     coordinates: [from.longitude, from.latitude],
    //     approach: "unrestricted",
    //   },
    //   {
    //     coordinates: [to.longitude, to.latitude],
    //     approach: "unrestricted",
    //   },
    // ],
    // geometries: "geojson",
    // overview: "full",
    // steps: true,
    // access_token: process.env.MAPBOX_ACCESS_TOKEN,
  }

  // console.log(payload);

  const directions = await directionsClient.getDirections(payload).send()

  // console.log(directions.body);

  return directions.body
}

let timer: NodeJS.Timeout

export const debounceTime = (fn: () => void, T: number) => {
  clearTimeout(timer) // Clear any existing timer
  timer = setTimeout(() => {
    fn() // Execute the function after the debounce period
  }, T)
}
