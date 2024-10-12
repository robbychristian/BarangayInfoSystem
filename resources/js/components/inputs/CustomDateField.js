import { DateField, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";
import React from "react";

const CustomDateField = ({ data, onChange, label }) => {
    return (
        <LocalizationProvider dateAdapter={AdapterMoment}>
            <DateField
            fullWidth
                defaultValue={moment()}
                value={data == undefined ? moment() : data.birthday}
                onChange={onChange}
                label={label}
            />
        </LocalizationProvider>
    );
};

export default CustomDateField;
