import { useFetch } from "@/hooks/fetch.hook";
import { type DirectionsResponse } from "@mapbox/mapbox-sdk/services/directions";
import { GeocodeFeature } from "@mapbox/mapbox-sdk/services/geocoding";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useSearchAddressMutation = () => {
    const { api } = useFetch();

    return useMutation<{ data: GeocodeFeature[] }, any, { searchTerm: string }>(
        {
            mutationFn: ({ searchTerm }) =>
                api.post("/api/address", { searchTerm }),
        }
    );
};

export const useSearchAddressQuery = ({
    searchTerm,
}: {
    searchTerm: string;
}) => {
    const { api } = useFetch();

    return useQuery<{ data: GeocodeFeature[] }>({
        queryKey: ["addresses-search", searchTerm],
        queryFn: () => api.post("/api/address", { searchTerm }),
        enabled: !!searchTerm,
    });
};

export const useTripDetialsQuery = ({
    from,
    to,
}: {
    from?: GeocodeFeature;
    to?: GeocodeFeature;
}) => {
    const { api } = useFetch();

    return useQuery<{ data: DirectionsResponse }>({
        queryKey: ["trip-details-calculation", from, to],
        queryFn: () => api.post("/api/trip", { from, to }),
        enabled: !!from && !!to && !!from.id && !!to.id,
    });
};
