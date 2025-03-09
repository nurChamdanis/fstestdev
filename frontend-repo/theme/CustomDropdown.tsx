import React from "react";
import { Select, MenuItem, FormControl, InputLabel, SelectChangeEvent } from "@mui/material";

interface CustomSelectProps {
    value: string; 
    onChange: (event: SelectChangeEvent<string>) => void;  
    style?: React.CSSProperties;  
}

export const CustomSelect: React.FC<CustomSelectProps> = ({ value, onChange, style }) => {
    const today = new Date();
    const dates = Array.from({ length: 7 }, (_, i) => {
        const date = new Date();
        date.setDate(today.getDate() + i);
        return date.toISOString().split("T")[0];  
    });

    return (
        <FormControl style={{ minWidth: 200, ...style }}>
            <InputLabel>Select Date</InputLabel>
            <Select value={value} onChange={onChange}>
                {dates.map((date) => (
                    <MenuItem key={date} value={date}>
                        {date}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};
