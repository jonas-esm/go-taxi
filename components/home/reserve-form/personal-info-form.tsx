import { Typography, Card, CardContent, Stack, Box } from "@mui/material";
import React from "react";
import FormContainer from "./form-container";
import CustomTextField from "@/components/shared/text-input";
import { useFormContext } from "react-hook-form";
import { ReservationFormData } from ".";
import Button from "@/components/shared/button";

function PersonalInfoForm({
    setActiveStep,
}: {
    setActiveStep: (step: 0 | 1 | 2) => void;
}) {
    const { control } = useFormContext<ReservationFormData>();

    return (
        <>
            <FormContainer>
                <Typography mb={3}> Enter your contact info</Typography>
                <Card sx={{ background: "#fff" }}>
                    <CardContent sx={{ pt: 1 }}>
                        <Stack>
                            <Box>
                                <CustomTextField
                                    control={control}
                                    name="fullName"
                                    iconName="tabler:user"
                                    placeholder="Full Name"
                                />
                            </Box>
                            <Box>
                                <CustomTextField
                                    control={control}
                                    name="phoneNumber"
                                    iconName="tabler:phone"
                                    placeholder="Phone Number"
                                />
                            </Box>
                            <Box>
                                <CustomTextField
                                    control={control}
                                    name="note"
                                    iconName="tabler:note"
                                    placeholder="Notes..."
                                />
                            </Box>
                        </Stack>
                    </CardContent>
                </Card>
            </FormContainer>
            <Button
                sx={{ mt: 8 }}
                fullWidth
                //@ts-ignore
                // onClick={() => setActiveStep((p) => p + 1)}
            >
                Submit
            </Button>
        </>
    );
}

export default PersonalInfoForm;
