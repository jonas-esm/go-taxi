import geoCoding, {
    GeocodeFeature,
} from "@mapbox/mapbox-sdk/services/geocoding";
import directionApi, {
    DirectionsRequest,
} from "@mapbox/mapbox-sdk/services/directions";
import { Coordinates } from "@mapbox/mapbox-sdk/lib/classes/mapi-request";

console.log(process.env);

export const formatTime = (duration: number) => {
    const hours = Math.floor(duration / 3600);
    const minutes = Math.floor((duration % 3600) / 60);
    const formattedHours = hours ? hours.toString() : "";
    const formattedMinutes = minutes.toString();
    return `${
        formattedHours ? formattedHours + " hr " : ""
    } ${formattedMinutes} min`;
};

export const formatDistance = (distance: number) => {
    if (distance < 1000) {
        return `${distance} m`;
    } else {
        const kilometers = distance / 1000;
        return `${kilometers.toFixed(2)} km`;
    }
};

export const onSearchPlace = async (value: string, MAPBOX_TOKEN: string) => {
    // console.log("Searching for address ", value);
    const geoClient = geoCoding({
        //@ts-ignore
        accessToken: MAPBOX_TOKEN,
    });
    const forwoardedGeocode = geoClient.forwardGeocode({
        query: value,
        limit: 3,
        countries: ["eg"],
    });
    const geocodeRes = await forwoardedGeocode.send();

    // console.log(geocodeRes.body);

    return geocodeRes.body.features;
};

export const onTripDetailsCalc = async (
    from: GeocodeFeature,
    to: GeocodeFeature,
    MAPBOX_TOKEN: string
) => {
    const directionsClient = directionApi({
        //@ts-ignore
        accessToken: MAPBOX_TOKEN,
    });
    const payload: DirectionsRequest = {
        profile: "driving-traffic",
        waypoints: [
            { coordinates: from.center as Coordinates },
            { coordinates: to.center as Coordinates },
        ],

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
    };

    // console.log(payload);

    const directions = await directionsClient.getDirections(payload).send();

    // console.log(directions.body);

    return directions.body;
};

let timer: NodeJS.Timeout;

export const debounceTime = (fn: () => void, T: number) => {
    clearTimeout(timer); // Clear any existing timer
    timer = setTimeout(() => {
        fn(); // Execute the function after the debounce period
    }, T);
};