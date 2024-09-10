"use client";
import {
    AppBar,
    Box,
    Stack,
    Toolbar,
    Typography,
    useScrollTrigger,
    useTheme,
} from "@mui/material";
import LogoSvg from "../../assets/logo.svg";
import React from "react";
import Image from "next/image";
import { Icon } from "@iconify-icon/react/dist/iconify.mjs";

function ElevationScroll(props: any) {
    const { children, window } = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
        target: window ? window() : undefined,
    });

    return children
        ? React.cloneElement(children, {
              //   elevation: trigger ? 4 : 0,
              style: {
                  boxShadow: trigger ? "4px 4px 8px #c9c9c96c" : undefined,
              },
          })
        : null;
}

function MyAppBar() {
    const theme = useTheme();

    return (
        <>
            <ElevationScroll>
                <AppBar
                    sx={{
                        background: "#fff",
                        boxShadow:
                            window?.scrollY > 10
                                ? "4px 4px 8px #c9c9c96c"
                                : undefined,
                    }}
                >
                    <Toolbar>
                        <Box mx="auto">
                            <Image src={LogoSvg} alt="logo" />
                        </Box>
                    </Toolbar>
                </AppBar>
            </ElevationScroll>
            <Toolbar />
        </>
        // <Box
        //     sx={{
        //         width: "100%",
        //         display: "flex",
        //         mx: -2,
        //         alignItems: "center",
        //         py: 1.5,
        //         borderBottom: "1px solid #E1E1E1",
        //         position: "fixed",
        //         background: "#fff",
        //         // filter: "blur(10px)",
        //         boxShadow: "1px 1px 10px #e1e1e115 ",
        //         px: 2,
        //     }}
        // >
        //     <Box mx="auto">
        //         <Image src={LogoSvg} alt="logo" />
        //     </Box>
        //     {/* <Box ml="auto">
        //         <Icon icon="ph:globe" width={24} /> */}
        //     {/* </Box> */}
        // </Box>
    );
}

export default MyAppBar;
