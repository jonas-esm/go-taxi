import React from "react";

import aboutUsImage from "@/assets/about_us.png";
import ourMissionImage from "@/assets/our_mission.png";
import ourServicesImage from "@/assets/our_services.png";

export const informationCardsData = [
    {
        title: "About Us",
        order: 0,
        imageSource: aboutUsImage,
        details:
            "At GoTaxi, we provide a convenient and seamless online car rental experience. Our goal is to make the car rental process easy and secure for all our customers.",
    },
    {
        title: "Our Mission",
        order: 0,
        imageSource: ourMissionImage,
        details:
            "Our mission is to offer the best car rental service by providing a wide range of vehicles to meet all needs, delivering exceptional customer service, and ensuring a comfortable and easy experience for all our clients.",
    },
    {
        title: "Our Services",
        order: 0,
        imageSource: ourServicesImage,
        details:
            "We offer a wide range of vehicles to suit all needs, whether you are looking for an economy car, luxury vehicle, family car, or even a sports car. We are here to help you choose the perfect car for your next trip.",
    },
];
