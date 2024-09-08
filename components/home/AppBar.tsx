"use client";
import { Box, Stack } from "@mui/material";
import LogoSvg from "../../assets/logo.svg";
import React from "react";
import Image from "next/image";
import { Icon } from "@iconify-icon/react/dist/iconify.mjs";

function MyAppBar() {
    return (
        <Box
            sx={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                py: 1.5,
                borderBottom: "1px solid #E1E1E1",
            }}
        >
            <Box marginLeft="auto">
                <Image src={LogoSvg} alt="logo" />
            </Box>
            <Box ml="auto">
                <Icon icon="ph:globe" width={24} />
            </Box>
        </Box>
    );
}

export default MyAppBar;
