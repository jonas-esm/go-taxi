"use client";

import { useContext } from "react";

import { FetchContext } from "../contexts/fetch.context";

export const useFetch = () => {
    const context = useContext(FetchContext);

    if (!context) {
        throw new Error("useFetch must be used within a FetchProvider");
    }

    return context;
};
