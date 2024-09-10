import React, { useRef } from "react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import {
    DatePicker,
    type DatePickerProps,
} from "@mui/x-date-pickers/DatePicker";
import {
    type Control,
    Controller,
    useFormContext,
    UseFormGetValues,
} from "react-hook-form";
import { InputAdornment, lighten, TextField, useTheme } from "@mui/material";
import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import { ReservationFormData } from "@/components/home/reserve-form";
import { isDate } from "date-fns";
import { MobileDatePicker, MobileDatePickerProps } from "@mui/x-date-pickers";

interface CustomDatePickerProps extends MobileDatePickerProps<never> {
    name: keyof ReservationFormData;
    helperText?: string;
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
    name,
    helperText,
    ...rest
}) => {
    const { palette } = useTheme();
    const { control } = useFormContext<ReservationFormData>();

    return (
        <Controller
            name={name}
            control={control}
            render={({
                field: { onChange, value, ref, ...field },
                fieldState: { error },
            }) => (
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <MobileDatePicker
                        {...rest}
                        //@ts-ignore
                        value={value}
                        //@ts-ignore
                        defaultValue={value}
                        onChange={(v) => {
                            onChange(v);
                            console.log(v, typeof v, isDate(v));
                        }}
                        inputRef={ref}
                        {...field}
                        sx={{
                            " .MuiInputBase-root": {
                                height: 66,
                            },
                        }}
                        slotProps={{
                            textField: {
                                variant: "standard",
                                error: !!error,
                                helperText: error?.message || helperText,
                            },
                        }}
                        slots={{
                            textField: (params) => (
                                <TextField
                                    {...params}
                                    error={!!error}
                                    helperText={error?.message}
                                    variant="standard"
                                    slotProps={{
                                        input: {
                                            ...params.InputProps,
                                            startAdornment: (
                                                <InputAdornment
                                                    position="start"
                                                    style={{
                                                        marginTop: -4,
                                                        color: lighten(
                                                            palette.text
                                                                .primary,
                                                            0.6
                                                        ),
                                                    }}
                                                >
                                                    <Icon
                                                        icon={
                                                            "solar:calendar-linear"
                                                        }
                                                        width={24}
                                                    />
                                                </InputAdornment>
                                            ),
                                            sx: {
                                                height: 66,
                                            },
                                        },
                                    }}
                                />
                            ),
                        }}
                    />
                </LocalizationProvider>
            )}
        />
    );
};

export default CustomDatePicker;
