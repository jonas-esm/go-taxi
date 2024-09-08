import { Stack, Typography, useTheme } from "@mui/material";
import React from "react";

function HeroSection() {
    const { palette, typography } = useTheme();

    return (
        <Stack
            justifyContent={"center"}
            alignItems={"center"}
            spacing={2}
            marginTop={10}
        >
            <Typography variant="h3">
                Welcome to{" "}
                <Typography
                    display={"inline"}
                    //   variant="h3"
                    fontFamily={typography.h3.fontFamily}
                    fontSize={typography.h3.fontSize}
                    fontWeight={700}
                    color={palette.primary.main}
                >
                    GO TAXI
                </Typography>
            </Typography>
            <Typography variant="h1">Ease & Speed</Typography>
            <Typography variant="h3">Meet all your needs</Typography>
        </Stack>
    );
}

export default HeroSection;
