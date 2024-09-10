"use client";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import AddressForm from "./address-form/address-form";
import PersonalInfoForm from "./personal-info-form";
import OrderReview from "./order-review";
import FormContainer from "./form-container";
import { Box, CircularProgress, IconButton } from "@mui/material";
import { DirectionsResponse } from "@mapbox/mapbox-sdk/services/directions";
import * as dateFns from "date-fns";
import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import { GeocodeFeature } from "@mapbox/mapbox-sdk/services/geocoding";
import SuccessStep from "./success-step";

export interface ReservationFormData {
    from: GeocodeFeature | null;
    fromSearch: string;
    to: GeocodeFeature | null;
    toSearch: string;
    date: Date | null;
    time: Date | null;
    dateTime: Date | null;
    fullName: string;
    phoneNumber: string;
    notes: string;
    tripDetails?: DirectionsResponse<string>;
    carType: string;
}

const steps = ({
    setActiveStep,
}: {
    setActiveStep: (step: 0 | 1 | 2) => void;
}) => ({
    "0": <AddressForm setActiveStep={setActiveStep} />,
    "1": <PersonalInfoForm setActiveStep={setActiveStep} />,
    "2": <SuccessStep setActiveStep={setActiveStep} />,
});

export function TripReserveForm() {
    const [activeStep, setActiveStep] = useState<0 | 1 | 2>(0);

    const methods = useForm<ReservationFormData>({
        defaultValues: {
            from: null,
            to: null,
            date: new Date(),
            time: dateFns.add(new Date(), {
                hours: 0.5,
                minutes: 60 - new Date().getMinutes(),
            }),
            dateTime: new Date(),
            fullName: "",
            phoneNumber: "",
            notes: "",
            carType: "",
            fromSearch: "",
            toSearch: "",
        },
    });

    if (activeStep > 2 || activeStep < 0) {
        return (
            <div>
                <CircularProgress />
            </div>
        );
    }
    return (
        <div>
            {activeStep !== 0 && (
                <Box
                    sx={{
                        position: "fixed",
                        top: 12,
                        left: 8,
                        zIndex: 99999999,
                    }}
                >
                    <IconButton
                        size="medium"
                        color="primary"
                        onClick={() => setActiveStep(0)}
                    >
                        <Icon icon={"tabler:arrow-left"} />
                    </IconButton>
                </Box>
            )}
            <FormProvider {...methods}>
                {steps({ setActiveStep })[`${activeStep}`]}
            </FormProvider>
        </div>
    );
}
