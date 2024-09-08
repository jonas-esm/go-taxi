"use client";
import MyAppBar from "@/components/home/AppBar";
import HeroSection from "@/components/home/hero";
import { TripReserveForm } from "@/components/home/reserve-form";
import { Container, Stack, useTheme } from "@mui/material";
import React from "react";

function Page() {
    const theme = useTheme();

    return (
        <Container maxWidth="sm" sx={{ position: "relative" }}>
            <Stack spacing={8}>
                <MyAppBar />
                <HeroSection />
                <TripReserveForm />
            </Stack>
        </Container>
    );
}

export default Page;
