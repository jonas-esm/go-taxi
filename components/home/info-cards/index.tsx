import React from "react";

import { Box } from "@mui/material";

import InfoCardComponent from "./info-card";
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
