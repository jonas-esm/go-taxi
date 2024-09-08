import ThemeProvider from "@/components/theme";
import React from "react";
import ClientProviders from "./ClientProviders";

const Providers = (props: { children: React.ReactNode }) => {
    //
    const { children } = props;

    // Vars

    return (
        <ThemeProvider direction="ltr" systemMode="light">
            <ClientProviders>{children}</ClientProviders>
            {/* //   <AppReactToastify position={themeConfig.toastPosition} hideProgressBar /> */}
        </ThemeProvider>
    );
};

export default Providers;
