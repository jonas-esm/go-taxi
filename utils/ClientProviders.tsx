"use client";

// Type Imports
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import type { ChildrenType } from "../@core/types";

import { FetchProvider } from "../contexts/fetch.context";

type Props = ChildrenType;

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnMount: true,
            refetchOnWindowFocus: false,
            retry: false,
        },
    },
});

const ClientProviders = ({ children }: Props) => {
    return (
        <FetchProvider>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </FetchProvider>
    );
};

export default ClientProviders;
