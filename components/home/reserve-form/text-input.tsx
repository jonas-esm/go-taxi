/* eslint-disable react/display-name */
import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import {
    TextField,
    InputAdornment,
    lighten,
    useTheme,
    Autocomplete,
} from "@mui/material";
import React, { forwardRef } from "react";

interface IProps {
    label: string;
    placeholder: string;
    iconName: string;
    control: any;
    [key: string]: any;
}

export const TextInputShared = forwardRef(
    (props: IProps, ref: React.Ref<HTMLDivElement>) => {
        const { palette } = useTheme();

        return (
            <TextField
                inputRef={ref}
                size="medium"
                variant="standard"
                slotProps={{
                    input: {
                        startAdornment: (
                            <InputAdornment
                                position="start"
                                style={{
                                    color: lighten(palette.text.primary, 0.6),
                                }}
                            >
                                <Icon icon={props.iconName} width={24} />
                            </InputAdornment>
                        ),
                        sx: {
                            height: 66,
                        },
                    },
                }}
                {...props}
            />
        );
    }
);

interface autocompleteProps {
    options?: { label: string; value: string }[];
    error?: any;
    onChange: any;
    loading?: boolean;
    field: any;
    placeholder: string;
    iconName: string;
    fullWidth?: boolean;
}

export const SharedAutocomplete = forwardRef(
    (
        {
            options,
            error,
            onChange,
            loading,
            field,
            placeholder,
            iconName,
            fullWidth,
        }: autocompleteProps,
        ref
    ) => {
        return (
            <Autocomplete
                // disablePortal
                options={options || []}
                getOptionLabel={(option: any) => option?.label || ""}
                getOptionKey={(option: any) => option?.value || ""}
                renderInput={(params) => (
                    <TextInputShared
                        {...params}
                        fullWidth={fullWidth}
                        placeholder={placeholder}
                        helperText={error?.message}
                        iconName={iconName}
                    />
                )}
                onChange={onChange}
                loading={loading}
                {...field}
            />
        );
    }
);
