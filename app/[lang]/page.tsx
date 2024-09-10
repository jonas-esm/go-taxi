"use client";
import MyAppBar from "@/components/home/AppBar";
import Footer from "@/components/home/footer";
import HeroSection from "@/components/home/hero";
import InfoSection from "@/components/home/info-cards";
import { TripReserveForm } from "@/components/home/reserve-form";
import { Container, Stack, useTheme } from "@mui/material";
import React from "react";

function Page() {
    const theme = useTheme();

    return (
        <Container maxWidth="sm" sx={{ position: "relative" }}>
            <MyAppBar />
            <Stack spacing={6} mt={2}>
                <HeroSection />
                <TripReserveForm />
                <InfoSection />
                <Footer />
            </Stack>
        </Container>
    );
}

export default Page;
