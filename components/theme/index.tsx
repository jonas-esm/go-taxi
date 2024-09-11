"use client";

// React Imports
import { useMemo } from "react";

// MUI Imports
import { deepmerge } from "@mui/utils";
import {
    extendTheme as extendTheme,
    lighten,

    // darken,
    ThemeProvider as MuiThemeProvider,
} from "@mui/material/styles";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import CssBaseline from "@mui/material/CssBaseline";
import type {} from "@mui/material/themeCssVarsAugmentation"; //! Do not remove this import otherwise you will get type errors while making a production build
import type {} from "@mui/lab/themeAugmentation"; //! Do not remove this import otherwise you will get type errors while making a production build

// Third-party Imports
import stylisRTLPlugin from "stylis-plugin-rtl";

// Type Imports
import type { ChildrenType, Direction, SystemMode } from "../../@core/types";

// Component Imports

// Config Imports

// Hook Imports

// Core Theme Imports
import mergedTheme from "./mergedTheme";

type Props = ChildrenType & {
    direction: Direction;
    systemMode: SystemMode;
};

const settings = {
    primaryColor: "#FF4F00",
    mode: "light",
    direction: "ltr",
    skin: "default",
};

const ThemeProvider = (props: Props) => {
    // Props
    const { children, direction } = props;

    // Hooks

    // Vars
    // const currentMode: SystemMode = "light";

    // Merge the primary color scheme override with the core theme
    const theme = useMemo(() => {
        const newColorScheme = {
            colorSchemes: {
                light: {
                    palette: {
                        primary: {
                            main: settings.primaryColor,
                            light: lighten(
                                settings.primaryColor as string,
                                0.2
                            ),

                            // dark: darken(settings.primaryColor as string, 0.1),
                        },
                    },
                },

                // dark: {
                //   palette: {
                //     primary: {
                //       main: settings.primaryColor,
                //       light: lighten(settings.primaryColor as string, 0.2),
                //       dark: darken(settings.primaryColor as string, 0.1),
                //     },
                //   },
                // },
            },
        };

        const coreTheme = deepmerge(
            mergedTheme(settings, "light", direction),
            newColorScheme
        );

        return extendTheme(coreTheme);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [settings.primaryColor, settings.skin]);

    return (
        <AppRouterCacheProvider
            options={{
                prepend: true,
                ...(direction === "rtl" && {
                    key: "rtl",
                    stylisPlugins: [stylisRTLPlugin],
                }),
            }}
        >
            <>
                <MuiThemeProvider theme={theme}>
                    <CssBaseline />
                    {children}
                </MuiThemeProvider>
            </>
        </AppRouterCacheProvider>
    );
};

export default ThemeProvider;
