import React, { useRef } from "react";
import Autocomplete, { AutocompleteProps } from "@mui/material/Autocomplete";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import { Controller } from "react-hook-form";
import type { Control } from "react-hook-form";
import { InputAdornment, lighten, useTheme } from "@mui/material";
import { Icon } from "@iconify-icon/react/dist/iconify.mjs";

interface CustomAutocompleteProps {
    autoCompleteProps?: Omit<
        Omit<AutocompleteProps<any, boolean, boolean, boolean, any>, "options">,
        "renderInput"
    >;
    name: string;
    control: Control<any, any>;
    options: any[];
    textFieldProps?: TextFieldProps;
    iconName?: string;
}

const CustomAutocomplete: React.FC<CustomAutocompleteProps> = ({
    name,
    control,
    options,
    textFieldProps = {},
    autoCompleteProps = {},
    iconName,
    ...rest
}) => {
    const autocompleteRef = useRef<HTMLInputElement | null>(null);
    const { palette } = useTheme();

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
                                            <Icon icon={iconName} width={24} />
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
