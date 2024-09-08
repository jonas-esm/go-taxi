import { carTypeOptions } from "@/utils/car-selector-data";
import { formatTime, formatDistance } from "@/utils/fetch-address.utils";
import {
    Box,
    Stack,
    Typography,
    CircularProgress,
    Button,
    useTheme,
} from "@mui/material";
import { watch } from "fs";
import React from "react";
import { useFormContext } from "react-hook-form";
import { ReservationFormData } from "..";
import { Icon } from "@iconify-icon/react/dist/iconify.mjs";

function CarTypeSelector({
    isFetchingTripDetails,
}: {
    isFetchingTripDetails?: boolean;
}) {
    const { palette } = useTheme();
    const { watch, setValue } = useFormContext<ReservationFormData>();

    return (
        <Stack>
            {carTypeOptions.map((item, ind) => (
                <Box
                    key={ind}
                    sx={{
                        px: 3,
                        py: 4,
                        borderRadius: 1.5,
                        background:
                            item.label === watch().carType
                                ? palette.primary.light
                                : "#F7F8FA",
                        mb: 2,
                        border: `1px solid ${palette.background.paper}`,

                        cursor: "pointer",
                        " &:hover": {
                            background: "#f8f8f8",
                            border: `1px solid ${palette.primary.main}`,
                        },
                    }}
                    onClick={() => {
                        console.log(item);
                        setValue("carType", item.label);
                    }}
                >
                    <Stack direction={"row"} justifyContent={"space-between"}>
                        <Box>
                            <Stack direction={"row"}>
                                <Typography variant="h4" flex={1} mr={4}>
                                    {item.label}
                                </Typography>

                                {item.peopleIcon}
                                <Typography display={"inline"} ml={1}>
                                    {item.capacity}
                                </Typography>
                            </Stack>
                            <Typography>{item.discription}</Typography>
                        </Box>

                        {isFetchingTripDetails ? (
                            <Icon
                                icon={"eos-icons:three-dots-loading"}
                                color={palette.primary.main}
                                style={{
                                    color: palette.primary.main,
                                    fontSize: 40,
                                }}
                            />
                        ) : watch().tripDetails?.routes[0]?.distance ? (
                            <Box ml={"auto"}>
                                <div className="text-black ">
                                    {formatTime(
                                        watch().tripDetails?.routes[0]
                                            .duration || 0
                                    )}
                                </div>
                                <div className="text-black">
                                    {formatDistance(
                                        watch().tripDetails?.routes[0]
                                            .distance || 0
                                    )}
                                </div>
                            </Box>
                        ) : null}
                    </Stack>
                </Box>
            ))}
        </Stack>
    );
}

export default CarTypeSelector;
