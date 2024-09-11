import React from "react";

import { Avatar, Box, Slide, Stack, Typography, useTheme } from "@mui/material";

import { Icon } from "@iconify-icon/react/dist/iconify.mjs";

import FormContainer from "./form-container";


import Button from "@/components/shared/button";

function SuccessStep({}: { setActiveStep: (step: 0 | 1 | 2) => void }) {
    const theme = useTheme();

    return (
        <Slide appear in direction="left">
            <Box>
                <FormContainer isSuccess>
                    <Stack
                        justifyContent={"center"}
                        alignItems={"center"}
                        gap={2}
                    >
                        <Avatar
                            sx={{ width: 82, height: 82, bgcolor: "white" }}
                            variant="rounded"
                        >
                            <Icon
                                icon={"fluent:checkmark-28-filled"}
                                width={68}
                                style={{ color: theme.palette.success.main }}
                            />
                        </Avatar>
                        <Typography variant="h3" mt={6}>
                            Your request has been submitted successfully..
                        </Typography>
                        <Typography mb={6}>
                            We will reach you out to confirm your order.
                        </Typography>

                        <Button variant="outlined" color="success">
                            Do you want to submit a new request?
                        </Button>
                    </Stack>
                </FormContainer>
            </Box>
        </Slide>
    );
}

export default SuccessStep;
