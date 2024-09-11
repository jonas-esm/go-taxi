import axios from "axios";

// const onSubmit = async (data: any) => {
//     console.log(data);
//     const from = placesFrom.find((place) => place.id === data.from),
//         to = placesTo.find((place) => place.id === data.to);
//     const tripDirectionRes = await onTripDetailsCalc(from, to);
//     setTripDirectionInfo(tripDirectionRes);
//     console.log(tripDirectionRes);
// };

type db_request_type = {
    "customer name": string;
    "from location": string;
    "to location": string;
    "trip date": string;
    "car type": string;
    distance: string;
    "time period": string;
};

type bodyPayload = {
    carType: string;
    fullName: string;
    fromCoordinates: string;
    toCoordinates: string;
    period: string;
    distance: string;
    dateTime: string;
};

const instance = axios.create({
    url: "https://app.nocodb.com/api/v2/tables/mvxud1n3g0d0u3j/records",
    headers: {
        "xc-token": process.env.NOCODP_TOKEN,
    },
});

export async function POST(request: Request) {
    try {
        const body: bodyPayload = await request.json();

        console.log(body);

        const db_payload: db_request_type = {
            "car type": body.carType,
            "customer name": body.fullName,
            "from location": body.fromCoordinates || "",
            "to location": body.toCoordinates || "",
            "time period": body.period,
            distance: body.distance,
            "trip date": body.dateTime,
        };

        const res = await axios.post(
            "https://app.nocodb.com/api/v2/tables/mvxud1n3g0d0u3j/records",
            db_payload,
            {
                headers: {
                    "xc-token": process.env.NOCODP_TOKEN,
                },
            }
        );

        console.log("**********RESPONSE****************", res.data);

        return Response.json(res.data);
    } catch (error: any) {
        console.log(error);

        return Response.json(
            { error: `${error}` },
            { status: error?.status || 400 }
        );
    }
}
