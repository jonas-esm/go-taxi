import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import {
    Box,
    Card,
    CardContent,
    CircularProgress,
    InputAdornment,
    lighten,
    Stack,
    TextField,
    Typography,
    useTheme,
} from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { SharedAutocomplete, TextInputShared } from "../text-input";
import FormContainer from "../form-container";
import Button from "@/components/shared/button";
import { Controller, useFormContext } from "react-hook-form";
import { ReservationFormData } from "..";
import CustomAutocomplete from "@/components/shared/autocomplete";
import {
    useSearchAddressQuery,
    useTripDetialsQuery,
} from "@/services/address.service";
import useDebounce from "@/hooks/debounce.hook";
import { carTypeOptions } from "@/utils/car-selector-data";
import CustomDatePicker from "@/components/shared/date-picker";
import { TimePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { formatDistance, formatTime } from "@/utils/fetch-address.utils";
import CustomTimePicker from "@/components/shared/time-picker";
import CarTypeSelector from "./car-type-selector";

function AddressForm({
    setActiveStep,
}: {
    setActiveStep: (step: 0 | 1 | 2) => void;
}) {
    const { palette } = useTheme();
    const { control, setValue, watch } = useFormContext<ReservationFormData>();

    const [debounceSearchFrom, isWaitingFrom] = useDebounce(
        watch().fromSearch,
        1000
    );
    const [debounceSearchTo, isWaitingTo] = useDebounce(watch().toSearch, 1000);

    const { data: fromPlacesRes, isFetching: isFromPlacesFetching } =
        useSearchAddressQuery({
            searchTerm: debounceSearchFrom,
        });
    const { data: toPlacesRes, isFetching: isToPlacesFetching } =
        useSearchAddressQuery({
            searchTerm: debounceSearchTo,
        });

    const optionsFrom = useMemo(
        () =>
            fromPlacesRes?.data?.map?.((feature: any) => ({
                label: feature.place_name,
                value: feature.id,
            })),
        [fromPlacesRes?.data, isToPlacesFetching]
    );

    const optionsTo = useMemo(
        () =>
            toPlacesRes?.data?.map?.((feature: any) => ({
                label: feature.place_name,
                value: feature.id,
            })),
        [toPlacesRes?.data, isFromPlacesFetching]
    );

    const selectedLocations = useMemo(() => {
        const fromLocation = fromPlacesRes?.data?.find?.(
                (place) => place.id === watch().from?.value
            ),
            toLocation = toPlacesRes?.data?.find?.(
                (place) => place.id === watch().to?.value
            );

        return { fromLocation, toLocation };
    }, [watch().to, watch().from]);

    const { data: tripDetailsRes, isFetching: isFetchingTripDetails } =
        useTripDetialsQuery({
            from: selectedLocations?.fromLocation,
            to: selectedLocations?.toLocation,
        });
    useEffect(() => {
        if (
            tripDetailsRes?.data?.uuid &&
            watch().tripDetails?.uuid !== tripDetailsRes?.data?.uuid
        ) {
            setValue("tripDetails", tripDetailsRes?.data);
        }
    }, [tripDetailsRes?.data]);

    return (
        <>
            <FormContainer>
                <Typography mb={2}> Reserve your trip</Typography>
                <Card sx={{ background: "#fff" }}>
                    <Box sx={{ px: 6, pt: 1, pb: 2 }}>
                        <Stack>
                            <Box>
                                <CustomAutocomplete
                                    control={control}
                                    name="from"
                                    options={optionsFrom || []}
                                    iconName={"teenyicons:pin-outline"}
                                    textFieldProps={{
                                        placeholder: "From...?",
                                    }}
                                    autoCompleteProps={{
                                        onInputChange: (e, value) => {
                                            // console.log(e);
                                            if (e?.type === "change") {
                                                setValue("fromSearch", value);
                                            }
                                        },
                                        // inputValue: watch().fromSearch,
                                        loading: isFromPlacesFetching,
                                    }}
                                />
                            </Box>
                            <Box>
                                <CustomAutocomplete
                                    control={control}
                                    name="to"
                                    options={optionsTo || []}
                                    iconName={"teenyicons:pin-outline"}
                                    textFieldProps={{
                                        placeholder: "To..?",
                                    }}
                                    autoCompleteProps={{
                                        onInputChange: (e, value) => {
                                            console.log("form onchange", value);
                                            if (e?.type === "change") {
                                                setValue("toSearch", value);
                                            }
                                        },

                                        // inputValue:
                                        //     watch().to?.label ||
                                        //     watch().toSearch,
                                        loading: isToPlacesFetching,
                                        // blurOnSelect: true,
                                        // selectOnFocus: true,
                                    }}
                                />
                            </Box>
                            <Box>
                                <Stack direction={"row"} spacing={8}>
                                    <CustomDatePicker
                                        control={control}
                                        name="date"
                                        views={["year", "month", "day"]} // Limit views to year, month, and date
                                    />
                                    <Box
                                        flex={1}
                                        my={"auto"}
                                        color={palette.text.disabled}
                                        display={"flex"}
                                        flexDirection={"column"}
                                        alignItems={"center"}
                                        justifyContent={"center"}
                                    >
                                        <Icon
                                            icon={
                                                "fluent:re-order-dots-vertical-24-regular"
                                            }
                                            height={"20"}
                                        />{" "}
                                        <Icon
                                            icon={
                                                "fluent:re-order-dots-vertical-24-regular"
                                            }
                                            height={"20"}
                                        />
                                    </Box>

                                    <CustomTimePicker
                                        control={control}
                                        name="time"
                                    />
                                </Stack>
                            </Box>
                        </Stack>
                    </Box>
                </Card>
            </FormContainer>

            <Box>
                <Typography my={6} ml={2}>
                    Choose car that suits you
                </Typography>
                <CarTypeSelector
                    isFetchingTripDetails={isFetchingTripDetails}
                />
                <Button
                    sx={{ mt: 4 }}
                    fullWidth
                    //@ts-ignore
                    onClick={() => setActiveStep((p) => p + 1)}
                >
                    Proceed
                </Button>
            </Box>
        </>
    );
}

export default AddressForm;
