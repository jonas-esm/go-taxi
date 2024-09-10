import { Icon } from "@iconify-icon/react/dist/iconify.mjs";

export const carTypeOptions = [
    {
        label: "LUXURY",
        discription: "Comfort, luxurious design",
        carImage: "",
        peopleIcon: ({ color }: { color: string }) => (
            <Icon icon="material-symbols:man" width={20} style={{ color }} />
        ),
        capacity: "4",
    },
    {
        label: "FAMILY",
        discription: "Big, sturdy, family friendly",
        carImage: "",
        peopleIcon: ({ color }: { color: string }) => (
            <Icon
                icon="material-symbols:family-restroom"
                width={20}
                style={{ color }}
            />
        ),
        capacity: "8",
    },
    {
        label: "ECONOMY",
        discription: "Practicality, comfort, everyday use",
        carImage: "",
        peopleIcon: ({ color }: { color: string }) => (
            <Icon icon="material-symbols:man" width={20} style={{ color }} />
        ),
        capacity: "4",
    },
];
