import { Box, Card, CardContent } from "@mui/material";
import React from "react";

const FormContainer = ({ children }: { children: React.ReactNode }) => {
    return (
        <Card
            sx={{
                borderRadius: "8px",
                background: "#F7F8FA",
                border: "1px solid #E1E1E1",
            }}
        >
            <Box sx={{ py: 4, px: 4 }}>{children}</Box>
        </Card>
    );
};

export default FormContainer;
