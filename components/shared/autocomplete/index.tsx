import React, { useRef } from "react";

import type { AutocompleteProps } from "@mui/material/Autocomplete";
import Autocomplete from "@mui/material/Autocomplete";
import type { TextFieldProps } from "@mui/material/TextField";
import TextField from "@mui/material/TextField";
import { Controller, useFormContext } from "react-hook-form";
import { InputAdornment, lighten, useTheme } from "@mui/material";
import { Icon } from "@iconify-icon/react/dist/iconify.mjs";

import type { ReservationFormData } from "@/components/home/reserve-form";

interface CustomAutocompleteProps {
    autoCompleteProps?: Omit<
        Omit<AutocompleteProps<any, boolean, boolean, boolean, any>, "options">,
        "renderInput"
    >;
    name: keyof ReservationFormData;
    options: any[];
    textFieldProps?: TextFieldProps;
    iconName?: string;
}

const CustomAutocomplete: React.FC<CustomAutocompleteProps> = ({
    name,
    options,
    textFieldProps = {},
    autoCompleteProps = {},
    iconName,
    ...rest
}) => {
    const autocompleteRef = useRef<HTMLInputElement | null>(null);
    const { palette } = useTheme();
    const { control } = useFormContext<ReservationFormData>();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
                <Autocomplete
                    {...autoCompleteProps}
                    {...rest}
                    value={value}
                    onChange={(_, newValue) => onChange(newValue)}
                    options={options}
                    size="medium"
                    slotProps={{}}
                    ref={autocompleteRef} // Assign the ref to the Autocomplete component
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            {...textFieldProps}
                            error={!!error}
                            helperText={error?.message}
                            variant="standard"
                            slotProps={{
                                input: {
                                    ...params.InputProps,
                                    startAdornment: iconName ? (
                                        <InputAdornment
                                            position="start"
                                            style={{
                                                color: lighten(
                                                    palette.text.primary,
                                                    0.6
                                                ),
                                            }}
                                        >
                                            <Icon
                                                icon={

                                                    //@ts-ignore
                                                    value?.id
                                                        ? "ph:map-pin-simple-fill"
                                                        : iconName
                                                }
                                                width={24}
                                            />
                                        </InputAdornment>
                                    ) : undefined,
                                    sx: {
                                        height: 66,
                                    },
                                },
                            }}
                        />
                    )}
                />
            )}
        />
    );
};

export default CustomAutocomplete;
