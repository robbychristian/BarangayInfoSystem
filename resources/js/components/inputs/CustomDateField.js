import { DateField, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";
import React from "react";

const CustomDateField = ({ data, onChange, label }) => {
    return (
        <LocalizationProvider dateAdapter={AdapterMoment}>
            <DateField
                fullWidth
                value={data ? moment(data) : null} // Ensures compatibility with `moment`
                onChange={(newValue) => onChange(newValue ? newValue.toISOString() : null)} // Converts to ISO string if needed
                label={label}
            />
        </LocalizationProvider>
    );
};

export default CustomDateField;
