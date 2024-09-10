import React from "react";
import InfoCardComponent from "./info-card";
import { Box } from "@mui/material";
import { informationCardsData } from "./cards-data";

function InfoSection() {
    return (
        <Box mb={6}>
            {informationCardsData.map((item, key) => (
                <InfoCardComponent key={key} {...item} />
            ))}
        </Box>
    );
}

export default InfoSection;
