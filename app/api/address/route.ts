import { onSearchPlace } from "@/utils/fetch-address.utils";

const searchForPlaces = async (searchTerm: string) => {
    if (searchTerm?.length > 1) {
        const opt = await onSearchPlace(searchTerm, process.env.MAPBOX_TOKEN!);

        
return opt;
    } else return [];
};

export async function POST(request: Request) {
    try {
        const body = await request.json();

        console.log(body);

        const res = await searchForPlaces(body?.searchTerm);

        return Response.json(res);
    } catch (error: any) {
        console.log(error);
        
return Response.json(
            { error: `${error}` },
            { status: error?.status || 400 }
        );
    }
}
