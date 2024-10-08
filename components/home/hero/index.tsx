import React from "react";

import { Stack, Typography, useTheme } from "@mui/material";

function HeroSection() {
    const { palette, typography } = useTheme();

    return (
        <Stack justifyContent={"center"} alignItems={"center"} spacing={1}>
            <Typography variant="h3">
                Welcome to{" "}
                <Typography
                    display={"inline"}

                    //   variant="h3"
                    fontSize={typography.h3.fontSize}
                    fontWeight={700}
                    color={palette.primary.main}
                >
                    GO TAXI
                </Typography>
            </Typography>
            <Typography variant="h1" fontWeight={400}>
                Ease & Speed
            </Typography>
            <Typography variant="h3">Meet all your needs</Typography>
        </Stack>
    );
}

export default HeroSection;
