import { Box, Card, CardContent, lighten, useTheme } from "@mui/material";
import React from "react";

const FormContainer = ({
    isSuccess,
    children,
}: {
    isSuccess?: boolean;
    children: React.ReactNode;
}) => {
    const theme = useTheme();

    return (
        <Card
            sx={{
                borderRadius: "8px",
                background: isSuccess
                    ? lighten(theme.palette.success.light, 0.8)
                    : "#F7F8FA",
                border: "1px solid #E1E1E1",
            }}
            elevation={isSuccess ? 0 : undefined}
            variant="outlined"
        >
            <Box sx={{ py: 4, px: 4 }}>{children}</Box>
        </Card>
    );
};

export default FormContainer;
